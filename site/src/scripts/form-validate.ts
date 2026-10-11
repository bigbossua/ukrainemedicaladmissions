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

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
    return el.dataset.msgFormat ?? 'Enter a complete email address, including the @ sign';
  }
  if (el instanceof HTMLInputElement && el.pattern && !new RegExp(`^(?:${el.pattern})$`).test(value)) {
    return el.dataset.msgFormat ?? 'Check the format of this answer';
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

// Simple forms: validate everything on submit (behaviour of the contact page).
document.querySelectorAll<HTMLFormElement>('form[data-form]:not([data-steps])').forEach((form) => {
  const summary = form.querySelector<HTMLElement>('[data-form-error]');
  form.addEventListener('submit', (e) => {
    const problems = validate(rulesIn(form));
    if (problems.length) {
      e.preventDefault();
      if (summary) { summary.hidden = false; summary.textContent = 'Please complete the highlighted fields.'; }
      problems[0].el.focus();
    } else if (summary) summary.hidden = true;
  });
});
