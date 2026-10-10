/** Accessible client-side validation for enquiry/application-start forms. Server-side validation is in public/api/enquiry.php. */
document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  const summary = form.querySelector<HTMLElement>('[data-form-error]');
  form.addEventListener('submit', (e) => {
    let firstBad: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]').forEach((el) => {
      const field = el.closest('.field, .checkbox');
      const bad = el instanceof HTMLInputElement && el.type === 'checkbox' ? !el.checked : !el.value.trim() || (el instanceof HTMLInputElement && el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value));
      field?.classList.toggle('error', bad);
      el.setAttribute('aria-invalid', String(bad));
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      e.preventDefault();
      if (summary) { summary.hidden = false; summary.textContent = 'Please complete the highlighted fields.'; }
      (firstBad as HTMLElement).focus();
    } else if (summary) summary.hidden = true;
  });
});
