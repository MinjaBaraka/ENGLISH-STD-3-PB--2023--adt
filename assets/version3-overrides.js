/* Version 3 validation-report overrides for the bundled offline reader. */
(function () {
  const originalFetch = window.fetch.bind(window);
  const textOverrides = {
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
