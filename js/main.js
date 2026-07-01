/**
 * Main scroll logic — GSAP ScrollTrigger
 * Supports: placeholder reveal + future frame sequence from video
 */

import { initHeroScroll } from "./hero-scroll.js";
import { initSectionReveals } from "./sections.js";
import { initNav } from "./nav.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeroScroll();
  initSectionReveals();

  // Refresh on resize (debounced)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
