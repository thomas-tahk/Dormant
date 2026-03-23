import { SleepSession, Observation } from './types'

export type ObservationState = 'empty' | 'learning' | 'ready'

export function getObservationState(sessions: SleepSession[]): ObservationState {
  const complete = sessions.filter(s => s.night && s.morning)
  if (complete.length === 0) return 'empty'
  if (complete.length < 5) return 'learning'
  return 'ready'
}

export function deriveObservation(sessions: SleepSession[]): Observation | null {
  const complete = sessions
    .filter(s => s.night && s.morning)
    .slice(0, 14)

  if (complete.length < 5) return null

  // Rule: late screens correlation with poor rest
  const screenNights = complete.filter(s =>
    s.night!.inputs.includes('screens') &&
    (s.night!.bedtime >= '23:00' || s.night!.bedtime <= '02:00')
  )
  const screenPoorRest = screenNights.filter(s =>
    s.morning!.feltRest === 'not-rested' || s.morning!.feltRest === 'okay'
  )

  if (screenNights.length >= 2 && screenPoorRest.length / screenNights.length >= 0.6) {
    const goodMornings = complete.filter(s =>
      s.morning!.feltRest === 'good' || s.morning!.feltRest === 'great'
    )
    const goodWithoutScreens = goodMornings.filter(s =>
      !s.night!.inputs.includes('screens')
    )
    return {
      title: 'A small pattern showed up',
      body: 'On nights you logged screens late, your morning rest rating was usually lower.',
      evidence: `${goodWithoutScreens.length} of your last ${goodMornings.length} better mornings followed nights without screens logged.`,
      prompt: 'Try one quieter wind-down this week?',
    }
  }

  // Rule: caffeine correlation
  const caffeineNights = complete.filter(s => s.night!.inputs.includes('caffeine'))
  const caffeinePoorRest = caffeineNights.filter(s =>
    s.morning!.feltRest === 'not-rested' || s.morning!.feltRest === 'okay'
  )
  if (caffeineNights.length >= 2 && caffeinePoorRest.length / caffeineNights.length >= 0.6) {
    return {
      title: 'Something caught our attention',
      body: 'On days you logged caffeine before bed, you tended to feel less rested in the morning.',
      evidence: `${caffeinePoorRest.length} of ${caffeineNights.length} caffeine nights were followed by lower rest ratings.`,
      prompt: 'Consider moving caffeine to earlier in the day?',
    }
  }

  // Rule: exercise = better rest
  const exerciseNights = complete.filter(s => s.night!.inputs.includes('exercise'))
  const exerciseGoodRest = exerciseNights.filter(s =>
    s.morning!.feltRest === 'good' || s.morning!.feltRest === 'great'
  )
  if (exerciseNights.length >= 2 && exerciseGoodRest.length / exerciseNights.length >= 0.6) {
    return {
      title: 'Your data noticed something positive',
      body: 'On nights after you exercised, your morning rest ratings were usually higher.',
      evidence: `${exerciseGoodRest.length} of ${exerciseNights.length} exercise days were followed by better mornings.`,
      prompt: 'Looks like movement is working for you.',
    }
  }

  // Fallback: general bedtime consistency
  const avgBedtime = complete.reduce((sum, s) => {
    const [h, m] = s.night!.bedtime.split(':').map(Number)
    return sum + h * 60 + m
  }, 0) / complete.length

  const consistent = complete.filter(s => {
    const [h, m] = s.night!.bedtime.split(':').map(Number)
    return Math.abs(h * 60 + m - avgBedtime) < 45
  })

  if (consistent.length / complete.length >= 0.7) {
    const hour = Math.floor(avgBedtime / 60)
    const min = Math.round(avgBedtime % 60).toString().padStart(2, '0')
    return {
      title: 'You have a natural rhythm',
      body: `You tend to head to sleep around ${hour}:${min} most nights.`,
      evidence: `${consistent.length} of your last ${complete.length} nights were within 45 minutes of that time.`,
      prompt: 'Consistency is one of the most useful sleep habits. You\'re already doing it.',
    }
  }

  return {
    title: 'Still building your picture',
    body: 'No strong pattern stands out yet — that\'s normal early on.',
    evidence: `${complete.length} nights logged so far.`,
    prompt: 'A few more check-ins will help Dormant find what\'s actually yours.',
  }
}

export function getCompanionStateFromSessions(sessions: SleepSession[]): 'sleeping' | 'resting' | 'neutral' | 'happy' {
  const todayDate = new Date().toISOString().split('T')[0]
  const todaySession = sessions.find(s => s.date === todayDate)

  if (!todaySession) return 'sleeping'
  if (todaySession.night && todaySession.morning) {
    const rest = todaySession.morning.feltRest
    return rest === 'great' || rest === 'good' ? 'happy' : 'neutral'
  }
  if (todaySession.morning && !todaySession.night) return 'neutral'
  return 'resting'
}
