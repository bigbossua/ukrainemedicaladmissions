/**
 * Course (programme category) definitions. Descriptive text only —
 * durations, fees and availability come from the universities collection.
 */
export const COURSES = {
  medicine: {
    name: 'Medicine',
    title: 'Study Medicine in Ukraine',
    description: 'Medicine programmes at Ukrainian universities for international students: duration, language, entry requirements and fees, verified against official sources.',
    intro: 'Medicine is the most sought-after programme among international applicants to Ukraine. Programmes are typically six years and lead to a medical degree whose exact title is set by each university. Below you will find only the universities whose medicine programme details we have recorded, each marked verified or pending.',
    whatToCheck: ['The exact qualification title awarded and its listing in the World Directory of Medical Schools.', 'Whether the English-taught stream is open to applicants from your country for the coming intake.', 'How clinical rotations are organised and where.', 'Licensing requirements in the country where you intend to practise — these are set by that country, not the university.'],
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
