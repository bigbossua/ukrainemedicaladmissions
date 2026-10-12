/**
 * Course (programme category) pages: copy and metadata.
 *
 * Guidance only. No duration, qualification title, fee, teaching language, availability, accreditation or recognition
 * is stated here as a fact about any university, government body or regulator: those are programme-specific and come
 * only from verified records in the universities collection. Everything else is written as a check or a question the
 * student puts to the university or to the regulator where they plan to work. Never list research-preview universities
 * here or on the course pages (tests/publication-policy.mjs, tests/publication-gate.mjs); a plain link to /universities/
 * is fine.
 *
 * Fields:
 * - `title`: the <title>. The layout appends " | Ukraine Medical Admissions", so keep it to 41 characters or fewer.
 * - `h1`, `lead`: the visible heading and subtitle (the lead is not the meta description).
 * - `description`: the meta description, 50 to 165 characters (tests/check-meta.mjs).
 * - `summary`: one-line card text on the home page and /courses/. `cardLink`: the /courses/ card link text.
 * - `sections`: printed in order before the list of verified universities. `id` is the anchor: keep it stable.
 * Text that contains links is an array of strings and { text, href } parts, rendered by the template without set:html.
 */
export type Inline = string | { text: string; href: string };
export type Rich = readonly Inline[];

export interface CourseSection {
  id: string;
  heading: string;
  paragraphs?: readonly Rich[];
  checks?: readonly Rich[];
  after?: readonly Rich[];
}

export interface Course {
  name: string;
  title: string;
  h1: string;
  description: string;
  lead: string;
  summary: string;
  cardLink: string;
  sections: readonly CourseSection[];
}

const ELIGIBILITY = '/admissions/#readiness';
const FEES = '/tuition-fees/';
// Section anchor already linked from /admissions/ and /tuition-fees/, so it is kept stable by the FAQ page.
const FAQ_ELIGIBILITY = '/faq/#eligibility-duration-and-recognition';

export const COURSES: Record<'medicine' | 'dentistry' | 'nursing' | 'pharmacy', Course> = {
  medicine: {
    name: 'Medicine',
    title: 'Study Medicine (MBBS) in Ukraine',
    h1: 'Study Medicine (MBBS) in Ukraine',
    description: 'Medicine in Ukraine, often searched as MBBS: what the term means here, how to check programme length and entry requirements, and who decides recognition.',
    lead: 'Medicine is often searched as “MBBS in Ukraine”. Here is what to check before you apply, and where to find answers on programme length, fees and eligibility.',
    summary: 'Often searched as MBBS. How to check the qualification title, programme length and entry requirements.',
    cardLink: 'Medicine (often searched as MBBS): what to check →',
    sections: [
      {
        id: 'mbbs',
        heading: 'Searching for “MBBS in Ukraine”?',
        paragraphs: [
          ['We use “MBBS” on this page because it is how many applicants search, for example “MBBS in Ukraine” or “Ukraine MBBS college”. Each Ukrainian university uses its own title for the medical qualification it awards, so the wording may not include “MBBS”. Check the exact title on the university’s own programme page.'],
          ['Whether that qualification is accepted where you plan to work, including in place of an MBBS, is decided by the regulator in that country, not by the university and not by us. Some regulators also require the medical school to be listed in a particular directory, so check whether yours does.'],
        ],
      },
      {
        id: 'duration',
        heading: 'How many years is medicine (MBBS) in Ukraine?',
        paragraphs: [['The length is set for each programme, so we do not give a general figure. Check it in two places:']],
        checks: [
          ['The university’s own programme page or programme document: the number of years, and whether a preparatory year or any internship is counted separately.'],
          ['Your regulator’s current rules, in case it sets requirements for the length or content of a medical programme studied abroad.'],
        ],
        after: [['A verified programme profile shows the length in the university’s own words, with its source. More on length, NEET and recognition is in the ', { text: 'FAQ', href: FAQ_ELIGIBILITY }, '.']],
      },
      {
        id: 'eligibility',
        heading: 'Can you apply? Entry requirements for medicine',
        paragraphs: [['Check the entry requirements on the programme page against your own school-leaving qualification:']],
        checks: [
          ['which subjects and grades it asks for from your qualification, and on which grading scale;'],
          ['whether there is an entrance test or interview, and in what format;'],
          ['the language requirement for the teaching language you choose.'],
        ],
        after: [
          ['From India? Ask the National Medical Commission (NMC) whether you need NEET or another exam before you study medicine abroad, and read its current rules on its own website.'],
          ['Our ', { text: 'admissions guide explains how to check your eligibility', href: ELIGIBILITY }, '.'],
        ],
      },
      {
        id: 'questions',
        heading: 'Questions to ask the university about medicine',
        checks: [
          ['Which teaching language does the programme use for your intake, and is it open to applicants from your country?'],
          ['How is clinical training organised, where does it take place, and from which year?'],
          ['Will you need Ukrainian for any part of the course, for example when you work with patients?'],
          ['Where and how is the programme being taught this academic year?'],
        ],
      },
      {
        id: 'fees',
        heading: 'Fees for medicine (MBBS)',
        paragraphs: [['Take tuition figures only from the university’s own fee schedule, and ask what the fee covers and what you will pay separately. Our guide to ', { text: 'MBBS fees in Ukraine', href: FEES }, ' explains how to read a schedule and compare like with like.']],
      },
    ],
  },
  dentistry: {
    name: 'Dentistry',
    title: 'Study Dentistry in Ukraine: what to ask',
    h1: 'Study Dentistry in Ukraine',
    description: 'Dentistry in Ukraine for international students: questions to ask about practical training, the qualification title and extra costs, and who decides recognition.',
    lead: 'What to ask a Ukrainian university before you apply for dentistry, and who decides whether you can practise at home.',
    summary: 'Questions to ask about practical training, the qualification title and what the fee covers.',
    cardLink: 'Dentistry: what to check →',
    sections: [
      {
        id: 'questions',
        heading: 'Questions to ask the university about dentistry',
        paragraphs: [['Ask these before you apply, and keep the answers in writing:']],
        checks: [
          ['What is the exact qualification title, as it will appear on the diploma?'],
          ['How are practical and clinical training organised, and in which years?'],
          ['Where does any clinical work with patients take place, and which language will you need to speak with patients?'],
          ['Is the programme open to international applicants for your intake, and in which language is it taught?'],
          ['Does the fee include dental materials and instruments, or do students buy their own? Ask for a written list of extra costs.'],
        ],
      },
      {
        id: 'recognition',
        heading: 'Can you practise dentistry at home with a Ukrainian degree?',
        paragraphs: [['That is decided by the dental regulator in the country where you plan to work, not by the university and not by us. Before you apply, read what your regulator publishes for dentists who qualified abroad, and check:']],
        checks: [
          ['whether it accepts the qualification title and award level the university gives;'],
          ['whether you will need to pass its own exams or complete supervised practice before you can register;'],
          ['whether it has rules on the length, teaching language or clinical content of the programme.'],
        ],
      },
      {
        id: 'requirements',
        heading: 'Entry requirements and fees for dentistry',
        paragraphs: [['Check the subjects, grades and any entrance test for your own qualification on the programme page; our ', { text: 'admissions guide explains how to check your eligibility', href: ELIGIBILITY }, '. Before you compare costs, read ', { text: 'how to read a university fee schedule', href: FEES }, '.']],
      },
    ],
  },
  nursing: {
    name: 'Nursing',
    title: 'Study Nursing in Ukraine: what to check',
    h1: 'Study Nursing in Ukraine',
    description: 'Nursing in Ukraine for international students: questions on award level, study format and clinical placements, and who decides whether you can register at home.',
    lead: 'What to ask a Ukrainian university before you apply for nursing, and who decides whether you can register as a nurse at home.',
    summary: 'What to check about the award level, study format and clinical placements.',
    cardLink: 'Nursing: what to check →',
    sections: [
      {
        id: 'questions',
        heading: 'Questions to ask the university about nursing',
        checks: [
          ['What level of award is the course, for example bachelor’s or master’s, and what is the exact title on the diploma?'],
          ['How is the course delivered: on campus, blended or at a distance? How much of it must you attend in person?'],
          ['How are clinical placements arranged: where, in which years, and in which language will you work with patients?'],
          ['Do you need earlier nursing study or work experience to be admitted at the level you want?'],
          ['Is the course open to international applicants for your intake, and in which language is it taught?'],
        ],
      },
      {
        id: 'registration',
        heading: 'Will a Ukrainian nursing qualification let you register at home?',
        paragraphs: [['Registration as a nurse is decided by the nursing regulator in the country where you plan to work, not by the university and not by us. Before you apply, ask your regulator:']],
        checks: [
          ['whether it accepts the award level and title you are considering;'],
          ['whether the study format matters, for example if part of the course is taught at a distance;'],
          ['whether it requires a set amount of supervised clinical practice, or its own exam, before you can register.'],
        ],
      },
      {
        id: 'requirements',
        heading: 'Entry requirements and fees for nursing',
        paragraphs: [['Check the entry requirements for your own qualification and the level you want; our ', { text: 'admissions guide explains how to check them', href: ELIGIBILITY }, '. For costs, see ', { text: 'how to read a university fee schedule', href: FEES }, ' and ask whether placements bring extra costs.']],
      },
    ],
  },
  pharmacy: {
    name: 'Pharmacy',
    title: 'Study Pharmacy in Ukraine: what to check',
    h1: 'Study Pharmacy in Ukraine',
    description: 'Pharmacy in Ukraine for international students: what to ask about the qualification title, teaching language and practical training, and who decides registration.',
    lead: 'What to ask a Ukrainian university before you apply for pharmacy, and who decides whether you can register as a pharmacist at home.',
    summary: 'What to check about the qualification title, teaching language and practical training.',
    cardLink: 'Pharmacy: what to check →',
    sections: [
      {
        id: 'questions',
        heading: 'Questions to ask the university about pharmacy',
        checks: [
          ['What is the exact qualification title and level of award, as it will appear on the diploma?'],
          ['Is the programme open to international applicants for your intake, and in which language is it taught?'],
          ['How much laboratory work does it include, and is there a practical placement, for example in a community or hospital pharmacy? Where, and in which years?'],
          ['Which areas does the programme cover, if you have a particular career in mind, such as industry or research?'],
        ],
      },
      {
        id: 'registration',
        heading: 'Can you work as a pharmacist at home with a Ukrainian qualification?',
        paragraphs: [['Registration as a pharmacist is decided by the pharmacy regulator in the country where you plan to work, not by the university and not by us. Read what it publishes for pharmacists who qualified abroad, and check:']],
        checks: [
          ['whether it accepts the title and award level the university gives;'],
          ['whether you will need to pass its exams, or complete a period of supervised practice, before you can register;'],
          ['whether it has rules on the length or content of the programme.'],
        ],
      },
      {
        id: 'requirements',
        heading: 'Entry requirements and fees for pharmacy',
        paragraphs: [['Ask which science subjects and grades the programme expects from your qualification, and whether there is an entrance test; our ', { text: 'admissions guide explains how to check', href: ELIGIBILITY }, '. Before you compare costs, see ', { text: 'how to read a university fee schedule', href: FEES }, '.']],
      },
    ],
  },
};

export type CourseSlug = keyof typeof COURSES;
