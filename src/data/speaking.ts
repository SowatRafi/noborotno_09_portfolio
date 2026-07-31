import type { SpeakingEngagement } from './types'

/*
 * A delivered session, not one attended — `role` says so on the card, because
 * on a portfolio the difference between presenting a workshop and sitting in
 * one is the whole point of listing it.
 *
 * `startIso` carries the +10:00 offset deliberately: Victoria is on AEST in
 * August (daylight saving runs October to April), so the offset and the AEST
 * in `dateLabel` agree.
 */
export const speaking = {
  session: 'Workshop 2 · SECURE',
  event: 'AI in Practice: Agent → Secure → Industry',
  role: 'Presenter',
  host: 'AVA Training, with Unwind AI and Great Monkey Lab',
  location: 'Melbourne CBD — exact venue announced closer to the date',
  startIso: '2026-08-23T13:00:00+10:00',
  dateLabel: 'Sunday 23 August 2026, 1–4pm AEST',
  summary:
    'A three-hour hands-on session on getting value out of AI without leaking the organisation: prompt injection and jailbreaking demonstrated live, what should never be pasted into a chatbot, safe-AI policy for teams and classrooms, and the Australian privacy basics that apply. Attendees leave with a checklist they can put to work straight away.',
  ticketUrl:
    'https://events.humanitix.com/ai-in-practice-melbourne-2026?discountcode=STUDENTUNWIND',
  discountCode: 'STUDENTUNWIND',
  discountNote: 'Student discount — this link applies it automatically',
} as const satisfies SpeakingEngagement
