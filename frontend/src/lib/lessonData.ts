import type {
  ContentTopic,
  Lesson,
  PhonicsLesson,
  SightWordLesson,
  SentenceLesson,
  RealWorldLesson,
} from "./types";

/**
 * Sync rule:
 * When you add/change lessons in this file, update db/lear2read_data.sql so
 * the shared database lesson inventory stays aligned for teammates and AI.
 */

/** Same five themes in every category, in this order */
export const STANDARD_TOPICS: ContentTopic[] = [
  "Documents",
  "Shopping",
  "Everyday terms",
  "Driving",
  "Auto/legal",
];

export const phonicsLessons: PhonicsLesson[] = [
  {
    id: "phonics-1",
    category: "phonics",
    topic: "Documents",
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
    topic: "Shopping",
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
    topic: "Everyday terms",
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
    topic: "Driving",
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
    topic: "Auto/legal",
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
    topic: "Documents",
    title: "Forms and ID",
    words: [
      { word: "address", definition: "The place where you live or work", sentence: "Please write your address on the form." },
      { word: "signature", definition: "Your name written in your own way", sentence: "Please put your signature at the bottom." },
      { word: "application", definition: "A form you fill out to ask for something", sentence: "Fill out the application in pen." },
      { word: "identification", definition: "A card or paper that proves who you are", sentence: "Bring your identification to the office." },
      { word: "document", definition: "An official paper with information", sentence: "Keep a copy of the document for your files." },
      { word: "certify", definition: "To officially confirm that something is true", sentence: "You must certify that the information is correct." },
      { word: "photocopy", definition: "A paper copy made by a machine", sentence: "Make a photocopy of your license." },
      { word: "register", definition: "To sign up officially on a list", sentence: "Register to vote before the deadline." },
      { word: "deadline", definition: "The last day something is due", sentence: "The deadline to send the form is Friday." },
      { word: "notarize", definition: "To have an official witness sign a document", sentence: "You may need to notarize the letter." },
    ],
  },
  {
    id: "sight-2",
    category: "sight-words",
    topic: "Shopping",
    title: "Stores and prices",
    words: [
      { word: "receipt", definition: "A paper that shows what you paid", sentence: "Keep your receipt in case you need to return it." },
      { word: "discount", definition: "A lower price than usual", sentence: "This shirt is on discount today." },
      { word: "coupon", definition: "A ticket that saves you money", sentence: "Clip the coupon from the newspaper." },
      { word: "clearance", definition: "Sale of items the store wants to move out", sentence: "The coat was on clearance for half price." },
      { word: "cashier", definition: "The person who takes your payment", sentence: "Pay the cashier at the front of the store." },
      { word: "debit", definition: "Money taken straight from your bank account", sentence: "I paid with my debit card." },
      { word: "total", definition: "The full amount you owe", sentence: "The total for your groceries is $42." },
      { word: "purchase", definition: "Something you buy", sentence: "Save your receipt for every purchase." },
      { word: "return", definition: "To bring something back to the store", sentence: "You can return it within 30 days." },
      { word: "barcode", definition: "Lines the scanner reads for the price", sentence: "The cashier scanned the barcode." },
    ],
  },
  {
    id: "sight-3",
    category: "sight-words",
    topic: "Everyday terms",
    title: "Daily life",
    words: [
      { word: "schedule", definition: "A plan that shows times for activities", sentence: "Check the bus schedule before you leave." },
      { word: "emergency", definition: "A serious situation that needs fast action", sentence: "Call 911 in an emergency." },
      { word: "neighbor", definition: "A person who lives near you", sentence: "Our neighbor brought us mail by mistake." },
      { word: "weekend", definition: "Saturday and Sunday", sentence: "What are you doing this weekend?" },
      { word: "tonight", definition: "On this evening or night", sentence: "It might rain tonight." },
      { word: "borrow", definition: "To use something that belongs to someone else", sentence: "May I borrow your pen?" },
      { word: "weather", definition: "What it is like outside (rain, sun, cold)", sentence: "The weather will be hot tomorrow." },
      { word: "garbage", definition: "Trash you throw away", sentence: "Take the garbage out on Tuesday." },
      { word: "laundry", definition: "Clothes that need washing or that were just washed", sentence: "I need to do laundry this weekend." },
      { word: "groceries", definition: "Food and household items you buy at the store", sentence: "I need to buy groceries after work." },
    ],
  },
  {
    id: "sight-4",
    category: "sight-words",
    topic: "Driving",
    title: "On the road",
    words: [
      { word: "traffic", definition: "Cars and trucks moving on the road", sentence: "Traffic was heavy during rush hour." },
      { word: "signal", definition: "A light that tells drivers when to stop or go", sentence: "Stop when the signal is red." },
      { word: "merge", definition: "To join traffic from another lane or road", sentence: "Merge carefully onto the highway." },
      { word: "highway", definition: "A main fast road between cities", sentence: "Take the highway to get there faster." },
      { word: "detour", definition: "A different route when the main road is closed", sentence: "Follow the detour signs around the work zone." },
      { word: "yield", definition: "Slow down and let other traffic go first if needed", sentence: "Yield to pedestrians in the crosswalk." },
      { word: "pedestrian", definition: "A person walking, not in a vehicle", sentence: "Watch for pedestrians downtown." },
      { word: "intersection", definition: "The place where two roads cross", sentence: "Turn left at the next intersection." },
      { word: "mileage", definition: "The number of miles a car has traveled", sentence: "Check the mileage before you buy a used car." },
      { word: "carpool", definition: "Sharing a ride with others to save gas", sentence: "We carpool to work on Mondays." },
    ],
  },
  {
    id: "sight-5",
    category: "sight-words",
    topic: "Auto/legal",
    title: "Cars and the law",
    words: [
      { word: "insurance", definition: "A plan that pays for costs when things go wrong", sentence: "Keep proof of insurance in your car." },
      { word: "registration", definition: "Official record that your vehicle is allowed on the road", sentence: "Renew your registration every year." },
      { word: "inspection", definition: "A required check that your car is safe", sentence: "Your car passed the state inspection." },
      { word: "license", definition: "Official permission to drive", sentence: "Carry your driver's license when you drive." },
      { word: "violation", definition: "Breaking a law or rule", sentence: "A speeding ticket is a traffic violation." },
      { word: "permit", definition: "Official permission to do something", sentence: "You need a permit to park overnight." },
      { word: "policy", definition: "A written contract with an insurance company", sentence: "Read what your policy covers." },
      { word: "deductible", definition: "Money you pay before insurance pays the rest", sentence: "My deductible is $500 after an accident." },
      { word: "premium", definition: "The amount you pay for insurance each month", sentence: "Compare premiums before you choose a plan." },
      { word: "attorney", definition: "A person trained to help you with the law", sentence: "Talk to an attorney if you get a court notice." },
    ],
  },
];

export const sentenceLessons: SentenceLesson[] = [
  {
    id: "sentence-1",
    category: "sentences",
    title: "Reading a rental agreement",
    topic: "Documents",
    passage:
      "Before you move in, read the rental agreement carefully. It lists the rent amount, when it is due, and rules about pets or guests. Look for how much notice you must give before you move out. If something is unclear, ask the landlord to explain it in writing. Keep a signed copy of the agreement for your records.",
    questions: [
      {
        question: "What should you do if part of the rental agreement is unclear?",
        options: [
          "Sign without reading",
          "Ask the landlord to explain it in writing",
          "Ignore that section",
          "Change the text yourself",
        ],
        correctIndex: 1,
        explanation:
          "The passage says that if something is unclear, you should ask the landlord to explain it in writing.",
      },
      {
        question: "According to the passage, what is one thing the agreement may list?",
        options: ["Only your favorite color", "Rules about pets or guests", "Your bank password", "A recipe"],
        correctIndex: 1,
        explanation:
          "The passage says the agreement lists the rent, when it is due, and rules about pets or guests.",
      },
    ],
  },
  {
    id: "sentence-2",
    category: "sentences",
    title: "At the grocery store",
    topic: "Shopping",
    passage:
      "Compare prices before you put items in your cart. Store brands often cost less than name brands for the same type of food. Check the unit price on the shelf tag to see which size is a better deal. Look at sell-by dates on milk and meat. If you use coupons, read the fine print so you know what sizes or quantities qualify.",
    questions: [
      {
        question: "What does the passage suggest about store brands?",
        options: [
          "They always taste worse",
          "They often cost less than name brands for similar food",
          "They are never on sale",
          "You cannot buy them with cash",
        ],
        correctIndex: 1,
        explanation:
          "The passage says store brands often cost less than name brands for the same type of food.",
      },
      {
        question: "Why should you read the fine print on coupons?",
        options: [
          "To practice reading",
          "To know what sizes or quantities qualify",
          "Because coupons are illegal",
          "To find the store phone number only",
        ],
        correctIndex: 1,
        explanation:
          "The passage says to read the fine print so you know what sizes or quantities qualify.",
      },
    ],
  },
  {
    id: "sentence-3",
    category: "sentences",
    title: "Staying healthy",
    topic: "Everyday terms",
    passage:
      "Getting enough sleep is important for your health. Most adults need 7 to 9 hours of sleep each night. When you don't sleep enough, it can be hard to focus at work. You might also feel more stressed or get sick more often. Try to go to bed at the same time each night. Turn off your phone 30 minutes before bed. A good night's sleep helps you feel your best.",
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
    id: "sentence-4",
    category: "sentences",
    title: "Rules of the road",
    topic: "Driving",
    passage:
      "A red light means stop completely before the crosswalk or stop line. A yellow light means the signal is about to turn red — slow down and stop if you can do so safely. At a stop sign, come to a full stop and yield to traffic that has the right of way. Use your turn signal before you change lanes or turn. Never pass a stopped school bus with its red lights flashing.",
    questions: [
      {
        question: "What does a steady red traffic light mean?",
        options: ["Speed up", "Stop completely before the crosswalk or stop line", "Turn without looking", "Only slow down a little"],
        correctIndex: 1,
        explanation:
          "The passage says a red light means stop completely before the crosswalk or stop line.",
      },
      {
        question: "When must you use your turn signal, according to the passage?",
        options: [
          "Only on the highway",
          "Before you change lanes or turn",
          "Never — signals are optional",
          "Only at night",
        ],
        correctIndex: 1,
        explanation:
          "The passage says to use your turn signal before you change lanes or turn.",
      },
    ],
  },
  {
    id: "sentence-5",
    category: "sentences",
    title: "Car insurance basics",
    topic: "Auto/legal",
    passage:
      "Liability insurance helps pay for damage or injuries you may cause to others in a crash. Your policy lists the maximum amounts the company will pay. A deductible is the amount you pay out of pocket before the insurance pays on a covered claim. If you finance a car, the lender may require full coverage. Read your declarations page to see what is covered and when your premium is due.",
    questions: [
      {
        question: "What is a deductible, according to the passage?",
        options: [
          "The total value of your car",
          "The amount you pay out of pocket before insurance pays on a covered claim",
          "A type of traffic ticket",
          "The same as liability insurance",
        ],
        correctIndex: 1,
        explanation:
          "The passage defines a deductible as the amount you pay out of pocket before the insurance pays on a covered claim.",
      },
      {
        question: "What might a lender require if you finance a car?",
        options: ["No insurance", "Full coverage", "Only bicycle insurance", "A new paint job"],
        correctIndex: 1,
        explanation:
          "The passage says if you finance a car, the lender may require full coverage.",
      },
    ],
  },
];

export const realWorldLessons: RealWorldLesson[] = [
  {
    id: "real-world-1",
    category: "real-world",
    topic: "Documents",
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
    topic: "Shopping",
    title: "Reading a store receipt",
    documentType: "Purchase Receipt",
    content: `MARTIN'S MARKET — Store #204
123 Oak Street — Customer Copy

MILK 1 gal whole        $3.49
BREAD white loaf          $2.19
APPLES 2 lb               $3.98
SUBTOTAL                 $9.66
TAX                      $0.77
TOTAL DUE               $10.43

PAYMENT: DEBIT CARD ****4521
APPROVED — Thank you

RETURN POLICY: With receipt, most items may be returned within 30 days for refund or exchange. Opened food items may not be returned unless defective.

Questions? Call 555-0100 or visit martinsmarket.com`,
    vocabulary: [
      { word: "subtotal", definition: "The amount before tax is added", phonetic: "sub-toh-tul" },
      { word: "approved", definition: "Accepted; the payment went through", phonetic: "uh-proovd" },
      { word: "exchange", definition: "To trade an item for another one", phonetic: "eks-chaynj" },
      { word: "defective", definition: "Broken or not working as it should", phonetic: "dih-fek-tiv" },
    ],
    questions: [
      {
        question: "What was the total amount due?",
        options: ["$9.66", "$10.43", "$3.49", "$0.77"],
        correctIndex: 1,
        explanation:
          "The receipt shows TOTAL DUE as $10.43 after subtotal and tax.",
      },
      {
        question: "According to the return policy, how long do you generally have to return most items with a receipt?",
        options: ["7 days", "30 days", "One year", "Same day only"],
        correctIndex: 1,
        explanation:
          "The policy says most items may be returned within 30 days with a receipt.",
      },
    ],
  },
  {
    id: "real-world-3",
    category: "real-world",
    topic: "Everyday terms",
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
  {
    id: "real-world-4",
    category: "real-world",
    topic: "Driving",
    title: "Reading a parking sign",
    documentType: "Street Parking Notice",
    content: `CITY PARKING AUTHORITY
ZONE 12 — DOWNTOWN

MON–FRI: 8 AM – 6 PM
2 HOUR LIMIT — METER REQUIRED

SAT–SUN & CITY HOLIDAYS: NO METER — FREE PARKING

NO PARKING ANYTIME:
• Within 15 feet of a fire hydrant
• In bus stops or loading zones
• On sidewalks or crosswalks

VIOLATORS MAY BE TICKETED OR TOWED AT OWNER'S EXPENSE.

For questions call 311 or visit cityparking.gov`,
    vocabulary: [
      { word: "meter", definition: "A device you pay so you can park for a set time", phonetic: "mee-ter" },
      { word: "hydrant", definition: "A pipe firefighters connect to for water", phonetic: "hy-drant" },
      { word: "violators", definition: "People who break the parking rules", phonetic: "vy-uh-lay-terz" },
      { word: "towed", definition: "When your car is taken away by a truck for illegal parking", phonetic: "tohd" },
    ],
    questions: [
      {
        question: "On a regular Monday at 10 AM, what does the sign say you need to park legally?",
        options: [
          "No payment ever",
          "A meter payment — 2 hour limit Mon–Fri 8 AM – 6 PM",
          "Only on Sundays",
          "A special city holiday pass only",
        ],
        correctIndex: 1,
        explanation:
          "The sign says Mon–Fri 8 AM – 6 PM, 2 hour limit, meter required.",
      },
      {
        question: "How close to a fire hydrant does the sign say you cannot park?",
        options: ["Any distance is fine", "Within 15 feet", "Only on weekends", "Exactly 10 feet only"],
        correctIndex: 1,
        explanation:
          "The sign lists no parking within 15 feet of a fire hydrant.",
      },
    ],
  },
  {
    id: "real-world-5",
    category: "real-world",
    topic: "Auto/legal",
    title: "Proof of insurance card",
    documentType: "Auto Insurance ID Card",
    content: `SUNSHINE MUTUAL INSURANCE
Automobile Insurance Identification Card

POLICY NUMBER: AU-8849201
EFFECTIVE: 01/15/2025   EXPIRES: 01/15/2026

NAMED INSURED: _________________
VEHICLE: 2019 Honda Civic  VIN ending ...4821

COVERAGES (simplified summary)
Bodily Injury Liability: $50,000 / $100,000
Property Damage Liability: $25,000
Uninsured Motorist: $25,000 / $50,000

THIS CARD MUST BE CARRIED IN THE VEHICLE OR SHOWN ON REQUEST.
ACCIDENTS: Call 800-555-0199 — 24 hours

Not valid as proof of financial responsibility in all states — see policy.`,
    vocabulary: [
      { word: "liability", definition: "Legal responsibility for damage or injury you cause", phonetic: "ly-uh-bil-ih-tee" },
      { word: "insured", definition: "Protected by an insurance policy", phonetic: "in-shoord" },
      { word: "effective", definition: "When the coverage starts", phonetic: "ih-fek-tiv" },
      { word: "expires", definition: "When the coverage ends if not renewed", phonetic: "eks-pyrz" },
    ],
    questions: [
      {
        question: "According to the card, what should you do if you have an accident?",
        options: [
          "Leave the scene without talking to anyone",
          "Call 800-555-0199 — 24 hours",
          "Wait until Monday only",
          "Only email the DMV",
        ],
        correctIndex: 1,
        explanation:
          "The card says accidents: Call 800-555-0199 — 24 hours.",
      },
      {
        question: "What does 'expires 01/15/2026' tell you?",
        options: [
          "When the car was made",
          "When this coverage ends if not renewed",
          "When you must buy gas",
          "Your birthday",
        ],
        correctIndex: 1,
        explanation:
          "Expires is the date when the coverage ends if the policy is not renewed.",
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
  {
    id: "phonics",
    title: "Letters & Sounds",
    description: "Learn the alphabet, phonics, and how letters make words",
    icon: "volume-2",
  },
];
