/**
 * Course (programme category) definitions. Descriptive text only: no duration, qualification title,
 * fee or availability is stated here as a fact. Those are programme-specific and come only from
 * verified records in the universities collection (see also the eligibility FAQ).
 * `summary` is the one-line card text on the home page and /courses/.
 */
export const COURSES = {
  medicine: {
    name: 'Medicine',
    title: 'Study Medicine in Ukraine',
    description: 'Medicine (often searched as “MBBS in Ukraine”) for international students: what each university sets, what to check before applying, how we verify programmes.',
    summary: 'Often searched as MBBS. Each university sets its own duration and degree title.',
    intro: 'Each university sets the duration of its own medicine programme and the exact title of the medical degree it awards, and both can differ between universities and intakes. Below you will find only the universities whose medicine programme has been verified as open to international applicants, each fact marked verified or pending. Until the first profiles pass verification this list is empty by design.',
    searchTermNote: {
      heading: 'Searching for “MBBS in Ukraine”?',
      text: 'Applicants from India, Pakistan and the Gulf often search for “MBBS in Ukraine” or a “Ukraine MBBS college”. Ukrainian universities do not award a degree called MBBS: each university sets its own qualification title, which we show on its profile once it has been verified from the official programme page. Whether a Ukrainian medical degree is recognised for practice in your country is decided by your home regulator, not by the university or by us — check that regulator’s current rules before you apply.',
    },
    whatToCheck: ['The exact qualification title awarded and its listing in the World Directory of Medical Schools.', 'Whether the English-taught stream is open to applicants from your country for the coming intake.', 'The entry requirements for your own school-leaving qualification: subjects, grades and any entrance examination are set per programme and per intake — there is no universal list.', 'For applicants from India: whether your home regulator requires an eligibility examination before studying abroad, and how it treats foreign medical qualifications — set by the regulator, not by the university.', 'How clinical rotations are organised and where.', 'That the website you are reading is the university\'s own official site: several third-party sites use university names in their domain.'],
  },
  dentistry: {
    name: 'Dentistry',
    title: 'Study Dentistry in Ukraine',
    description: 'Dentistry for international students in Ukraine: what each university sets itself (duration, title, language, fees), what to check, and how we verify a programme.',
    summary: 'Duration, language and fees differ by university. We list them only once checked.',
    intro: 'Duration, entry requirements and fees for dentistry differ by university and programme. The qualification title should always be checked against the awarding university’s official page.',
    whatToCheck: ['Qualification title and recognition in your intended country of practice.', 'Availability of English-taught places for international applicants.', 'Practical and clinical training facilities.'],
  },
  nursing: {
    name: 'Nursing',
    title: 'Study Nursing in Ukraine',
    description: 'Nursing for international students in Ukraine: why award level and study format differ, what to check before applying, and how we verify a nursing route.',
    summary: 'Award level and study format differ between universities.',
    intro: 'Nursing routes for international students vary widely between universities, including the level of award and the study format. We list a nursing route only when its current availability, format and qualification have been confirmed from the university’s official pages.',
    whatToCheck: ['Whether the route is on-campus, blended or distance, and whether that format is recognised where you plan to work.', 'Level of award (bachelor or master) and duration.', 'Clinical placement arrangements.'],
  },
  pharmacy: {
    name: 'Pharmacy',
    title: 'Study Pharmacy in Ukraine',
    description: 'Pharmacy for international students in Ukraine: what each university sets itself (duration, title, language, fees), what to check, and how we verify a programme.',
    summary: 'Each university sets its own qualification title and programme duration.',
    intro: 'Each university sets the duration and qualification title of its own pharmacy programme. As with other programmes, we record the qualification, duration, language and fees only from official university sources.',
    whatToCheck: ['Qualification title and duration.', 'Language of instruction for international applicants.', 'Recognition requirements for pharmacists in your intended country.'],
  },
} as const;

export type CourseSlug = keyof typeof COURSES;
