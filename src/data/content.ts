// Copy and structured data for the landing page. Rendered at build time by the
// .astro sections; the interactive scripts read the same objects so the two never drift.

export type Lang = 'EN' | 'Hinglish';
export interface Question { t: string; l: Lang }

const questionsA: Question[] = [
  { t: 'Tell me about yourself.', l: 'EN' },
  { t: 'Apne baare mein thoda batao.', l: 'Hinglish' },
  { t: 'Why should we hire you over others in your batch?', l: 'EN' },
  { t: 'Describe a time you handled pressure.', l: 'EN' },
  { t: 'Aapki sabse badi strength kya hai?', l: 'Hinglish' },
  { t: 'Where do you see yourself in five years?', l: 'EN' },
];

const questionsB: Question[] = [
  { t: 'Walk me through your final-year project.', l: 'EN' },
  { t: 'Why this company, and not another?', l: 'EN' },
  { t: 'Hum aapko hi kyun select karein?', l: 'Hinglish' },
  { t: 'Tell me about a conflict in your team.', l: 'EN' },
  { t: 'What is one weakness you are working on?', l: 'EN' },
  { t: 'Are you comfortable relocating for this role?', l: 'EN' },
];

// Marquee tracks are doubled so the CSS loop (translateX(-50%)) is seamless.
const loop = <T,>(list: T[]) => list.concat(list);
export const marqueeA = loop(questionsA);
export const marqueeB = loop(questionsB);

export const previewTabs = [
  { id: 'call', label: 'Live call', title: 'Live call · 06:48' },
  { id: 'report', label: 'Report', title: 'Your report · ready in 1m 42s' },
  { id: 'retry', label: 'Retry drill', title: 'Retry drill' },
  { id: 'progress', label: 'Progress', title: 'Progress & countdown plan' },
] as const;
export const defaultPreviewTab = 'call';

export interface Level {
  key: 'L1' | 'L2' | 'L3';
  name: string; sub: string; title: string; desc: string;
  iLine: string; sLine: string; noteTitle: string; note: string;
}

export const levels: Level[] = [
  {
    key: 'L1', name: 'Mock in Hinglish', sub: 'Get the substance right first', title: 'Mock in Hinglish',
    desc: 'The whole interview runs in Hinglish, so you practise thinking on your feet without fighting the language.',
    iLine: 'Apne final-year project ke baare mein batao. Usme aapka role kya tha?',
    sLine: 'Humari team ne ek drip irrigation system banaya jo paani bachata hai. Maine sensors ka kaam sambhala.',
    noteTitle: 'Report focuses on', note: 'Answer content and clarity — the parts that carry straight over into English.',
  },
  {
    key: 'L2', name: 'English questions, any-language answers', sub: 'Build the bridge', title: 'The bridge round',
    desc: 'Questions arrive in English. Answer in Hinglish, English or a mix — the report marks every switch so you see where your English runs out.',
    iLine: 'Tell me about your final-year project. What was your role?',
    sLine: 'We built a drip irrigation system that saves water. I handled the sensors — phir data humne mobile app pe bheja.',
    noteTitle: 'Language switch marked', note: '“phir data humne mobile app pe bheja” → try “Then we sent the data to a mobile app.” Language-gap score: 6 points.',
  },
  {
    key: 'L3', name: 'English-only strict round', sub: 'The real thing', title: 'English-only, strict',
    desc: 'English only, follow-ups on vague answers — and at Normal or Strict, the interviewer asks you to repeat any Hinglish answer in English.',
    iLine: 'You switched to Hindi there. Say that last part again in English, please.',
    sLine: 'Sure. Then we sent the sensor data to a mobile app, so farmers could check soil moisture in real time.',
    noteTitle: 'Language-gap score', note: 'Your English answers compared with your latest L1 mock — watch the gap close week by week.',
  },
];
export const defaultLevel = 'L2';

export interface Testimonial { q: string; n: string; r: string; i: string; av: string }

const testimonials: Testimonial[] = [
  { q: 'I used to freeze after “Tell me about yourself”. The follow-up questions felt exactly like the real panel.', n: '[Student name]', r: 'B.E. Mechanical · [Pilot college]', i: 'AK', av: 'av1' },
  { q: 'Seeing my own words next to every deduction stung a little. It also showed me exactly what to change.', n: '[Student name]', r: 'B.Tech Computer · [Pilot college]', i: 'PS', av: 'av2' },
  { q: 'Starting at L1 in Hinglish and moving to L3 took me two weeks. I finally answered in English without translating in my head.', n: '[Student name]', r: 'B.Sc IT · [Pilot college]', i: 'RD', av: 'av3' },
  { q: 'We ran a mock day with one QR code. By evening we knew which branch needed help with confidence and pace.', n: '[TPO name]', r: 'Training & Placement Officer', i: 'TP', av: 'av5' },
  { q: 'The retry button is the best part. I fixed one answer, scored six points higher, and kept that version for the real drive.', n: '[Student name]', r: 'B.E. E&TC · [Pilot college]', i: 'SM', av: 'av4' },
  { q: 'Strict mode cut me off when I rambled. Annoying in the moment, very useful in the actual interview.', n: '[Student name]', r: 'B.E. Civil · [Pilot college]', i: 'NJ', av: 'av1' },
  { q: 'Ten minutes is short enough that I actually practised every day between lectures, on campus Wi-Fi.', n: '[Student name]', r: 'BCA · [Pilot college]', i: 'OK', av: 'av3' },
  { q: 'The language-gap score showed my English answers were six points behind my Hinglish ones. That gap is closing now.', n: '[Student name]', r: 'B.Com · [Pilot college]', i: 'VP', av: 'av2' },
  { q: 'Students share their score cards in the class group, and more of the batch showed up to the next mock day.', n: '[TPO name]', r: 'Placement cell · [Pilot college]', i: 'TP', av: 'av5' },
];

const rotate = (k: number) => loop(testimonials.slice(k).concat(testimonials.slice(0, k)));
// Four scrolling columns, each starting at a different testimonial.
export const testimonialColumns = [rotate(0), rotate(3), rotate(6), rotate(1)];

export const faqs = [
  { q: 'Is the first mock really free?', a: 'Yes. Tap Start and you are in a full 10-minute mock — no signup, no card. You verify your phone number afterwards only if you want to keep the report.' },
  { q: 'Can I answer in Hinglish?', a: 'Yes. At L1 the whole mock is in Hinglish. At L2 the questions are in English and you can answer in Hinglish, English or a mix. L3 is English-only, like the real panel.' },
  { q: 'How is my score calculated?', a: 'Five sub-scores out of 20 — answer content, clarity, confidence and pace, language and fluency, and role fit — add up to a readiness score out of 100. Every deduction quotes the exact words you said.' },
  { q: 'What happens to my recordings?', a: 'Nothing is recorded until you agree. Raw audio is deleted 30 days after your mock, your college only sees results if you choose to share them, and you can delete your account from settings at any time.' },
  { q: 'What do I need to start?', a: 'A phone with Chrome or Safari and a working microphone. Earphones help — the mic check before every call tells you if anything needs fixing.' },
  { q: 'How does the Sprint guarantee work?', a: 'Complete all 10 Sprint mocks within 30 days. If your 10th mock’s readiness is not at least 15 points above your score before you bought the Sprint, we refund you to your original payment method.' },
];
