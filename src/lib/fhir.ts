import { NightEntry, MorningEntry, SleepSession } from './types'

const FELT_REST_CODES: Record<string, { code: string; display: string }> = {
  'not-rested': { code: '224960004', display: 'Not rested' },
  'okay':       { code: '405153007', display: 'Mildly rested' },
  'good':       { code: '405154001', display: 'Moderately rested' },
  'great':      { code: '405155000', display: 'Well rested' },
}

const MENTAL_STATE_CODES: Record<string, { code: string; display: string }> = {
  'calm':    { code: '48694002',  display: 'Anxiety absent' },
  'neutral': { code: '48694002',  display: 'Neutral mental state' },
  'wired':   { code: '40979000',  display: 'Hyperarousal' },
  'anxious': { code: '48694002',  display: 'Anxiety present' },
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function sleepDurationObservation(session: SleepSession) {
  if (!session.durationMinutes) return null
  return {
    resourceType: 'Observation',
    id: uuid(),
    status: 'final',
    code: {
      coding: [{
        system: 'http://loinc.org',
        code: '93832-4',
        display: 'Sleep duration',
      }],
      text: 'Sleep duration',
    },
    effectiveDateTime: session.date,
    valueQuantity: {
      value: parseFloat((session.durationMinutes / 60).toFixed(2)),
      unit: 'h',
      system: 'http://unitsofmeasure.org',
      code: 'h',
    },
    category: [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'survey',
      }],
    }],
  }
}

function sleepQualityObservation(morning: MorningEntry) {
  const coding = FELT_REST_CODES[morning.feltRest]
  return {
    resourceType: 'Observation',
    id: uuid(),
    status: 'final',
    code: {
      coding: [{
        system: 'http://loinc.org',
        code: '89243-0',
        display: 'Sleep quality Patient Reported',
      }],
      text: 'Self-reported sleep quality',
    },
    effectiveDateTime: morning.date,
    valueCodeableConcept: {
      coding: [{
        system: 'http://snomed.info/sct',
        code: coding.code,
        display: coding.display,
      }],
      text: morning.feltRest,
    },
    category: [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'survey',
      }],
    }],
    component: [
      {
        code: { text: 'Wake difficulty' },
        valueString: morning.wakeDifficulty,
      },
      {
        code: { text: 'Sleep interruptions' },
        valueString: morning.interruptions,
      },
    ],
  }
}

function preSleepObservation(night: NightEntry) {
  const mentalCoding = MENTAL_STATE_CODES[night.mentalState]
  return {
    resourceType: 'Observation',
    id: uuid(),
    status: 'final',
    code: {
      coding: [{
        system: 'http://loinc.org',
        code: '44250-9',
        display: 'Little interest or pleasure in doing things',
      }],
      text: 'Pre-sleep self-report',
    },
    effectiveDateTime: night.date,
    category: [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: 'survey',
      }],
    }],
    component: [
      {
        code: { text: 'Mental state before sleep' },
        valueCodeableConcept: {
          coding: [{ system: 'http://snomed.info/sct', ...mentalCoding }],
          text: night.mentalState,
        },
      },
      {
        code: { text: 'Notable pre-sleep inputs' },
        valueString: night.inputs.join(', '),
      },
      {
        code: { text: 'Bedtime' },
        valueTime: night.bedtime,
      },
    ],
  }
}

export function buildFhirBundle(sessions: SleepSession[]): object {
  const entries: object[] = []

  for (const session of sessions) {
    const dur = sleepDurationObservation(session)
    if (dur) entries.push({ resource: dur })
    if (session.morning) entries.push({ resource: sleepQualityObservation(session.morning) })
    if (session.night) entries.push({ resource: preSleepObservation(session.night) })
  }

  return {
    resourceType: 'Bundle',
    id: uuid(),
    type: 'collection',
    timestamp: new Date().toISOString(),
    meta: {
      profile: ['http://hl7.org/fhir/StructureDefinition/Bundle'],
      tag: [{
        system: 'http://dormant.app/tags',
        code: 'sleep-self-report',
        display: 'Dormant sleep self-report export',
      }],
    },
    entry: entries,
  }
}

export function downloadFhirBundle(sessions: SleepSession[]): void {
  const bundle = buildFhirBundle(sessions)
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dormant-fhir-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
