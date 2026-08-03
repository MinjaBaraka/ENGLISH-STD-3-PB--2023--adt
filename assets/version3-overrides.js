/* Version 3 validation-report overrides for the bundled offline reader. */
(function () {
  const originalFetch = window.fetch.bind(window);
  const textOverrides = {
    pg003_n0005: 'Acknowledgements',
    pg003_n0007: 'Introduction',
    pg003_n0011: 'Listening and speaking/observing and signing',
    pg003_n0013: 'Activity 1: Listening and writing',
    pg003_n0015: 'Activity 2: Naming various things orally',
    pg003_n0017: 'Activity 3: Describing actions orally',
    pg003_n0019: 'Activity 4: Describing uses of common objects',
    pg003_n0021: 'Activity 5: Describing locations of objects',
    pg003_n0023: 'Activity 6: Listening to oral texts',
    pg003_n0025: 'Activity 7: Reading aloud and answering oral questions',
    pg003_n0027: 'Activity 8: Oral practice',
    pg003_n0031: 'Using personal pronouns',
    pg003_n0033: 'Activity 1: Recognising pronouns',
    pg003_n0035: 'Activity 2: Practising using pronouns orally',
    pg003_n0037: 'Activity 3: Reading practice',
    pg003_n0039: 'Activity 4: Writing practice',
    pg003_n0043: 'Expressing possession',
    pg003_n0045: 'Activity 1: Listening and oral practice',
    pg003_n0047: 'Activity 2: Reading practice',
    pg003_n0049: 'Activity 3: Writing practice',
    pg003_n0053: 'Describing routines',
    pg003_n0055: 'Activity 1: Listening and oral practice',
    pg003_n0005_easy_read: 'Acknowledgements',
    pg003_n0007_easy_read: 'Introduction',
    pg003_n0011_easy_read: 'Listening and speaking/observing and signing',
    pg003_n0013_easy_read: 'Activity 1: Listening and writing',
    pg003_n0015_easy_read: 'Activity 2: Saying the names of different things aloud',
    pg003_n0017_easy_read: 'Activity 3: Describing actions aloud',
    pg003_n0019_easy_read: 'Activity 4: Describing how common objects are used',
    pg003_n0021_easy_read: 'Activity 5: Describing where objects are',
    pg003_n0023_easy_read: 'Activity 6: Listening to spoken texts',
    pg003_n0025_easy_read: 'Activity 7: Reading aloud and answering spoken questions',
    pg003_n0027_easy_read: 'Activity 8: Speaking practice',
    pg003_n0031_easy_read: 'Using personal pronouns',
    pg003_n0033_easy_read: 'Activity 1: Finding pronouns',
    pg003_n0035_easy_read: 'Activity 2: Practising pronouns aloud',
    pg003_n0037_easy_read: 'Activity 3: Reading practice',
    pg003_n0039_easy_read: 'Activity 4: Writing practice',
    pg003_n0043_easy_read: 'Showing possession',
    pg003_n0045_easy_read: 'Activity 1: Listening and speaking practice',
    pg003_n0047_easy_read: 'Activity 2: Reading practice',
    pg003_n0049_easy_read: 'Activity 3: Writing practice',
    pg003_n0053_easy_read: 'Describing routines',
    pg003_n0055_easy_read: 'Activity 1: Listening and speaking practice',
    pg004_n0003_easy_read: 'Reading practice',
    pg004_n0005_easy_read: 'Writing practice',
    pg004_n0009_easy_read: 'Describing activities that are happening now',
    pg004_n0011_easy_read: 'Listening and speaking practice',
    pg004_n0013_easy_read: 'Writing practice',
    pg004_n0017_easy_read: "Connecting ideas with 'and' and 'but'",
    pg004_n0019_easy_read: 'Listening and speaking practice',
    pg004_n0021_easy_read: 'Writing practice',
    pg004_n0023_easy_read: 'Listening and speaking practice',
    pg004_n0025_easy_read: 'Writing practice',
    pg004_n0029_easy_read: 'Reading different kinds of texts',
    pg004_n0031_easy_read: 'Reading 2-syllable words',
    pg004_n0033_easy_read: 'Reading words with more than 1 syllable',
    pg004_n0035_easy_read: 'Reading aloud texts for your school level',
    pg004_n0037_easy_read: 'Speaking practice',
    pg004_n0041_easy_read: 'Recognising the basic features of spoken English',
    pg004_n0043_easy_read: 'Reading words with short vowels',
    pg004_n0045_easy_read: 'Reading words with long vowels',
    pg004_n0049_easy_read: 'long vowels',
    pg004_n0053_easy_read: 'short and long vowels',
    pg004_n0055_easy_read: 'Speaking practice',
    pg006_n0007: 'The book is aimed at enabling the pupil to develop competencies in listening/observing, speaking/signing, reading and writing in English.',
    pg007_n0014: 'Listening/observing and writing',
    pg007_n0019: 'Naming various things orally/using sign language',
    pg009_n0024: 'Describing actions orally/using sign language',
    pg009_n0025: 'Say/sign what the following people are doing.',
    pg010_n0032: 'Say/sign what the following things are used for.',
    pg012_n0009: 'Listening to oral texts/observing signed video',
    pg013_n0005: 'Then, answer the questions that follow orally/in sign language.',
    pg015_n0003: 'Oral/signing practice',
    pg020_n0009: 'Read the following dialogue and fill in the blanks with the correct pronouns. Use the following pronouns: I, we, you, he, she, it, they.',
    pg020_n0020: 'I’m Luta. [[blank:item-1]] want to buy cows. Do you have any?',
    pg026_n0013: 'Activity 1: Listening and oral practice/observing and signing practice',
    pg035_n0019: 'Answer the following questions orally/using sign language.',
    pg044_n0015: 'Listening and Oral practice/Observing and signing practice',
    pg055_n0028: 'Activity 3: Listening and oral practice/observing and signing practice',
    pg062_n0047: 'Activity 3: Reading aloud/signing grade-level texts',
    pg064_n0028: 'Oral/signing practice',
    pg066_n0011: 'Recognising the basic features of spoken English/sign language',
    pg066_n0012: 'Introduction',
    pg066_n0014: 'Spoken English/sign language has certain basic features that differentiate it from other forms of delivery. In this unit, you will practise speaking English/signing words and recognise the differences in pronunciation/signing between words. You will also recognise the differences in intonation/signing between sentences. The competencies developed will enable you to pronounce/sign words correctly and vary stress and intonation/speed between sentences.',
    pg067_n0002: '(a) Read the following words.'
  };
  const audioOverrides = {
    pg044_n0015: 'pg044_n0015.mp3',
    pg055_n0028: 'pg055_n0028.mp3',
    pg066_n0012: 'pg066_n0012.mp3',
    pg066_n0014: 'pg066_n0014.mp3',
    pg067_n0002: 'pg067_n0002.mp3'
  };
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input && input.url;
    const response = await originalFetch(input, init);
    const cleanUrl = (url || '').split('?')[0];
    if (!/\/content\/(pages|i18n\/en-GB\/(texts|audios))\.json$/.test(cleanUrl)) return response;
    const data = await response.clone().json();
    if (cleanUrl.endsWith('/content/pages.json')) {
      return new Response(JSON.stringify(data.filter((item) => !/^qz00[1-4]$/.test(item.section_id))), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }
    if (cleanUrl.endsWith('/texts.json')) Object.assign(data, textOverrides);
    if (cleanUrl.endsWith('/audios.json')) Object.assign(data, audioOverrides);
    return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
  };
}());
