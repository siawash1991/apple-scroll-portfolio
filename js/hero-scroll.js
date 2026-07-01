/**
 * Hero scroll effect — placeholder + frame sequence ready
 */

const FRAME_CONFIG = {
  /** Set to true when frames are extracted from video */
  useFrameSequence: false,
  /** Path pattern: frame-0001.webp, frame-0002.webp, ... */
  framePath: "/assets/images/frames/frame-",
  frameCount: 0,
  frameExtension: "webp",
  framePadLength: 4,
};

/**
 * Build frame URL from index (1-based)
 */
function getFrameUrl(index) {
  const num = String(index).padStart(FRAME_CONFIG.framePadLength, "0");
  return `${FRAME_CONFIG.framePath}${num}.${FRAME_CONFIG.frameExtension}`;
}

/**
 * Preload frame images for canvas playback
 */
async function preloadFrames(count) {
  const images = [];
  const promises = [];

  for (let i = 1; i <= count; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);
    images.push(img);
    promises.push(
      new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      })
    );
  }

  await Promise.all(promises);
  return images;
}

/**
 * Draw frame to canvas
 */
function drawFrame(canvas, ctx, image) {
  if (!image?.complete) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const imgRatio = image.width / image.height;
  const canvasRatio = rect.width / rect.height;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (imgRatio > canvasRatio) {
    drawHeight = rect.height;
    drawWidth = drawHeight * imgRatio;
    offsetX = (rect.width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = rect.width;
    drawHeight = drawWidth / imgRatio;
    offsetX = 0;
    offsetY = (rect.height - drawHeight) / 2;
  }

  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

/**
 * Placeholder reveal: split face halves + show robot
 */
function initPlaceholderReveal() {
  const hero = document.querySelector("#hero");
  const halfRight = document.querySelector(".hero__half--right");
  const halfLeft = document.querySelector(".hero__half--left");
  const placeholder = document.querySelector("#hero-placeholder");
  const copy = document.querySelector(".hero__copy");
  const scrollHint = document.querySelector(".hero__scroll-hint");

  if (!hero || !halfRight || !halfLeft) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      pin: ".hero__sticky",
      anticipatePin: 1,
    },
  });

  tl.to(
    halfRight,
    {
      xPercent: 55,
      rotation: 2,
      ease: "none",
    },
    0
  )
    .to(
      halfLeft,
      {
        xPercent: -55,
        rotation: -2,
        ease: "none",
      },
      0
    )
    .to(
      placeholder,
      {
        scale: 1.08,
        ease: "none",
      },
      0
    )
    .to(
      copy,
      {
        opacity: 0,
        y: -30,
        ease: "none",
      },
      0.15
    )
    .to(
      scrollHint,
      {
        opacity: 0,
        ease: "none",
      },
      0
    );

  return tl;
}

/**
 * Frame sequence scroll (when video frames are ready)
 */
async function initFrameSequenceReveal() {
  const hero = document.querySelector("#hero");
  const canvas = document.querySelector("#hero-canvas");
  const placeholder = document.querySelector("#hero-placeholder");
  const copy = document.querySelector(".hero__copy");
  const scrollHint = document.querySelector(".hero__scroll-hint");

  if (!hero || !canvas || FRAME_CONFIG.frameCount < 1) {
    console.warn("[hero] Frame sequence not configured, using placeholder.");
    return initPlaceholderReveal();
  }

  const ctx = canvas.getContext("2d");
  let frames;

  try {
    frames = await preloadFrames(FRAME_CONFIG.frameCount);
  } catch (err) {
    console.error("[hero] Failed to load frames:", err);
    return initPlaceholderReveal();
  }

  canvas.classList.add("is-active");
  if (placeholder) placeholder.style.display = "none";

  drawFrame(canvas, ctx, frames[0]);

  const frameObj = { index: 0 };

  gsap.to(frameObj, {
    index: FRAME_CONFIG.frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      pin: ".hero__sticky",
      anticipatePin: 1,
      onUpdate: (self) => {
        const i = Math.round(frameObj.index);
        drawFrame(canvas, ctx, frames[i]);
      },
    },
  });

  gsap.to(copy, {
    opacity: 0,
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "30% bottom",
      scrub: true,
    },
  });

  gsap.to(scrollHint, {
    opacity: 0,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "10% bottom",
      scrub: true,
    },
  });
}

export function initHeroScroll() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    gsap.set(".hero__half--right", { xPercent: 55 });
    gsap.set(".hero__half--left", { xPercent: -55 });
    return;
  }

  if (FRAME_CONFIG.useFrameSequence && FRAME_CONFIG.frameCount > 0) {
    initFrameSequenceReveal();
  } else {
    initPlaceholderReveal();
  }
}

export { FRAME_CONFIG, getFrameUrl };
