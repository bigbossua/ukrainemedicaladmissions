/**
 * WhatsApp contact (owner decision 2026-10-29, replacing the earlier "no WhatsApp links" rule): one business number,
 * and a pre-filled message that names this website, and the page the visitor was reading, so each enquiry's source is
 * clear without asking. The visitor can edit the message before sending. Plain https links only: no script, no cookie,
 * no tracking parameter, no personal data added. tests/whatsapp.mjs checks every link in the build.
 */
export const WHATSAPP = {
  /** International format without "+", spaces or punctuation, as wa.me requires. */
  number: '380633534065',
  display: '+380 63 353 40 65',
} as const;

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello Ukraine Medical Admissions, I found you through ukrainemedicaladmissions.com and would like information about studying medicine in Ukraine. Please advise me on the admissions process.';

/**
 * The pre-filled message. With a page name it says which page of the site the visitor was on: a page they read, never an
 * application or anything else they did not do.
 */
export function whatsappMessage(page?: string): string {
  const p = (page ?? '').replace(/\s+/g, ' ').trim();
  if (!p) return WHATSAPP_DEFAULT_MESSAGE;
  return `Hello Ukraine Medical Admissions, I found you through ukrainemedicaladmissions.com (${p} page) and would like information about studying medicine in Ukraine. Please advise me on the admissions process.`;
}

export const whatsappHref = (page?: string): string =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(whatsappMessage(page))}`;
