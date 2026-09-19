// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Services accordion
document.querySelectorAll('.service-head').forEach(head => {
  head.addEventListener('click', () => {
    const block = head.closest('.service-block');
    const wasOpen = block.classList.contains('open');
    document.querySelectorAll('.service-block').forEach(b => b.classList.remove('open'));
    if (!wasOpen) block.classList.add('open');
  });
});
// Open first service block by default
document.querySelector('.service-block')?.classList.add('open');

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Request a Quote form -> opens the user's email client with a pre-filled message
// (GitHub Pages is a static host, so there is no server to receive form posts.
//  For automated email delivery without opening a mail client, connect this
//  form's action to a free service like Formspree — see the note in quote.html)
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(quoteForm);
    const body = [
      `Name: ${f.get('name')}`,
      `Laboratory/Hospital: ${f.get('lab')}`,
      `City: ${f.get('city')}`,
      `Mobile: ${f.get('mobile')}`,
      `Email: ${f.get('email')}`,
      `Service Required: ${f.get('service')}`,
      `Product Required: ${f.get('product')}`,
      ``,
      `Message:`,
      f.get('message')
    ].join('\n');
    const subject = encodeURIComponent(`Quote Request — ${f.get('lab') || f.get('name')}`);
    window.location.href = `mailto:nikbioinnovation@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
}
