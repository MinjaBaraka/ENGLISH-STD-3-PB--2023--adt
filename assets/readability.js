/*
 * Apply one PDF-grounded type scale to equivalent textbook content.
 *
 * The old implementation multiplied every authored font size by 1.30. Since
 * pages used different Tailwind and inline values, that preserved (and often
 * exaggerated) accidental differences. This classifier assigns a semantic
 * role instead; book-guide-fixes.css owns one fixed size for every role.
 */
(() => {
  const TEXT_SELECTOR = '#content [data-id]';
  const NON_TEXT_TAGS = new Set([
    'IMG', 'SVG', 'PATH', 'VIDEO', 'AUDIO', 'CANVAS', 'IFRAME', 'SOURCE'
  ]);
  const COVER_TYPES = new Set(['front_cover', 'back_cover']);
  const FRONT_MATTER_TYPES = new Set(['inside_cover', 'credits']);

  const UNIT_TITLES = new Set([
    'pg007_n0002', 'pg016_n0002', 'pg026_n0002', 'pg035_n0002',
    'pg044_n0002', 'pg052_n0002', 'pg059_n0002', 'pg066_n0010'
  ]);
  const UNIT_SUBTITLES = new Set([
    'pg007_n0004', 'pg016_n0004', 'pg026_n0004', 'pg035_n0004',
    'pg044_n0004', 'pg052_n0003', 'pg059_n0004', 'pg066_n0011'
  ]);

  const IMPERATIVE_START = /^(?:\(?[a-h]\)?[.)]?\s*)?(?:answer|ask|act|change|choose|combine|complete|construct|copy|count|describe|discuss|draw|fill|form|identify|join|listen|look|make|match|name|observe|practise|practice|pronounce|read|recite|repeat|say|select|sing|study|tell|use|watch|work|write)\b/i;
  const SHORT_LABEL = /^(?:\(?[a-z]\)|\(?[ivxlcdm]+\)|\d+[.)]?|[a-z][.)]|[a-z][a-z .'-]{0,22}:)$/i;
  const SUBHEADING_WORDS = /^(?:introduction|questions?|examples?|dialogue|song|poem|chorus|verse|story|vocabulary)(?:\s*[:.]\s*)?$/i;

  function cleanText(element) {
    return (element.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function isLeafText(element) {
    if (NON_TEXT_TAGS.has(element.tagName)) return false;
    if (element.getAttribute('aria-hidden') === 'true') return false;
    if (element.closest('.sr-only,[hidden],[aria-hidden="true"]')) return false;
    return !element.querySelector('[data-id]');
  }

  function leafTextNodes(root) {
    return [...root.querySelectorAll('[data-id]')].filter(isLeafText);
  }

  function clusterText(element, maximumLeaves = 4, maximumLength = 420) {
    let node = element.parentElement;
    const content = document.getElementById('content');

    for (let depth = 0; node && node !== content && depth < 4; depth += 1, node = node.parentElement) {
      const leaves = leafTextNodes(node).filter((candidate) => cleanText(candidate));
      if (!leaves.includes(element)) continue;
      if (leaves.length > maximumLeaves) break;

      const text = leaves.map(cleanText).join(' ').replace(/\s+/g, ' ').trim();
      if (leaves.length > 1 && text.length <= maximumLength) return text;
    }

    return cleanText(element);
  }

  function hasNearbyImage(element) {
    let node = element.parentElement;
    const section = element.closest('section');

    for (let depth = 0; node && node !== section && depth < 4; depth += 1, node = node.parentElement) {
      if (!node.querySelector('img')) continue;
      const leaves = leafTextNodes(node).filter((candidate) => cleanText(candidate));
      if (leaves.length <= 6) return true;
    }

    return false;
  }

  function looksLikeActivityTitle(element, text, sectionType) {
    if (sectionType === 'table_of_contents') return false;
    if (/^activity\s+\d+\s*:/i.test(text)) return true;

    const semanticContainer = element.closest('p,h1,h2,h3,h4,li');
    if (semanticContainer) {
      const semanticText = leafTextNodes(semanticContainer).map(cleanText).join(' ');
      return /^activity\s+\d+\s*:/i.test(semanticText);
    }

    return /^activity\s+\d+\s*:/i.test(clusterText(element, 3, 220));
  }

  function looksLikeInstruction(element, text) {
    if (IMPERATIVE_START.test(text)) return true;
    return IMPERATIVE_START.test(clusterText(element, 4, 520));
  }

  function looksLikeSubheading(element, text) {
    if (element.matches('h1,h2,h3,h4,[role="heading"]')) return true;
    if (element.closest('h1,h2,h3,h4,[role="heading"]')) return true;
    if (SUBHEADING_WORDS.test(text)) return true;

    const className = `${element.className || ''} ${element.parentElement?.className || ''}`;
    const isCentred = /(?:^|\s)text-center(?:\s|$)/.test(className);
    const isBold = /font-(?:bold|semibold|extrabold|black)/.test(className);
    const hasSentenceEnding = /[.!?]$/.test(text);
    return isCentred && isBold && text.length >= 7 && text.length <= 110 && !hasSentenceEnding;
  }

  function classify(element) {
    const id = element.dataset.id || '';
    const text = cleanText(element);
    const section = element.closest('[data-section-type]');
    const sectionType = section?.dataset.sectionType || '';

    if (COVER_TYPES.has(sectionType)) return null;
    if (UNIT_TITLES.has(id)) return 'unit-title';
    if (UNIT_SUBTITLES.has(id)) return 'unit-subtitle';

    if (/_page$/.test(id) || element.matches('.toc-number,.page-number,[data-page-number]')) {
      return 'page-number';
    }

    if (sectionType === 'table_of_contents') {
      if (element.matches('.toc-title')) return 'subheading';
      if (element.matches('.toc-unit-title')) return 'toc-heading';
      return 'toc-entry';
    }

    if (FRONT_MATTER_TYPES.has(sectionType)) {
      if (looksLikeSubheading(element, text)) return 'subheading';
      if (SHORT_LABEL.test(text) || /font-(?:bold|semibold|extrabold)/.test(element.className || '')) {
        return 'frontmatter-label';
      }
      return 'frontmatter';
    }

    if (looksLikeActivityTitle(element, text, sectionType)) {
      const clustered = clusterText(element, 3, 220);
      if (/^activity\s+\d+\s*:$/i.test(text) && clustered !== text) return 'activity-label';
      return 'activity-title';
    }
    if (looksLikeSubheading(element, text)) return 'subheading';

    if (element.closest('table,thead,tbody,tfoot,tr,th,td')) return 'table';

    if (
      element.closest('figcaption,.caption,.image-caption,.actor-bubble,.actor-name') ||
      /(?:^|[-_])(caption|credit)(?:$|[-_])/.test(element.className || '')
    ) {
      return 'caption';
    }

    if (SHORT_LABEL.test(text)) return 'label';

    if (looksLikeInstruction(element, text)) return 'instruction';

    if (hasNearbyImage(element)) {
      if (/^\d+[.)]?$/.test(text)) return 'label';
      return 'caption';
    }

    return 'body';
  }

  let scheduled = false;
  function applyTypography() {
    scheduled = false;
    const content = document.getElementById('content');
    if (!content) return;

    for (const element of content.querySelectorAll(TEXT_SELECTOR)) {
      if (!isLeafText(element)) continue;
      const role = classify(element);

      if (role) {
        element.dataset.adtTypography = role;
      } else {
        delete element.dataset.adtTypography;
      }

      /* Remove only the former scaler's inline overrides. */
      if (element.dataset.adtReadableScaled) {
        element.style.removeProperty('font-size');
        element.style.removeProperty('line-height');
        delete element.dataset.adtReadableScaled;
      }
    }
  }

  function scheduleTypography() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(applyTypography);
  }

  function start() {
    applyTypography();

    const content = document.getElementById('content');
    if (!content) return;

    const observer = new MutationObserver(scheduleTypography);
    observer.observe(content, { childList: true, characterData: true, subtree: true });

    /* The ADT runtime localises text asynchronously and Easy Read may rebuild it. */
    window.setTimeout(scheduleTypography, 250);
    window.setTimeout(scheduleTypography, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
