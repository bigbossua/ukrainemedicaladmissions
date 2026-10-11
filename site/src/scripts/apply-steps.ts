/**
 * Stepped candidate-profile form at /apply/ (APPLICATION_SYSTEM_SPEC.md §12.1). Progressive enhancement:
 * without this script every fieldset is visible and the form posts as one page.
 *
 * With it: one step at a time, a progress list (aria-current="step"), Back / Continue, per-step validation with an
 * error summary that links to each invalid field, focus moved to the step heading on every change, and a read-only
 * review of the answers with "Edit" links. Nothing is stored in the browser and nothing is sent until the final
 * submit. Also handles ?course=&university= prefill and the soft timing field "ts" read by public/api/enquiry.php.
 */
import { validate, rulesIn, showSummary, hideSummary, type Control } from './form-validate';

const form = document.querySelector<HTMLFormElement>('form[data-steps]');
if (form) enhance(form);

function prefill(form: HTMLFormElement) {
  const q = new URLSearchParams(location.search);
  for (const k of ['course', 'university']) {
    const v = q.get(k);
    const el = form.querySelector<HTMLSelectElement>(`select[name="${k}"]`);
    if (v && el && [...el.options].some((o) => o.value === v)) el.value = v;
  }
}

function make<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

const optionText = (s: HTMLSelectElement) => (s.value ? s.selectedOptions[0]?.textContent?.trim() ?? s.value : '');
const labelOf = (input: HTMLInputElement) => input.closest('label')?.textContent?.replace(/\s+/g, ' ').trim() ?? input.value;

/** The answers in one step as [label, value] pairs, in page order, for the review. */
function answers(step: HTMLElement): [string, string][] {
  const out: [string, string][] = [];
  step.querySelectorAll<HTMLElement>('[data-review], [data-review-kind="subject"]').forEach((el) => {
    if (el.dataset.reviewKind === 'subject') {
      const part = (p: string) => el.querySelector<Control>(`[data-part="${p}"]`);
      const name = part('name')?.value.trim() ?? '';
      const grade = part('grade')?.value.trim() ?? '';
      const status = part('status') as HTMLSelectElement | null;
      if (!name && !grade) return;
      const result = status ? optionText(status) : '';
      out.push([name || 'Subject (no name given)', [grade || 'No grade given', result].filter(Boolean).join(', ')]);
      return;
    }
    const label = el.dataset.review ?? '';
    if (el instanceof HTMLFieldSetElement) {
      const checked = el.querySelector<HTMLInputElement>('input[type="radio"]:checked');
      if (checked) out.push([label, labelOf(checked)]);
    } else if (el instanceof HTMLSelectElement) {
      const t = optionText(el);
      if (t) out.push([label, t]);
    } else if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      out.push([label, el.checked ? 'Yes' : 'No']);
    } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const t = el.value.trim();
      if (t) out.push([label, t]);
    }
  });
  return out;
}

function enhance(form: HTMLFormElement) {
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-step]')];
  const items = [...form.querySelectorAll<HTMLLIElement>('[data-progress-item]')];
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const review = form.querySelector<HTMLElement>('[data-review-summary]');
  const ts = form.querySelector<HTMLInputElement>('input[name="ts"]');
  const last = steps.length - 1;
  const started = performance.now();
  let current = 0;
  let returnToReview = false;

  prefill(form);
  form.classList.add('is-stepped');
  form.querySelectorAll<HTMLElement>('[data-step-nav]').forEach((el) => { el.hidden = false; });
  form.querySelectorAll<HTMLElement>('[data-nojs]').forEach((el) => { el.hidden = true; });

  const heading = (i: number) => steps[i].querySelector<HTMLElement>('h2');
  const title = (i: number) => steps[i].dataset.title ?? `Step ${i + 1}`;

  function buildReview() {
    if (!review) return;
    const blocks = steps.slice(0, last).map((step, i) => {
      const block = make('section', 'review-block');
      block.setAttribute('aria-labelledby', `review-${i + 1}`);
      const head = make('div', 'review-head');
      const h = make('h3', undefined, title(i));
      h.id = `review-${i + 1}`;
      const edit = make('a', 'review-edit', 'Edit');
      edit.href = `#${step.id}`;
      edit.dataset.goto = String(i);
      edit.append(make('span', 'visually-hidden', ` ${title(i).toLowerCase()}`));
      head.append(h, edit);
      block.append(head);
      const pairs = answers(step);
      if (pairs.length) {
        const dl = make('dl');
        for (const [k, v] of pairs) dl.append(make('dt', undefined, k), make('dd', undefined, v));
        block.append(dl);
      } else {
        block.append(make('p', 'review-empty', 'Nothing entered.'));
      }
      return block;
    });
    review.replaceChildren(make('p', 'intro', 'Check your answers. Use Edit to change anything.'), ...blocks);
    review.hidden = false;
  }

  function show(i: number, moveFocus: boolean) {
    current = i;
    steps.forEach((s, j) => { s.hidden = j !== i; });
    items.forEach((li, j) => {
      if (j === i) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      li.classList.toggle('done', j < i);
      let done = li.querySelector<HTMLElement>('[data-done]');
      if (j < i && !done) { done = make('span', 'visually-hidden', ' (done)'); done.dataset.done = ''; li.append(done); }
      if (j >= i) done?.remove();
    });
    const next = steps[i].querySelector<HTMLButtonElement>('[data-next]');
    if (next) next.textContent = returnToReview ? 'Return to review' : 'Continue';
    if (i === last) buildReview();
    if (moveFocus) {
      form.scrollIntoView({ block: 'start' });
      heading(i)?.focus({ preventScroll: true });
    }
  }

  /** Validate one step; on failure show the error summary and return false. */
  function check(i: number): boolean {
    const problems = validate(rulesIn(steps[i]));
    if (!problems.length) { hideSummary(summary); return true; }
    if (summary) showSummary(summary, problems); else problems[0].el.focus();
    return false;
  }

  function forward() {
    if (!check(current)) return;
    const target = returnToReview ? last : Math.min(current + 1, last);
    returnToReview = false;
    show(target, true);
  }

  form.addEventListener('click', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-next], [data-back], [data-goto]');
    if (!t || !form.contains(t)) return;
    e.preventDefault();
    if (t.hasAttribute('data-next')) forward();
    else if (t.hasAttribute('data-back')) { hideSummary(summary); returnToReview = false; show(Math.max(current - 1, 0), true); }
    else { hideSummary(summary); returnToReview = true; show(Number(t.dataset.goto) || 0, true); }
  });

  // Enter in a field submits the form natively: before the last step, treat it as Continue.
  form.addEventListener('submit', (e) => {
    if (current < last) { e.preventDefault(); forward(); return; }
    // Safety net: never send with a required answer missing; go back to the first step that needs attention.
    for (let i = 0; i < last; i++) {
      const problems = validate(rulesIn(steps[i]));
      if (problems.length) {
        e.preventDefault();
        returnToReview = false;
        show(i, false);
        if (summary) showSummary(summary, problems); else problems[0].el.focus();
        return;
      }
    }
    hideSummary(summary);
    if (ts) ts.value = String(Math.round(performance.now() - started));
  });

  // Once a field has been flagged, re-check it as the person corrects it, and drop it from the error summary.
  const recheck = (e: Event) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) return;
    if (el.getAttribute('aria-invalid') !== 'true' || validate([el]).length) return;
    if (!summary || summary.hidden) return;
    summary.querySelector(`a[href="#${CSS.escape(el.id)}"]`)?.closest('li')?.remove();
    if (!summary.querySelector('[data-error-list] li')) hideSummary(summary);
  };
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  show(0, false);
}
