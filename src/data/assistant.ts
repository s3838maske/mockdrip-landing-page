// Offline glossary for the select-a-word popup and the chat's local answers.

export interface Gloss { ipa: string; pos: string; meaning: string; hi: string; ex: string }

export const GLOSSARY: Record<string, Gloss> = {
  'freeze': { ipa: '/friːz/', pos: 'verb', meaning: 'To suddenly stop and be unable to speak or act, usually because of nerves.', hi: 'Achanak atak jaana — dimaag blank ho jaana.', ex: 'I froze for a second, then explained my project step by step.' },
  'interview': { ipa: '/ˈɪntəvjuː/', pos: 'noun', meaning: 'A formal conversation where an employer asks you questions to decide whether to hire you.', hi: 'Naukri ke liye sawaal-jawaab wali baatcheet.', ex: 'Thank you for the interview — I enjoyed discussing the role.' },
  'fail': { ipa: '/feɪl/', pos: 'verb', meaning: 'To not succeed in doing or achieving something.', hi: 'Kaamyaab na hona.', ex: 'Our first prototype failed, so we redesigned the sensor.' },
  'answer': { ipa: '/ˈɑːnsə/', pos: 'noun', meaning: 'What you say in reply to a question.', hi: 'Jawaab.', ex: 'My answer has three parts: the situation, my action and the result.' },
  'pressure': { ipa: '/ˈpreʃə/', pos: 'noun', meaning: 'The stress you feel when something important depends on you.', hi: 'Dabaav, tension.', ex: 'I work well under pressure — our fest budget is a good example.' },
  'panel': { ipa: '/ˈpænl/', pos: 'noun', meaning: 'A small group of people who interview you together.', hi: 'Interview lene wale logon ka group.', ex: 'The panel asked me two follow-up questions about my internship.' },
  'deduction': { ipa: '/dɪˈdʌkʃn/', pos: 'noun', meaning: 'Points taken away from your score for a specific mistake.', hi: 'Galti ki wajah se kate hue marks.', ex: 'The deduction was for giving no example.' },
  'fluency': { ipa: '/ˈfluːənsi/', pos: 'noun', meaning: 'The ability to speak smoothly, without many pauses or mistakes.', hi: 'Bina ruke, aaram se bolne ki kshamta.', ex: 'My fluency improved a lot after ten mock interviews.' },
  'readiness': { ipa: '/ˈredinəs/', pos: 'noun', meaning: 'How prepared you are for something.', hi: 'Kitni taiyaari hai.', ex: 'My readiness score went from 52 to 74 in three weeks.' },
  'confidence': { ipa: '/ˈkɒnfɪdəns/', pos: 'noun', meaning: 'Belief in yourself and your abilities.', hi: 'Khud par bharosa.', ex: 'I answered with confidence because I had practised.' },
  'pace': { ipa: '/peɪs/', pos: 'noun', meaning: 'The speed at which you speak.', hi: 'Bolne ki speed.', ex: 'I slowed my pace so the panel could follow my explanation.' },
  'rubric': { ipa: '/ˈruːbrɪk/', pos: 'noun', meaning: 'A fixed set of rules used to score answers fairly.', hi: 'Marks dene ke tay niyam.', ex: 'Every answer is scored against the same rubric.' },
  'strict': { ipa: '/strɪkt/', pos: 'adjective', meaning: 'Firm and demanding; allowing little flexibility.', hi: 'Sakht.', ex: 'The strict interviewer cut in when I started rambling.' },
  'follow-up': { ipa: '/ˈfɒləʊ ʌp/', pos: 'noun', meaning: 'A question asked after your answer to get more detail.', hi: 'Jawaab ke baad poocha gaya agla sawaal.', ex: 'Good follow-up — let me give you a specific example.' },
  'placement': { ipa: '/ˈpleɪsmənt/', pos: 'noun', meaning: 'Getting a job through your college’s recruitment process.', hi: 'College ke through naukri milna.', ex: 'Our placement season starts next month.' },
  'drive': { ipa: '/draɪv/', pos: 'noun', meaning: 'In placements: a day when companies visit a college to hire students.', hi: 'Campus mein companies ka hiring din.', ex: 'Twelve companies came to our campus drive.' },
  'rehearse': { ipa: '/rɪˈhɜːs/', pos: 'verb', meaning: 'To practise something before doing it for real.', hi: 'Pehle se abhyaas karna.', ex: 'I rehearsed my introduction until it felt natural.' },
  'consent': { ipa: '/kənˈsent/', pos: 'noun', meaning: 'Permission you give for something to happen.', hi: 'Ijaazat, sehmati.', ex: 'Nothing is recorded without your consent.' },
  'guarantee': { ipa: '/ˌɡærənˈtiː/', pos: 'noun', meaning: 'A firm promise that something will happen, or you get something back.', hi: 'Pakka vaada.', ex: 'The Sprint comes with a +15 guarantee.' },
  'transcript': { ipa: '/ˈtrænskrɪpt/', pos: 'noun', meaning: 'A written record of everything that was said.', hi: 'Boli gayi baaton ka likha hua record.', ex: 'I read my transcript and spotted my filler words.' },
  'clarity': { ipa: '/ˈklærəti/', pos: 'noun', meaning: 'The quality of being clear and easy to understand.', hi: 'Saaf-saaf samajh aana.', ex: 'I improved clarity by answering in three short parts.' },
  'hardworking': { ipa: '/ˌhɑːdˈwɜːkɪŋ/', pos: 'adjective', meaning: 'Putting a lot of effort into your work.', hi: 'Mehnati.', ex: 'Instead of just saying “hardworking”, I described the 40 hours I spent on our project.' },
  'stall': { ipa: '/stɔːl/', pos: 'verb', meaning: 'To stop making progress, or to hesitate.', hi: 'Atak jaana, ruk jaana.', ex: 'I stalled on the first question, then recovered.' },
  'mock': { ipa: '/mɒk/', pos: 'adjective', meaning: 'A practice version of something, not the real one.', hi: 'Practice wala, asli nahi.', ex: 'My third mock interview felt much easier than the first.' },
  'recreate': { ipa: '/ˌriːkriˈeɪt/', pos: 'verb', meaning: 'To make something again so it feels like the original.', hi: 'Dobara waisa hi banana.', ex: 'The app recreates the feeling of a real interview panel.' },
  'honest': { ipa: '/ˈɒnɪst/', pos: 'adjective', meaning: 'Truthful and not hiding anything.', hi: 'Sachcha, imaandaar.', ex: 'I gave an honest answer about my weakness.' },
  'weakness': { ipa: '/ˈwiːknəs/', pos: 'noun', meaning: 'Something you are not good at yet.', hi: 'Kamzori.', ex: 'My weakness is public speaking, so I joined the debate club.' },
  'strength': { ipa: '/streŋθ/', pos: 'noun', meaning: 'Something you are especially good at.', hi: 'Khoobi, taakat.', ex: 'My strength is breaking big problems into small steps.' },
  'lecture': { ipa: '/ˈlektʃə/', pos: 'noun', meaning: 'A talk given to students in class.', hi: 'Class ki padhaai.', ex: 'I practise one mock between lectures every day.' },
  'retry': { ipa: '/ˌriːˈtraɪ/', pos: 'verb', meaning: 'To try again.', hi: 'Dobara koshish karna.', ex: 'I retried my weakest answer and scored six points higher.' },
  'role': { ipa: '/rəʊl/', pos: 'noun', meaning: 'The job or position you are applying for.', hi: 'Pad, kaam ki zimmedaari.', ex: 'I’m excited about this role because it uses my data skills.' },
  'recruiter': { ipa: '/rɪˈkruːtə/', pos: 'noun', meaning: 'A person who finds and hires people for a company.', hi: 'Hiring karne wala vyakti.', ex: 'The recruiter asked about my final-year project.' },
  'basically': { ipa: '/ˈbeɪsɪkli/', pos: 'adverb · filler', meaning: 'Means “in simple terms”, but used too often it makes you sound unsure.', hi: '“Asal mein” — baar-baar bolna avoid karein.', ex: 'Skip “basically” and state the point directly.' },
  'actually': { ipa: '/ˈæktʃuəli/', pos: 'adverb · filler', meaning: 'Means “in fact”; overusing it sounds hesitant.', hi: '“Sach mein” — kam use karein.', ex: 'Say “I led the team”, not “actually I was leading the team”.' },
  'umm': { ipa: '/ʌm/', pos: 'filler sound', meaning: 'A sound people make while thinking. A few are fine; many sound nervous.', hi: 'Sochte waqt ki awaaz — kam karein.', ex: 'Pause silently instead of saying “umm”.' },
  'silence': { ipa: '/ˈsaɪləns/', pos: 'noun', meaning: 'A period with no speaking. Short pauses are fine; long ones look like a freeze.', hi: 'Chuppi.', ex: 'I took a two-second pause to think, then answered.' },
  'hinglish': { ipa: '/ˈhɪŋɡlɪʃ/', pos: 'noun', meaning: 'A mix of Hindi and English, usually written in English letters.', hi: 'Hindi + English ka mel.', ex: 'MockDrip lets you start in Hinglish and move to English.' }
};

// Inflected forms that map onto a glossary entry.
export const ALIASES: Record<string, string> = { froze: 'freeze', frozen: 'freeze', freezing: 'freeze', freezes: 'freeze', failed: 'fail', fails: 'fail', failing: 'fail', answers: 'answer', interviews: 'interview', interviewer: 'interview', stalled: 'stall', stalls: 'stall', rehearsed: 'rehearse', lectures: 'lecture', deductions: 'deduction', recreates: 'recreate', 'hard-working': 'hardworking', um: 'umm', ummm: 'umm', 'follow-ups': 'follow-up', followup: 'follow-up', panels: 'panel', drives: 'drive', placements: 'placement', strengths: 'strength', weaknesses: 'weakness', retries: 'retry', roles: 'role', recruiters: 'recruiter', mocks: 'mock' };

export function lookup(raw: string): Gloss | null {
  let k = String(raw).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z' \-]/g, '').trim();
  if (ALIASES[k]) k = ALIASES[k];
  if (GLOSSARY[k]) return GLOSSARY[k];
  const stems = [k.replace(/ing$/, ''), k.replace(/ed$/, ''), k.replace(/es$/, ''), k.replace(/s$/, ''), k.replace(/ing$/, 'e'), k.replace(/d$/, '')];
  for (const s of stems) if (GLOSSARY[s]) return GLOSSARY[s];
  return null;
}

// Rule-based replies so the coach works with no backend. Swap askCoach() in
// AiAssistant.tsx for a call to your own LLM endpoint when one exists.
export function localAnswer(q: string): string {
  const t = String(q).toLowerCase();
  const m = t.match(/(?:mean(?:ing)?(?: of)?|define|what is|what's)\s+[“"']?([a-z\-']+)/);
  if (m) {
    const g = lookup(m[1]);
    if (g) return `“${m[1]}” ${g.ipa} — ${g.meaning}\nHinglish: ${g.hi}\nExample: ${g.ex}`;
  }
  if (/^\s*[a-z\-']+\s*\??$/.test(t)) {
    const g = lookup(t.replace(/\?/g, ''));
    if (g) return `${g.meaning}\nHinglish: ${g.hi}\nExample: ${g.ex}`;
  }
  if (/free|cost|price|₹|pay|sprint|guarantee|refund|upi/.test(t)) return 'Your first full mock is free — no signup, no card. The Placement Sprint is ₹249 for 30 days: 10 full mocks, unlimited retries, a progress graph and a countdown plan. Finish all 10 and if your readiness hasn’t risen 15 points, you get your money back.';
  if (/hinglish|hindi|language|english|l1|l2|l3|bridge/.test(t)) return 'Yes. At L1 the whole mock is in Hinglish. At L2 questions come in English and you can answer in Hinglish, English or a mix. L3 is English-only, like the real panel.';
  if (/scor|report|mark|deduct|readiness|rubric/.test(t)) return 'Five sub-scores out of 20 — content, clarity, confidence and pace, language and fluency, role fit — add up to a readiness score out of 100. Every deduction quotes your exact words, and the report lands within 2 minutes.';
  if (/record|privacy|data|delete|dpdp|safe/.test(t)) return 'Nothing is recorded until you agree. Raw audio is deleted 30 days after your mock, your college only sees results if you choose to share, and you can delete your account any time.';
  if (/phone|device|mic|earphone|laptop|browser/.test(t)) return 'Any recent phone with Chrome or Safari and a working mic. Earphones help — a quick mic check runs before every call.';
  if (/freez|nervous|blank|tell me about yourself|introduc|anxi|scared/.test(t)) return 'Try a three-line opener: who you are, one project you’re proud of, and why this role. Take a breath before you start — a short pause is fine; long silences are what cost pace points.';
  if (/college|tpo|placement cell|batch|officer/.test(t)) return 'Placement cells can run a mock day with one QR code and see batch readiness by branch — only for students who agree to share.';
  if (/how|work|start|begin|step/.test(t)) return 'Tap start, pick your level and strictness, talk for 10 minutes, and get a scored report within 2 minutes. Then retry your weakest answer.';
  if (/^(hi|hello|hey|namaste|hii+)\b/.test(t)) return 'Hi! Ask me anything about interview prep — or select any word on the page and I’ll explain it.';
  return 'I’m best at interview prep and MockDrip questions. Try asking how scoring works, whether you can answer in Hinglish, or select any word on the page.';
}

// Contextual tips the docked orb shows once per section.
export const SECTION_TIPS: Record<string, string> = {
  product: 'Tip: select the word “freeze” — I’ll explain it.',
  features: 'Four systems run in every mock — hover a card to see it live.',
  journey: 'This is what a 30-day Sprint looks like, mock by mock.',
  preview: 'Click the tabs to see what a real report looks like.',
  how: 'The whole loop takes about 12 minutes.',
  levels: 'If English answers feel hard, start at L1 — tap a level.',
  colleges: 'Placement officers can run a mock day with one QR code.',
  pricing: 'Your first full mock is free — no card needed.',
  faq: 'Can’t find your answer? Ask me directly.',
};

export const SUGGESTIONS = ['How does scoring work?', 'Is the first mock free?', 'Can I answer in Hinglish?', 'How do I stop freezing?'];
export const GREETING = 'Hi, I’m MockDrip AI. Ask me anything about interview prep — or select any word on this page and I’ll explain what it means.';
