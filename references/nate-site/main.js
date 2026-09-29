/* Nate Walsh — site motion (GSAP 3 + ScrollTrigger) */
document.getElementById('yr').textContent = new Date().getFullYear();

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Split headlines into masked words ---- */
document.querySelectorAll('[data-split]').forEach(el => {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map(w => `<span class="word"><span>${w}</span></span>`).join(' ');
});
/* ---- Split scrubbed paragraphs into plain words ---- */
document.querySelectorAll('[data-scrub-words]').forEach(el => {
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
});

if (reduce || !window.gsap) {
  document.querySelector('.loader')?.remove();
  document.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
} else {
  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector('.hero');
  const heroWords = hero.querySelectorAll('.word > span');
  const heroFades = hero.querySelectorAll('[data-hero-fade]');
  const laterSplits = [...document.querySelectorAll('[data-split]')].filter(el => !hero.contains(el));

  // Initial states (JS-only so the page still reads fine without JS)
  gsap.set(heroWords, { yPercent: 100 });
  gsap.set(heroFades, { autoAlpha: 0, y: 24 });
  gsap.set('.nav', { y: -130 });
  gsap.set('.loader .logo span', { y: 0, yPercent: 100 });
  laterSplits.forEach(el => gsap.set(el.querySelectorAll('.word > span'), { yPercent: 100 }));

  /* ---------- Intro timeline (timings match the reference loader) ---------- */
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: true })
    .to('.loader .logo span',        { yPercent: 0, duration: 2, stagger: .1 }, 0.12)
    .to('.loader .cols--wipe > i',   { height: '120%', duration: 1.25, stagger: .1 }, 1.75)
    .set('.loader .logo',            { display: 'none' }, 2.52)
    .to('.nav',                      { y: 0, duration: 2, ease: 'expo.inOut' }, 3.0)
    .set('.loader .cols--curtain',   { display: 'none' }, 3.04)
    .to('.loader .cols--wipe > i',   { yPercent: 120, duration: 1.93, stagger: .1 }, 3.08)
    .to(heroWords,                   { yPercent: 0, duration: 2, stagger: .05 }, 3.64)
    .to(heroFades,                   { autoAlpha: 1, y: 0, duration: 1.4, stagger: .1 }, 4.1)
    .set('.loader',                  { display: 'none' }, 5.17);

  // Tip: speed the whole intro up for returning visitors
  try { if (sessionStorage.getItem('seenIntro')) intro.timeScale(2.2); sessionStorage.setItem('seenIntro', '1'); } catch (e) {}

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => intro.play());

  /* ---------- Masked headline reveals on scroll ---------- */
  laterSplits.forEach(el => {
    gsap.to(el.querySelectorAll('.word > span'), {
      yPercent: 0, duration: 1.6, ease: 'expo.out', stagger: .05,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  /* ---------- Generic fade-up reveals ---------- */
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1.2, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });
  ScrollTrigger.batch('.card', { start: 'top 88%', onEnter: b => gsap.to(b, { opacity: 1, y: 0, stagger: .12, duration: 1.2, ease: 'expo.out', overwrite: true }) });

  /* ---------- Word-by-word scrub (statement) ---------- */
  document.querySelectorAll('[data-scrub-words]').forEach(el => {
    gsap.fromTo(el.querySelectorAll('.w'), { color: 'rgba(20,22,26,.2)' }, {
      color: 'rgba(20,22,26,1)', stagger: .05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: .6 }
    });
  });

  /* ---------- Parallax background layers ---------- */
  gsap.utils.toArray('[data-parallax]').forEach(layer => {
    const amt = parseFloat(layer.dataset.parallax) || .15;
    gsap.fromTo(layer, { yPercent: -amt * 50 }, {
      yPercent: amt * 50, ease: 'none',
      scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---------- Marquee (pauses on hover) ---------- */
  const track = document.querySelector('.marquee__track');
  track.innerHTML += track.innerHTML;               // duplicate for seamless loop
  const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
  track.addEventListener('mouseenter', () => gsap.to(loop, { timeScale: 0.2, duration: .6 }));
  track.addEventListener('mouseleave', () => gsap.to(loop, { timeScale: 1, duration: .6 }));
}
