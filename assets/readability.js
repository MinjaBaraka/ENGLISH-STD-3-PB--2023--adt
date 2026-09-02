/* Increase textbook text at desktop/tablet widths without resizing the ADT UI. */
(() => {
  const SCALE = 1.30;
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 48;
  const SELECTOR = '#content [data-id]';

  const nonTextTags = new Set(['IMG', 'SVG', 'PATH', 'VIDEO', 'AUDIO', 'CANVAS', 'IFRAME']);

  function scaleReadableText() {
    if (!window.matchMedia('(min-width: 701px)').matches) return;

    // The reader fills data-id elements with translated text asynchronously.
    // Scale their empty text containers now, so the final text inherits the
    // larger size regardless of when the ADT runtime finishes loading.
    const measurements = [...document.querySelectorAll(SELECTOR)]
      .filter((element) => {
        if (element.dataset.adtReadableScaled || nonTextTags.has(element.tagName)) return false;
        if (element.getAttribute('aria-hidden') === 'true') return false;
        return !element.querySelector('[data-id]');
      })
      .map((element) => {
        const style = window.getComputedStyle(element);
        return {
          element,
          fontSize: Number.parseFloat(style.fontSize),
          lineHeight: Number.parseFloat(style.lineHeight)
        };
      });

    for (const { element, fontSize, lineHeight } of measurements) {
      if (!Number.isFinite(fontSize) || fontSize < MIN_FONT_SIZE || fontSize > MAX_FONT_SIZE) continue;

      element.style.setProperty('font-size', `${(fontSize * SCALE).toFixed(2)}px`, 'important');
      if (Number.isFinite(lineHeight) && lineHeight > 0) {
        element.style.setProperty('line-height', `${(lineHeight * SCALE).toFixed(2)}px`, 'important');
      }
      element.dataset.adtReadableScaled = 'true';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scaleReadableText, { once: true });
  } else {
    scaleReadableText();
  }
})();
