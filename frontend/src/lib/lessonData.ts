import { PhonicsLesson, SightWordLesson, SentenceLesson, RealWorldLesson, Lesson } from "./types";

export const phonicsLessons: PhonicsLesson[] = [
  {
    id: "phonics-1",
    category: "phonics",
    title: "The Short A Sound",
    letter: "A",
    sound: "/æ/ as in 'cat'",
    exampleWords: [
      { word: "map", phonetic: "m-a-p" },
      { word: "can", phonetic: "k-a-n" },
      { word: "hand", phonetic: "h-a-n-d" },
      { word: "plan", phonetic: "p-l-a-n" },
    ],
    exercise: {
      prompt: "Which word starts with the short A sound?",
      targetSound: "a",
      options: ["apple", "open", "under", "eagle"],
      correctIndex: 0,
      explanation:
        "Apple starts with the short A sound (like the A in cat). Open uses a long O sound, under starts with a short U, and eagle starts with a long E sound.",
    },
  },
  {
    id: "phonics-2",
    category: "phonics",
    title: "The Short E Sound",
    letter: "E",
    sound: "/ɛ/ as in 'bed'",
    exampleWords: [
      { word: "rest", phonetic: "r-e-s-t" },
      { word: "help", phonetic: "h-e-l-p" },
      { word: "next", phonetic: "n-e-x-t" },
      { word: "desk", phonetic: "d-e-s-k" },
    ],
    exercise: {
      prompt: "Which word has the short E sound?",
      targetSound: "e",
      options: ["meet", "best", "tree", "key"],
      correctIndex: 1,
      explanation:
        "Best has the short E sound (like in bed). Meet, tree, and key use long E sounds.",
    },
  },
  {
    id: "phonics-3",
    category: "phonics",
    title: "The Short I Sound",
    letter: "I",
    sound: "/ɪ/ as in 'sit'",
    exampleWords: [
      { word: "list", phonetic: "l-i-s-t" },
      { word: "fix", phonetic: "f-i-x" },
      { word: "bill", phonetic: "b-i-l-l" },
      { word: "ship", phonetic: "sh-i-p" },
    ],
    exercise: {
      prompt: "Which word has the short I sound?",
      targetSound: "i",
      options: ["ride", "kind", "gift", "like"],
      correctIndex: 2,
      explanation:
        "Gift has the short I sound (like in sit). Ride, kind, and like use long I sounds.",
    },
  },
  {
    id: "phonics-4",
    category: "phonics",
    title: "The SH Sound",
    letter: "SH",
    sound: "/ʃ/ as in 'shop'",
    exampleWords: [
      { word: "shift", phonetic: "sh-i-f-t" },
      { word: "share", phonetic: "sh-air" },
      { word: "shut", phonetic: "sh-u-t" },
      { word: "shelf", phonetic: "sh-e-l-f" },
    ],
    exercise: {
      prompt: "Which word begins with the SH sound?",
      targetSound: "sh",
      options: ["chart", "show", "slow", "throw"],
      correctIndex: 1,
      explanation:
        "Show begins with SH. Chart starts with CH, slow and throw start with other consonant blends.",
    },
  },
  {
    id: "phonics-5",
    category: "phonics",
    title: "The TH Sound",
    letter: "TH",
    sound: "/θ/ as in 'think'",
    exampleWords: [
      { word: "thank", phonetic: "th-a-n-k" },
      { word: "three", phonetic: "th-r-ee" },
      { word: "think", phonetic: "th-i-n-k" },
      { word: "through", phonetic: "th-r-oo" },
    ],
    exercise: {
      prompt: "Which word starts with the TH sound?",
      targetSound: "th",
      options: ["free", "tree", "thick", "trick"],
      correctIndex: 2,
      explanation:
        "Thick begins with the TH sound (like in think). Free and tree start with other sounds, and trick starts with TR.",
    },
  },
];

export const sightWordLessons: SightWordLesson[] = [
  {
    id: "sight-1",
    category: "sight-words",
    title: "Everyday Essentials",
    words: [
      { word: "address", definition: "The place where you live or work", sentence: "Please write your address on the form." },
      { word: "emergency", definition: "A serious situation that needs fast action", sentence: "Call 911 in an emergency." },
      { word: "schedule", definition: "A plan that shows times for activities", sentence: "Check the bus schedule before you leave." },
      { word: "appointment", definition: "A meeting planned for a certain time", sentence: "I have a doctor's appointment on Monday." },
      { word: "receipt", definition: "A paper that shows what you paid", sentence: "Keep your receipt in case you need to return it." },
      { word: "signature", definition: "Your name written in your own way", sentence: "Please put your signature at the bottom." },
      { word: "insurance", definition: "A plan that pays for costs when things go wrong", sentence: "Do you have health insurance?" },
      { word: "identification", definition: "A card or paper that proves who you are", sentence: "Bring your identification to the office." },
      { word: "deposit", definition: "Money you put into a bank account", sentence: "I need to make a deposit today." },
      { word: "prescription", definition: "A doctor's note for medicine", sentence: "Take this prescription to the pharmacy." },
    ],
  },
  {
    id: "sight-2",
    category: "sight-words",
    title: "Workplace Words",
    words: [
      { word: "manager", definition: "The person in charge at work", sentence: "Talk to your manager about your hours." },
      { word: "application", definition: "A form you fill out to ask for something", sentence: "Fill out the job application online." },
      { word: "benefit", definition: "Something good you get from your job", sentence: "Health care is an important benefit." },
      { word: "training", definition: "Learning how to do a job", sentence: "New employees go through training first." },
      { word: "paycheck", definition: "The money you earn from work", sentence: "Your paycheck comes every two weeks." },
      { word: "overtime", definition: "Extra hours worked beyond the normal schedule", sentence: "You get paid more for overtime." },
      { word: "safety", definition: "Being protected from danger", sentence: "Follow all safety rules at work." },
      { word: "uniform", definition: "Special clothes worn for work", sentence: "Wear your uniform every shift." },
      { word: "break", definition: "A short rest during work", sentence: "You get a 30-minute lunch break." },
      { word: "supervisor", definition: "A person who watches over your work", sentence: "Ask your supervisor if you need help." },
    ],
  },
  {
    id: "sight-3",
    category: "sight-words",
    title: "Health & Safety",
    words: [
      { word: "dosage", definition: "How much medicine to take", sentence: "Follow the dosage on the label." },
      { word: "symptom", definition: "A sign that you are sick", sentence: "A fever is a common symptom." },
      { word: "allergic", definition: "Having a bad reaction to something", sentence: "Tell your doctor if you are allergic to anything." },
      { word: "caution", definition: "A warning to be careful", sentence: "The sign says caution — wet floor." },
      { word: "hazard", definition: "Something that can cause harm", sentence: "Chemicals can be a health hazard." },
      { word: "warning", definition: "A notice about possible danger", sentence: "Read the warning on the bottle." },
      { word: "poison", definition: "Something very harmful if eaten or touched", sentence: "Keep poison away from children." },
      { word: "temperature", definition: "How hot or cold something is", sentence: "The nurse checked my temperature." },
      { word: "pharmacy", definition: "A place that sells medicine", sentence: "Pick up your medicine at the pharmacy." },
      { word: "refill", definition: "Getting more of your medicine", sentence: "I need a refill on my prescription." },
    ],
  },
];

export const sentenceLessons: SentenceLesson[] = [
  {
    id: "sentence-1",
    category: "sentences",
    title: "Staying Healthy",
    topic: "Health",
    passage: "Getting enough sleep is important for your health. Most adults need 7 to 9 hours of sleep each night. When you don't sleep enough, it can be hard to focus at work. You might also feel more stressed or get sick more often. Try to go to bed at the same time each night. Turn off your phone 30 minutes before bed. A good night's sleep helps you feel your best.",
    questions: [
      {
        question: "How many hours of sleep do most adults need?",
        options: ["4 to 5 hours", "7 to 9 hours", "10 to 12 hours", "It doesn't matter"],
        correctIndex: 1,
        explanation:
          "The passage says most adults need 7 to 9 hours of sleep each night.",
      },
      {
        question: "According to the passage, what can happen if you don't sleep enough?",
        options: [
          "You always feel relaxed",
          "It may be hard to focus and you might feel more stressed or get sick more often",
          "You never get sick",
          "You need less sleep over time",
        ],
        correctIndex: 1,
        explanation:
          "The passage says that when you don't sleep enough, it can be hard to focus at work, and you might feel more stressed or get sick more often.",
      },
    ],
  },
  {
    id: "sentence-2",
    category: "sentences",
    title: "At the Workplace",
    topic: "Work",
    passage: "Starting a new job can feel stressful, but it gets easier with time. On your first day, arrive a few minutes early. Listen carefully during training and write things down if you need to. It's okay to ask questions — your coworkers expect it. Take breaks when you're allowed to. After a few weeks, the job will start to feel more natural.",
    questions: [
      {
        question: "What should you do if you don't understand something at a new job?",
        options: ["Stay quiet", "Ask questions", "Leave early", "Skip training"],
        correctIndex: 1,
        explanation:
          "The passage says it is okay to ask questions and that your coworkers expect you to ask.",
      },
      {
        question: "What does the passage suggest about your first day?",
        options: [
          "Arrive late so you are not early",
          "Arrive a few minutes early",
          "Skip the first day",
          "Avoid talking to anyone",
        ],
        correctIndex: 1,
        explanation:
          "The passage says that on your first day, you should arrive a few minutes early.",
      },
    ],
  },
  {
    id: "sentence-3",
    category: "sentences",
    title: "Using Public Transit",
    topic: "Daily Life",
    passage: "Many people use buses and trains to get to work or appointments. To ride the bus, you need to know your route number and where to catch it. Most buses have a schedule you can check online or at the stop. Have your fare ready before you board. If you're not sure where to get off, ask the driver. Public transit can save you money compared to driving.",
    questions: [
      {
        question: "What should you have ready before you board the bus?",
        options: ["Your driver's license", "Your fare", "A map", "Your phone number"],
        correctIndex: 1,
        explanation:
          "The passage says to have your fare ready before you board.",
      },
      {
        question: "Where can you check a bus schedule, according to the passage?",
        options: ["Only on TV", "Online or at the stop", "Never — schedules are not available", "Only in a letter"],
        correctIndex: 1,
        explanation:
          "The passage says most buses have a schedule you can check online or at the stop.",
      },
    ],
  },
];

export const realWorldLessons: RealWorldLesson[] = [
  {
    id: "real-world-1",
    category: "real-world",
    title: "Reading a Job Application",
    documentType: "Job Application Form",
    content: `JOB APPLICATION FORM

Position Applied For: _______________
Date Available to Start: _______________

PERSONAL INFORMATION
Full Name: _______________
Address: _______________
City: _______________ State: ___ ZIP: _______
Phone Number: _______________

Are you legally authorized to work in this country?  Yes ☐  No ☐
Have you ever been employed by this company before?  Yes ☐  No ☐

EMPLOYMENT HISTORY
Most Recent Employer: _______________
Job Title: _______________
Dates Employed: From _______ To _______
Reason for Leaving: _______________

I certify that all information provided is true and complete.

Signature: _______________ Date: _______________`,
    vocabulary: [
      { word: "authorized", definition: "Having official permission to do something", phonetic: "aw-thuh-rized" },
      { word: "certify", definition: "To officially confirm that something is true", phonetic: "sur-tih-fy" },
      { word: "employer", definition: "A person or company that hires workers", phonetic: "em-ploy-er" },
      { word: "employed", definition: "Having a job; working for pay", phonetic: "em-ployd" },
    ],
    questions: [
      {
        question: "What does 'authorized' mean on this form?",
        options: ["Interested in", "Having permission", "Wanting to", "Required to"],
        correctIndex: 1,
        explanation:
          "Authorized means having official permission. Here it asks if you are legally allowed to work in this country.",
      },
      {
        question: "The form asks for your most recent employer. What is that asking for?",
        options: [
          "Your favorite restaurant",
          "The place where you last worked",
          "Your school name",
          "A friend's employer",
        ],
        correctIndex: 1,
        explanation:
          "Employment history asks for where you worked before — your most recent employer is the job you had last.",
      },
    ],
  },
  {
    id: "real-world-2",
    category: "real-world",
    title: "Understanding a Medication Label",
    documentType: "Medication Label",
    content: `IBUPROFEN TABLETS — 200 mg
Pain Reliever / Fever Reducer

DRUG FACTS
Active Ingredient (per tablet): Ibuprofen 200 mg

Uses: Temporarily relieves minor aches and pains due to:
• headache • toothache • muscle aches
• the common cold • menstrual cramps

WARNINGS
Do not use if you have ever had an allergic reaction to any pain reliever.

Ask a doctor before use if you:
• have stomach problems
• have high blood pressure
• are taking any other medication

DIRECTIONS
Adults and children 12 years and over:
Take 1 tablet every 4 to 6 hours while symptoms last.
Do not take more than 3 tablets in 24 hours unless directed by a doctor.

Store at room temperature. Keep out of reach of children.`,
    vocabulary: [
      { word: "temporarily", definition: "For a short time, not forever", phonetic: "tem-puh-rair-uh-lee" },
      { word: "relieves", definition: "Makes pain or discomfort less", phonetic: "rih-leevz" },
      { word: "allergic reaction", definition: "A bad response your body has to something", phonetic: "uh-lur-jik ree-ak-shun" },
      { word: "directed", definition: "Told or instructed by someone", phonetic: "dih-rek-ted" },
    ],
    questions: [
      {
        question: "How many tablets can you take in 24 hours without asking a doctor?",
        options: ["1 tablet", "2 tablets", "3 tablets", "As many as needed"],
        correctIndex: 2,
        explanation:
          "The directions say: Do not take more than 3 tablets in 24 hours unless directed by a doctor — so you may take up to 3 without asking first.",
      },
      {
        question: "According to the warnings, when should you not use this medicine?",
        options: [
          "If you have a headache",
          "If you have ever had an allergic reaction to any pain reliever",
          "If you are over 12",
          "If you take it with water",
        ],
        correctIndex: 1,
        explanation:
          "The warnings say: Do not use if you have ever had an allergic reaction to any pain reliever.",
      },
    ],
  },
];

export const allLessons: Lesson[] = [
  ...phonicsLessons,
  ...sightWordLessons,
  ...sentenceLessons,
  ...realWorldLessons,
];

export function getLessonsByCategory(category: string): Lesson[] {
  return allLessons.filter((l) => l.category === category);
}

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}

export const categoryInfo = [
  {
    id: "phonics",
    title: "Letters & Sounds",
    description: "Learn the alphabet, phonics, and how letters make words",
    icon: "volume-2",
  },
  {
    id: "sight-words",
    title: "Words You'll Use",
    description: "Practice common words you see every day",
    icon: "book-open",
  },
  {
    id: "sentences",
    title: "Sentences & Stories",
    description: "Read short passages about everyday topics",
    icon: "file-text",
  },
  {
    id: "real-world",
    title: "Real-World Reading",
    description: "Practice with documents like forms and labels",
    icon: "clipboard-list",
  },
];
