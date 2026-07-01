/**
 * Navigation — glass effect on scroll
 */

export function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    onUpdate: (self) => {
      if (self.scroll() > 80) {
        nav.style.background = "rgba(0, 0, 0, 0.72)";
        nav.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";
      } else {
        nav.style.background = "";
        nav.style.borderBottom = "";
      }
    },
  });
}
