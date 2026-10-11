/**
 * Course (programme category) definitions. Descriptive text only —
 * durations, fees and availability come from the universities collection.
 */
export const COURSES = {
  medicine: {
    name: 'Medicine',
    title: 'Study Medicine in Ukraine',
    description: 'Medicine (often searched as “MBBS in Ukraine”) at Ukrainian universities: duration, language, entry requirements and fees for international students.',
    intro: 'Medicine is the most sought-after programme among international applicants to Ukraine. Programmes are typically six years and lead to a medical degree whose exact title is set by each university. Below you will find only the universities whose medicine programme has been verified as open to international applicants, each fact marked verified or pending. Until the first profiles pass verification this list is empty by design.',
    searchTermNote: {
      heading: 'Searching for “MBBS in Ukraine”?',
      text: 'Applicants from India, Pakistan and the Gulf often search for “MBBS in Ukraine”. Ukrainian universities do not award a degree called MBBS: each university sets its own qualification title, which we show on its profile once it has been verified from the official programme page. Whether a Ukrainian medical degree is recognised for practice in your country is decided by your home regulator, not by the university or by us — check that regulator’s current rules before you apply.',
    },
    whatToCheck: ['The exact qualification title awarded and its listing in the World Directory of Medical Schools.', 'Whether the English-taught stream is open to applicants from your country for the coming intake.', 'The entry requirements for your own school-leaving qualification: subjects, grades and any entrance examination are set per programme and per intake — there is no universal list.', 'For applicants from India: whether your home regulator requires an eligibility examination before studying abroad, and how it treats foreign medical qualifications — set by the regulator, not by the university.', 'How clinical rotations are organised and where.', 'That the website you are reading is the university\'s own official site: several third-party sites use university names in their domain.'],
  },
  dentistry: {
    name: 'Dentistry',
    title: 'Study Dentistry in Ukraine',
    description: 'Dentistry programmes at Ukrainian universities for international students: duration, language, entry requirements and fees, with official sources and check dates.',
    intro: 'Dentistry programmes in Ukraine are typically five years. Entry requirements and fees differ by university, and the qualification title should always be checked against the awarding university’s official page.',
    whatToCheck: ['Qualification title and recognition in your intended country of practice.', 'Availability of English-taught places for international applicants.', 'Practical and clinical training facilities.'],
  },
  nursing: {
    name: 'Nursing',
    title: 'Study Nursing in Ukraine',
    description: 'Nursing programmes at Ukrainian universities for international students, including whether on-campus or distance routes are currently offered.',
    intro: 'Nursing routes for international students vary widely between universities, including the level of award and the study format. We list a nursing route only when its current availability, format and qualification have been confirmed from the university’s official pages.',
    whatToCheck: ['Whether the route is on-campus, blended or distance, and whether that format is recognised where you plan to work.', 'Level of award (bachelor or master) and duration.', 'Clinical placement arrangements.'],
  },
  pharmacy: {
    name: 'Pharmacy',
    title: 'Study Pharmacy in Ukraine',
    description: 'Pharmacy programmes at Ukrainian universities for international students: duration, language, entry requirements and tuition fees, verified against official sources.',
    intro: 'Pharmacy programmes are usually five years. As with other programmes, we record the qualification, duration, language and fees only from official university sources.',
    whatToCheck: ['Qualification title and duration.', 'Language of instruction for international applicants.', 'Recognition requirements for pharmacists in your intended country.'],
  },
} as const;

export type CourseSlug = keyof typeof COURSES;
