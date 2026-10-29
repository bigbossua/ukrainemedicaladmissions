/**
 * Accessible client-side validation for the enquiry (contact) and candidate-profile (apply) forms.
 * Server-side validation in public/api/enquiry.php is authoritative; this only helps people fix mistakes early.
 *
 * - Simple forms (`form[data-form]` without `data-steps`, e.g. /contact/) are validated on submit here.
 * - The stepped form at /apply/ (`data-steps`) is driven by apply-steps.ts, which uses the helpers exported below.
 *
 * Messages come from data attributes on each control: data-msg-required, data-msg-format.
 * An inline message slot is an element with id "<control id>-error" (optional).
 */
export type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export interface Problem { el: Control; message: string }

// Close to PHP's FILTER_VALIDATE_EMAIL (the server check in enquiry.php): no leading, trailing or doubled dot in the
// local part, ASCII domain labels without underscores, and a top-level domain of letters.
const EMAIL = /^(?!\.)(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

/** The controls in a container that carry a validation rule. */
export function rulesIn(root: ParentNode): Control[] {
  return [...root.querySelectorAll<Control>('input, select, textarea')].filter(
    (el) => el.type !== 'hidden' && (el.required || el.type === 'email' || (el instanceof HTMLInputElement && !!el.pattern)),
  );
}

/** The problem with one control, or null when it is fine. */
export function problemWith(el: Control): string | null {
  const value = el.value.trim();
  if (el instanceof HTMLInputElement && el.type === 'checkbox') {
    return el.required && !el.checked ? el.dataset.msgRequired ?? 'Tick this box to continue' : null;
  }
  if (el.required && !value) return el.dataset.msgRequired ?? 'Complete this field';
  if (!value) return null;
  if (el instanceof HTMLInputElement && el.type === 'email' && !EMAIL.test(value)) {
    return el.dataset.msgFormat ?? 'Enter a complete email address, including the @ and the part after it (such as gmail.com)';
  }
  if (el instanceof HTMLInputElement && el.pattern && !new RegExp(`^(?:${el.pattern})$`).test(value)) {
    return el.dataset.msgFormat ?? 'Check the format of this answer';
  }
  // data-year-range="1950:+6": a four-digit year from 1950 to this year + 6, the window the server accepts.
  const range = el.dataset.yearRange?.match(/^(\d{4}):\+(\d+)$/);
  if (range && (Number(value) < Number(range[1]) || Number(value) > new Date().getFullYear() + Number(range[2]))) {
    return el.dataset.msgFormat ?? 'Check the year';
  }
  return null;
}

function describedBy(el: Control, id: string, on: boolean) {
  const ids = new Set((el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
  if (on) ids.add(id); else ids.delete(id);
  if (ids.size) el.setAttribute('aria-describedby', [...ids].join(' ')); else el.removeAttribute('aria-describedby');
}

/** Mark one control valid or invalid (aria-invalid, .error on its wrapper, inline message when a slot exists). */
export function mark(el: Control, message: string | null) {
  const bad = message !== null;
  el.closest('.field, .checkbox')?.classList.toggle('error', bad);
  if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
  const slot = el.id ? document.getElementById(`${el.id}-error`) : null;
  if (slot) {
    slot.textContent = message ?? '';
    slot.hidden = !bad;
    describedBy(el, slot.id, bad);
  }
}

/** Validate controls, mark each, and return the problems in document order. */
export function validate(controls: Control[]): Problem[] {
  const problems: Problem[] = [];
  for (const el of controls) {
    const message = problemWith(el);
    mark(el, message);
    if (message) problems.push({ el, message });
  }
  return problems;
}

/** Fill and reveal an error summary: one link per problem, each moving focus to its control. */
export function showSummary(summary: HTMLElement, problems: Problem[]) {
  const list = summary.querySelector<HTMLElement>('[data-error-list]');
  list?.replaceChildren(...problems.map(({ el, message }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${el.id}`;
    a.textContent = message;
    a.addEventListener('click', (e) => { e.preventDefault(); el.focus(); });
    li.append(a);
    return li;
  }));
  summary.hidden = false;
  summary.focus();
}

export function hideSummary(summary: HTMLElement | null) {
  if (!summary) return;
  summary.hidden = true;
  summary.querySelector('[data-error-list]')?.replaceChildren();
}

// Back from an error page (or a bfcache restore) must find the form usable again (audit AX-09).
window.addEventListener('pageshow', () => {
  document.querySelectorAll<HTMLButtonElement>('form[data-form] button[type="submit"]').forEach((b) => { b.disabled = false; b.removeAttribute('aria-disabled'); });
});

/** After a valid submit: disable the submit button so a double click or a repeated Enter cannot post twice. */
export function lockSubmit(form: HTMLFormElement) {
  form.querySelectorAll<HTMLButtonElement>('button[type="submit"]').forEach((b) => { b.disabled = true; b.setAttribute('aria-disabled', 'true'); });
}

// Simple forms: validate everything on submit (behaviour of the contact page).
document.querySelectorAll<HTMLFormElement>('form[data-form]:not([data-steps])').forEach((form) => {
  const summary = form.querySelector<HTMLElement>('[data-form-error]');
  const ts = form.querySelector<HTMLInputElement>('input[name="ts"]');
  form.addEventListener('submit', (e) => {
    const problems = validate(rulesIn(form));
    if (problems.length) {
      e.preventDefault();
      if (summary) { summary.hidden = false; summary.textContent = 'Please complete the highlighted fields.'; }
      problems[0].el.focus();
      return;
    }
    if (summary) summary.hidden = true;
    if (ts) ts.value = String(Math.round(performance.now())); // ms since the page began loading, not since this script ran
    lockSubmit(form);
  });
});
