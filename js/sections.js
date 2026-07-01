/**
 * Section scroll-in reveals
 */

export function initSectionReveals() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    gsap.set(
      ".section__eyebrow, .section__title, .section__text, .about__stats, .projects__grid, .contact__links",
      { opacity: 1, y: 0 }
    );
    return;
  }

  const sections = [
    { trigger: "#about", targets: ".about .section__eyebrow, .about .section__title, .about .section__text, .about__stats" },
    { trigger: "#projects", targets: ".projects .section__eyebrow, .projects .section__title, .projects__grid" },
    { trigger: "#contact", targets: ".contact .section__eyebrow, .contact .section__title, .contact .section__text, .contact__links" },
  ];

  sections.forEach(({ trigger, targets }) => {
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
