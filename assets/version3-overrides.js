/* Version 3 validation-report overrides for the bundled offline reader. */
(function () {
  const originalFetch = window.fetch.bind(window);
  const textOverrides = {
    pg003_n0005: 'Acknowledgements',
    pg003_n0007: 'Introduction',
    pg003_n0011: 'Listening and speaking/observing and signing',
    pg003_n0013: 'Activity 1: Listening/observing and writing',
    pg003_n0015: 'Activity 2: Name different things orally or using sign language.',
    pg003_n0017: 'Activity 3: Describing actions orally or using sign language',
    pg003_n0019: 'Activity 4: Describing uses of common objects',
    pg003_n0021: 'Activity 5: Describing locations of objects',
    pg003_n0023: 'Activity 6: Listening to oral texts/observing signed video',
    pg003_n0025: 'Activity 7: Reading aloud/signing and answering oral questions',
    pg003_n0027: 'Activity 8: Oral/signing practice',
    pg003_n0031: 'Using personal pronouns',
    pg003_n0033: 'Activity 1: Recognising pronouns',
    pg003_n0035: 'Activity 2: Practising using pronouns orally or using sign language',
    pg003_n0037: 'Activity 3: Reading practice',
    pg003_n0039: 'Activity 4: Writing practice',
    pg003_n0043: 'Expressing possession',
    pg003_n0045: 'Activity 1: Listening and oral practice/Observing and signing',
    pg003_n0047: 'Activity 2: Reading practice',
    pg003_n0049: 'Activity 3: Writing practice',
    pg003_n0053: 'Describing routines',
    pg003_n0055: 'Activity 1: Listening and oral practice/Observing and signing',
    pg003_n0005_easy_read: 'Acknowledgements',
    pg003_n0007_easy_read: 'Introduction',
    pg003_n0011_easy_read: 'Listening and speaking/observing and signing',
    pg003_n0013_easy_read: 'Activity 1: Listening or observing and writing',
    pg003_n0015_easy_read: 'Activity 2: Name different things orally or using sign language.',
    pg003_n0017_easy_read: 'Activity 3: Describing actions orally or using sign language',
    pg003_n0019_easy_read: 'Activity 4: Describing how common objects are used',
    pg003_n0021_easy_read: 'Activity 5: Describing where objects are',
    pg003_n0023_easy_read: 'Activity 6: Listening to spoken texts or observing signed video',
    pg003_n0025_easy_read: 'Activity 7: Reading aloud or signing and answering spoken questions',
    pg003_n0027_easy_read: 'Activity 8: Speaking or signing practice',
    pg003_n0031_easy_read: 'Using personal pronouns',
    pg003_n0033_easy_read: 'Activity 1: Finding pronouns',
    pg003_n0035_easy_read: 'Activity 2: Practising using pronouns orally or using sign language',
    pg003_n0037_easy_read: 'Activity 3: Reading practice',
    pg003_n0039_easy_read: 'Activity 4: Writing practice',
    pg003_n0043_easy_read: 'Showing possession',
    pg003_n0045_easy_read: 'Activity 1: Listening and speaking practice or observing and signing',
    pg003_n0047_easy_read: 'Activity 2: Reading practice',
    pg003_n0049_easy_read: 'Activity 3: Writing practice',
    pg003_n0053_easy_read: 'Describing routines',
    pg003_n0055_easy_read: 'Activity 1: Listening and speaking practice or observing and signing',
    pg004_n0003_easy_read: 'Reading practice',
    pg004_n0005_easy_read: 'Writing practice',
    pg004_n0009_easy_read: 'Describing activities that are happening now',
    pg004_n0011_easy_read: 'Listening and speaking practice or observing and signing',
    pg004_n0013_easy_read: 'Writing practice',
    pg004_n0017_easy_read: "Connecting ideas with 'and' and 'but'",
    pg004_n0019_easy_read: 'Listening and speaking practice or observing and signing',
    pg004_n0021_easy_read: 'Writing practice',
    pg004_n0023_easy_read: 'Listening and speaking practice or observing and signing',
    pg004_n0025_easy_read: 'Writing practice',
    pg004_n0029_easy_read: 'Reading different kinds of texts',
    pg004_n0031_easy_read: 'Reading 2-syllable words',
    pg004_n0033_easy_read: 'Reading words with more than 1 syllable',
    pg004_n0035_easy_read: 'Reading aloud texts for your school level',
    pg004_n0037_easy_read: 'Oral/signing practice',
    pg004_n0041_easy_read: 'Recognising the basic features of spoken English or sign language',
    pg004_n0043_easy_read: 'Reading words with short vowels',
    pg004_n0045_easy_read: 'Reading words with long vowels',
    pg004_n0049_easy_read: 'long vowels',
    pg004_n0053_easy_read: 'short and long vowels',
    pg004_n0055_easy_read: 'Oral/signing practice',
    pg006_n0007: 'The book is aimed at enabling the pupil to develop competencies in listening/observing, speaking/signing, reading and writing in English.',
    pg007_n0014: 'Listening/observing and writing',
    pg007_n0019: 'Name different things orally or using sign language.',
    pg009_n0024: 'Describing actions orally or using sign language',
    pg009_n0025: 'Say/sign what the following people are doing.',
    pg010_n0032: 'Say/sign what the following things are used for.',
    pg012_n0009: 'Listening to oral texts/observing signed video',
    pg012_n0018: 'Then, answer the following questions orally or using sign language.',
    pg012_n0018_easy_read: 'Then, answer the following questions orally or using sign language.',
    pg013_n0005: 'Then, answer the questions that follow orally/sign.',
    pg015_n0003: 'Oral/signing practice',
    pg016_n0011: 'The competencies developed will enable you to use them orally/sign and in writing.',
    pg017_n0014: 'Read aloud / sign the pronouns in the table below.',
    pg017_n0014_easy_read: 'Read aloud / sign the pronouns in the table below.',
    pg017_n0005: 'A pronoun is a word that replaces a noun (times two)',
    pg017_n0008: 'A pronoun is a word that replaces a noun (times two)',
    pg017_n0011: 'A pronoun is a word that replaces a noun (times two)',
    pg018_n0002: 'Activity 2: Practising using pronouns orally or using sign language',
    pg020_n0009: 'Read the following dialogue and fill in the blanks with the correct pronouns. Use the following pronouns: I, we, you, he, she, it, they.',
    pg020_n0020: 'I’m Luta.',
    pg020_n0020_suffix: 'want to buy cows. Do you have any?',
    pg020_n0020_easy_read: 'I am Luta.',
    pg020_n0020_suffix_easy_read: 'want to buy cows. Do you have any?',
    pg023_n0013: 'is always held on the last Friday of the term.',
    pg023_n0015: 'were waiting for the inter-class competitions to begin.',
    pg023_n0002: '(e) Construct sentences orally/sign sentences from the table below.',
    pg023_n0004: '(f) Make sentences orally/sign sentences from the table below.',
    pg023_n0017: 'We\nI\nYou\nThey',
    pg023_n0018: 'like\nplay with\nknow\neat with\nsing with',
    pg023_n0019: 'her\nhim\nthem\nit',
    pg023_n0020: 'He\nShe\nIt',
    pg023_n0021: 'likes\nplays with\nknows\neats with\nsings with',
    pg023_n0022: 'her\nhim\nthem',
    pg023_n0002_easy_read: '(e) Construct sentences orally/sign sentences from the table below.',
    pg023_n0004_easy_read: '(f) Make sentences orally/sign sentences from the table below.',
    pg023_n0017_easy_read: 'We\nI\nYou\nThey',
    pg023_n0018_easy_read: 'like\nplay with\nknow\neat with\nsing with',
    pg023_n0019_easy_read: 'her\nhim\nthem\nit',
    pg023_n0020_easy_read: 'He\nShe\nIt',
    pg023_n0021_easy_read: 'likes\nplays with\nknows\neats with\nsings with',
    pg023_n0022_easy_read: 'her\nhim\nthem',
    pg023_n0013_easy_read: 'always takes place on the last Friday of the term.',
    pg023_n0015_easy_read: 'were waiting for the competitions between classes to begin.',
    pg024_n0006: 'was the team captain.',
    pg024_n0007: 'was in the netball team.',
    pg024_n0010: 'is our best scorer.',
    pg024_n0011: 'scored many goals for our team.',
    pg024_n0012: 'The netball match was tough, and',
    pg024_n0012_suffix: 'lost to Standard Two.',
    pg024_n0016: 'ended up 2 to 1.',
    pg024_n0006_easy_read: 'was the team captain.',
    pg024_n0007_easy_read: 'was in the netball team.',
    pg024_n0010_easy_read: 'is our best scorer.',
    pg024_n0011_easy_read: 'scored many goals for our team.',
    pg024_n0012_easy_read: 'The netball match was hard, and',
    pg024_n0012_suffix_easy_read: 'lost to Standard Two.',
    pg024_n0016_easy_read: 'finished 2 to 1.',
    pg026_n0013: 'Activity 1: Listening and oral practice/Observing and signing',
    pg026_n0019: 'We have stars, and they have hats (times two)',
    pg027_n0006: 'We have hats, and they have stars (times two)',
    pg027_n0038: 'John has a star. Ely has a star.\nI have a hat. You have a hat,\nWe have hats, and they have stars (times two).\n\nI have a hat. You have a hat.\nWe have hats.',
    pg027_n0039: 'Source: Adapted from Rockin’ English on YouTube.',
    pg027_n0038_easy_read: 'John has a star. Ely has a star.\nI have a hat. You have a hat.\nWe have hats, and they have stars. Repeat this 2 times.\n\nI have a hat. You have a hat.\nWe have hats.',
    pg027_n0039_easy_read: 'Source: Adapted from Rockin’ English on YouTube.',
    pg035_n0019: 'Answer these questions orally or using sign language.',
    pg037_n0014: 'every day in the morning (times two).',
    pg037_n0020: 'This is the way I wash my face, every day so early in the morning (times two).',
    pg037_n0027: 'every day in the evening (times two).',
    pg037_n0014_easy_read: 'every day in the morning (times two).',
    pg037_n0020_easy_read: 'This is how I wash my face every day, early in the morning (times two).',
    pg037_n0027_easy_read: 'every day in the evening (times two).',
    pg038_n0005: 'every day in the morning (times two).',
    pg038_n0005_easy_read: 'every day in the morning (times two).',
    pg038_n0052: 'This is the way we sit in class,\nsit in class, sit in class.\nThis is the way we sit in class,\nevery day in the morning (times two).',
    pg038_n0052_easy_read: 'This is the way we sit in class.\nSit in class. Sit in class.\nThis is the way we sit in class every morning. Repeat this 2 times.',
    pg044_n0015: 'Listening and Oral practice/Observing and signing practice',
    'pg044_sec002_ans_item-1': 'riding a bicycle',
    'pg044_sec002_ans_item-2': 'reading a book',
    pg044_n0037: 'Introduction',
    pg044_n0038: 'Ongoing activities are actions or events happening at the moment of speech. In this unit, you will describe actions or events happening at the present moment. You will learn the appropriate verb forms to use when describing ongoing activities. The competencies developed will enable you to describe activities happening at the moment of speech.',
    pg044_n0037_easy_read: 'Introduction',
    pg044_n0038_easy_read: 'Ongoing activities are actions happening now. In this unit, you will describe actions happening now. You will learn the correct verb forms for ongoing activities. This will help you describe what is happening at the moment.',
    pg049_n0003: 'Construct 15 sentences from the table below orally or using sign language.',
    pg049_n0003_easy_read: 'Construct 15 sentences from the table below orally or using sign language.',
    pg052_n0014: 'Use and to join sentences together.',
    pg052_n0014_easy_read: 'Use "and" to join the sentences.',
    pg052_n0022: 'Introduction',
    pg052_n0023: 'Conjunctions are words used to join words or sentences together. In this unit, you will learn how to connect ideas using the words and and but. You will use the conjunction and to connect simple sentences of the same status. You will also use the conjunction but to connect contrasting ideas. The competencies developed will enable you to use them in various communicative situations orally/sign and in writing.',
    pg052_n0022_easy_read: 'Introduction',
    pg052_n0023_easy_read: 'Conjunctions join words or sentences. In this unit, you will connect ideas using and and but. Use and to connect similar ideas. Use but to connect different ideas. This will help you communicate orally/sign and in writing.',
    pg055_n0028: 'Activity 3: Listening and oral practice/ observing and signing practice',
    pg059_n0038: 'Introduction',
    pg059_n0039: 'In English, words are pronounced as a combination of sounds. The combination of sounds pronounced as a single unit is called a syllable. In this unit, you will read words and identify their syllables. The competencies developed will enable you to hear, pronounce and place word stress and intonation appropriately.',
    pg059_n0038_easy_read: 'Introduction',
    pg059_n0039_easy_read: 'English words are made from sounds. A group of sounds said as 1 unit is called a syllable. In this unit, you will read words and find their syllables. You will also practise word stress and intonation.',
    pg062_n0047: 'Activity 3: Reading aloud/signing grade-level texts',
    pg063_n0034: 'Read aloud/sign the following story and answer the questions that follow orally or using sign language.',
    pg063_n0034_easy_read: 'Read aloud/sign the following story and answer the questions that follow orally or using sign language.',
    pg064_n0028: 'Oral/signing practice',
    pg066_n0011: 'Recognising the basic features of spoken English/sign language',
    pg066_n0012: 'Introduction',
    pg066_n0014: 'Spoken English/sign language has certain basic features that differentiate it from other forms of delivery. In this unit, you will practise speaking English/signing words and recognise the differences in pronunciation/signing between words. You will also recognise the differences in intonation/signing between sentences. The competencies developed will enable you to pronounce/sign words correctly and vary stress and intonation/speed between sentences.',
    pg067_n0002: '(a) Read the following words.',
    pg068_n0005: 'feel, fool, pull, pool, port, bore, most, part, dark, arm, bird, girl, hear, heal, speak',
    pg068_n0030: 'Words with long vowels',
    pg068_n0031: 'Words with short vowels',
    pg068_n0032: 'ship, lip, put, pot, mop, bed, cat, hat, bet, get, span, cut, swim, sell, milk',
    pg068_n0005_easy_read: 'feel, fool, pull, pool, port, bore, most, part, dark, arm, bird, girl, hear, heal, speak',
    pg068_n0030_easy_read: 'Words with long vowels',
    pg068_n0031_easy_read: 'Words with short vowels',
    pg068_n0032_easy_read: 'ship, lip, put, pot, mop, bed, cat, hat, bet, get, span, cut, swim, sell, milk',
    pg069_n0046: '(b) Recite/sign the following poem.',
    pg069_n0047: 'The sailor wants to sail.\nHe sees a whale on the shore,\nWith a big chain on its tail.\nThen a big wave and rain come.\nDense clouds put them in the shade.\nThe sailor is dismayed.\nThere is no sailing!',
    pg069_n0046_easy_read: '(b) Recite/sign the poem below.',
    pg069_n0047_easy_read: 'The sailor wants to sail.\nHe sees a whale on the shore.\nThe whale has a big chain on its tail.\nThen a big wave and rain come.\nDense clouds make shade.\nThe sailor feels upset.\nThe sailor cannot sail.'
  };
  const audioOverrides = {
    pg017_n0014: 'pg017_n0014.mp3',
    pg017_n0014_easy_read: 'pg017_n0014_easy_read.mp3',
    pg012_n0018: 'pg012_n0018.mp3',
    pg012_n0018_easy_read: 'pg012_n0018_easy_read.mp3',
    pg018_n0002: 'pg018_n0002.mp3',
    pg020_n0020_suffix: 'pg020_n0020_suffix.mp3',
    pg020_n0020_suffix_easy_read: 'pg020_n0020_suffix_easy_read.mp3',
    pg024_n0012_suffix: 'pg024_n0012_suffix.mp3',
    pg024_n0012_suffix_easy_read: 'pg024_n0012_suffix_easy_read.mp3',
    pg044_n0015: 'pg044_n0015.mp3',
    pg044_n0037: 'pg044_n0037.mp3',
    pg044_n0038: 'pg044_n0038.mp3',
    pg044_n0037_easy_read: 'pg044_n0037_easy_read.mp3',
    pg044_n0038_easy_read: 'pg044_n0038_easy_read.mp3',
    pg055_n0028: 'pg055_n0028.mp3',
    pg066_n0012: 'pg066_n0012.mp3',
    pg066_n0014: 'pg066_n0014.mp3',
    pg067_n0002: 'pg067_n0002.mp3',
    pg023_n0002: 'pg023_n0002.mp3',
    pg023_n0004: 'pg023_n0004.mp3',
    pg023_n0017: 'pg023_n0017.mp3',
    pg023_n0018: 'pg023_n0018.mp3',
    pg023_n0019: 'pg023_n0019.mp3',
    pg023_n0020: 'pg023_n0020.mp3',
    pg023_n0021: 'pg023_n0021.mp3',
    pg023_n0022: 'pg023_n0022.mp3',
    pg023_n0002_easy_read: 'pg023_n0002_easy_read.mp3',
    pg023_n0004_easy_read: 'pg023_n0004_easy_read.mp3',
    pg023_n0017_easy_read: 'pg023_n0017_easy_read.mp3',
    pg023_n0018_easy_read: 'pg023_n0018_easy_read.mp3',
    pg023_n0019_easy_read: 'pg023_n0019_easy_read.mp3',
    pg023_n0020_easy_read: 'pg023_n0020_easy_read.mp3',
    pg023_n0021_easy_read: 'pg023_n0021_easy_read.mp3',
    pg023_n0022_easy_read: 'pg023_n0022_easy_read.mp3',
    pg068_n0005: 'pg068_n0005.mp3',
    pg068_n0030: 'pg068_n0030.mp3',
    pg068_n0031: 'pg068_n0031.mp3',
    pg068_n0032: 'pg068_n0032.mp3',
    pg068_n0005_easy_read: 'pg068_n0005_easy_read.mp3',
    pg068_n0030_easy_read: 'pg068_n0030_easy_read.mp3',
    pg068_n0031_easy_read: 'pg068_n0031_easy_read.mp3',
    pg068_n0032_easy_read: 'pg068_n0032_easy_read.mp3',
    pg027_n0038: 'pg027_n0038.mp3',
    pg027_n0039: 'pg027_n0039.mp3',
    pg027_n0038_easy_read: 'pg027_n0038_easy_read.mp3',
    pg027_n0039_easy_read: 'pg027_n0039_easy_read.mp3',
    pg038_n0052: 'pg038_n0052.mp3',
    pg038_n0052_easy_read: 'pg038_n0052_easy_read.mp3',
    pg052_n0022: 'pg052_n0022.mp3',
    pg052_n0023: 'pg052_n0023.mp3',
    pg052_n0022_easy_read: 'pg052_n0022_easy_read.mp3',
    pg052_n0023_easy_read: 'pg052_n0023_easy_read.mp3',
    pg059_n0038: 'pg059_n0038.mp3',
    pg059_n0039: 'pg059_n0039.mp3',
    pg059_n0038_easy_read: 'pg059_n0038_easy_read.mp3',
    pg059_n0039_easy_read: 'pg059_n0039_easy_read.mp3',
    pg069_n0046: 'pg069_n0046.mp3',
    pg069_n0047: 'pg069_n0047.mp3',
    pg069_n0046_easy_read: 'pg069_n0046_easy_read.mp3',
    pg069_n0047_easy_read: 'pg069_n0047_easy_read.mp3'
  };
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input && input.url;
    const response = await originalFetch(input, init);
    const cleanUrl = (url || '').split('?')[0];
    if (!/\/content\/(pages|i18n\/en-GB\/(texts|audios))\.json$/.test(cleanUrl)) return response;
    const data = await response.clone().json();
    if (cleanUrl.endsWith('/content/pages.json')) {
      return new Response(JSON.stringify(data.filter((item) => !/^qz00[1-5]$/.test(item.section_id))), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }
    if (cleanUrl.endsWith('/texts.json')) Object.assign(data, textOverrides);
    if (cleanUrl.endsWith('/audios.json')) Object.assign(data, audioOverrides);
    return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
  };

  function labelInteractiveBlanks(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('input[data-activity-item], textarea[data-activity-item]').forEach((field) => {
      const current = field.getAttribute('aria-label') || '';
      if (current && !/^Blank \d+ of \d+$/i.test(current)) return;
      const sentence = field.closest('.fitb-sentence');
      if (!sentence) return;
      const readable = sentence.textContent.replace(/\s+/g, ' ').trim();
      const blankNumber = current.match(/^Blank (\d+)/i)?.[1]
        || field.dataset.activityItem?.replace(/\D+/g, '')
        || 'answer';
      if (readable) field.setAttribute('aria-label', `Complete blank ${blankNumber} in the sentence: ${readable}`);
    });
  }

  const blankLabelObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) labelInteractiveBlanks(node);
    }));
    labelInteractiveBlanks(document);
  });
  blankLabelObserver.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', () => labelInteractiveBlanks(document));

  // Text-to-speech and sign-language video are separate learning tools.  The
  // bundled runtime treats them as a single active-media channel, which makes
  // it pause one player whenever the other begins.  Keep the sign-language
  // video outside that shared channel while preserving its normal controls.
  const isSignLanguageVideo = (node) =>
    node instanceof HTMLVideoElement &&
    Boolean(node.closest('#interface-container'));

  // React delegates the sign-video `onPlay` callback from the interface
  // container. Stopping this event before it reaches that container prevents
  // the video from stopping TTS.
  document.addEventListener('play', (event) => {
    if (!isSignLanguageVideo(event.target)) return;
    event.stopImmediatePropagation();
  }, true);

  function protectSignLanguageVideo(video) {
    if (video.dataset.independentMedia === 'true') return;
    video.dataset.independentMedia = 'true';

    const nativePause = video.pause.bind(video);
    let userRequestedPause = false;
    const allowUserPause = () => {
      userRequestedPause = true;
      window.setTimeout(() => { userRequestedPause = false; }, 250);
    };

    // Native controls normally pause the video without calling this override.
    // These guards also support browsers that call the element method for a
    // click or keyboard pause.
    video.addEventListener('pointerdown', allowUserPause, true);
    video.addEventListener('keydown', (event) => {
      if (event.code === 'Space' || event.code === 'Enter') allowUserPause();
    }, true);

    Object.defineProperty(video, 'pause', {
      configurable: true,
      value() {
        if (userRequestedPause) {
          userRequestedPause = false;
          return nativePause();
        }
        // Ignore only the runtime's automatic pause caused by TTS playback.
        return undefined;
      },
    });
  }

  const mediaIndependenceObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      if (isSignLanguageVideo(node)) protectSignLanguageVideo(node);
      node.querySelectorAll?.('#interface-container video').forEach(protectSignLanguageVideo);
    }));
  });
  mediaIndependenceObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  document.querySelectorAll('#interface-container video').forEach(protectSignLanguageVideo);

  // Text in PDF-source screenshots is represented by a semantic transcript
  // in the figure caption. The ADT runtime highlights that transcript with
  // `bg-yellow-300` word spans, but the caption is intentionally screen-reader
  // only. Mirror the same active word onto the matching raster-text marker so
  // the standard yellow highlight is visible without adding duplicate
  // `data-id` elements (which would make TTS read the text twice).
  const sourceMarkMeasureCanvas = document.createElement('canvas');
  const sourceMarkMeasureContext = sourceMarkMeasureCanvas.getContext('2d');
  if (sourceMarkMeasureContext) {
    sourceMarkMeasureContext.font = '32px "Comic Sans MS", "Chalkboard SE", "Atkinson Hyperlegible", sans-serif';
  }

  const measureSourceWord = (word) => {
    if (sourceMarkMeasureContext) {
      return Math.max(1, sourceMarkMeasureContext.measureText(word).width);
    }
    return Math.max(1, Array.from(word).length);
  };

  function clearSourceMark(mark) {
    mark.classList.remove('is-tts-active');
    mark.style.removeProperty('--tts-mark-left');
    mark.style.removeProperty('--tts-mark-width');
  }

  function activateSourceLine(mark) {
    mark.style.removeProperty('--tts-mark-left');
    mark.style.removeProperty('--tts-mark-width');
    mark.classList.add('is-tts-active');
  }

  function activateSourceWord(mark, activeIndex, transcript) {
    const from = Number.parseInt(mark.dataset.wordFrom || '', 10);
    const to = Number.parseInt(mark.dataset.wordTo || '', 10);
    if (!Number.isFinite(from) || !Number.isFinite(to) || activeIndex < from || activeIndex > to) return false;

    const wordElements = Array.from(transcript.querySelectorAll('[data-word-index]'))
      .map((element) => ({
        element,
        index: Number.parseInt(element.getAttribute('data-word-index') || '', 10),
      }))
      .filter(({ index }) => Number.isFinite(index) && index >= from && index <= to)
      .sort((left, right) => left.index - right.index);
    const activePosition = wordElements.findIndex(({ index }) => index === activeIndex);
    if (activePosition < 0) return false;

    const weights = wordElements.map(({ element }) => measureSourceWord(element.textContent || ''));
    const gap = measureSourceWord(' ');
    const total = weights.reduce((sum, weight) => sum + weight, 0)
      + gap * Math.max(0, weights.length - 1);
    const before = weights.slice(0, activePosition).reduce((sum, weight) => sum + weight, 0)
      + gap * activePosition;
    const baseLeft = Number.parseFloat(mark.style.getPropertyValue('--mark-left'));
    const baseWidth = Number.parseFloat(mark.style.getPropertyValue('--mark-width'));
    if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(baseLeft) || !Number.isFinite(baseWidth)) {
      activateSourceLine(mark);
      return true;
    }

    const padding = Math.min(0.28, baseWidth * 0.02);
    const activeLeft = baseLeft + baseWidth * (before / total) - padding;
    const activeWidth = baseWidth * (weights[activePosition] / total) + padding * 2;
    mark.style.setProperty('--tts-mark-left', `${Math.max(baseLeft, activeLeft)}%`);
    mark.style.setProperty('--tts-mark-width', `${Math.min(
      baseLeft + baseWidth - Math.max(baseLeft, activeLeft),
      activeWidth,
    )}%`);
    mark.classList.add('is-tts-active');
    return true;
  }

  function syncSourceFigureTts(figure) {
    const stage = figure.querySelector('.adt-source-stage');
    const caption = figure.querySelector('figcaption');
    if (!stage || !caption) return;
    const marks = Array.from(stage.querySelectorAll('.adt-reader-mark[data-tts-id]'));
    marks.forEach(clearSourceMark);

    const activeWord = caption.querySelector('[data-id] [data-word-index].bg-yellow-300');
    if (activeWord) {
      const transcript = activeWord.closest('[data-id]');
      const id = transcript?.getAttribute('data-id');
      const activeIndex = Number.parseInt(activeWord.getAttribute('data-word-index') || '', 10);
      if (id && Number.isFinite(activeIndex)) {
        const matching = marks.filter((mark) => mark.dataset.ttsId === id);
        const activated = matching.some((mark) => activateSourceWord(mark, activeIndex, transcript));
        // Easy Read can change word counts. Keep the current sentence visible
        // as a fallback when its spoken wording no longer maps to print.
        if (!activated) matching.forEach(activateSourceLine);
      }
      return;
    }

    const activeBlock = caption.querySelector('[data-id].tts-active-block');
    if (activeBlock) {
      const id = activeBlock.getAttribute('data-id');
      marks.filter((mark) => mark.dataset.ttsId === id).forEach(activateSourceLine);
    }
  }

  function initialiseSourceFigureTts() {
    document.querySelectorAll('figure.adt-source-highlight').forEach((figure) => {
      const caption = figure.querySelector('figcaption');
      if (!caption || figure.dataset.ttsHighlightReady === 'true') return;
      figure.dataset.ttsHighlightReady = 'true';
      const observer = new MutationObserver(() => syncSourceFigureTts(figure));
      observer.observe(caption, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true,
      });
      syncSourceFigureTts(figure);
    });
  }

  initialiseSourceFigureTts();
  document.addEventListener('DOMContentLoaded', initialiseSourceFigureTts, { once: true });
}());
