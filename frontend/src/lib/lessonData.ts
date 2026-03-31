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

export const PRACTICE_CONTEXTS = [
  "Everyday Terms",
  "Employment",
  "Finance",
  "Legal",
  "Medical",
  "Housing",
  "Shopping",
  "Auto",
  "Technology",
  "Social Life",
  "Dining",
  "Emergencies",
  "Community",
] as const;

export type PracticeContext = (typeof PRACTICE_CONTEXTS)[number];

const LEGACY_TOPIC_ALIASES_BY_CONTEXT: Record<PracticeContext, string[]> = {
  "Everyday Terms": ["Everyday terms", "Everyday Terms"],
  Employment: ["Documents", "Employment"],
  Finance: ["Finance"],
  Legal: ["Auto/legal", "Legal"],
  Medical: ["Medical"],
  Housing: ["Housing"],
  Shopping: ["Shopping"],
  Auto: ["Driving", "Auto"],
  Technology: ["Technology"],
  "Social Life": ["Social Life"],
  Dining: ["Dining"],
  Emergencies: ["Emergencies"],
  Community: ["Community"],
};

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
  {
    id: "phonics-6",
    category: "phonics",
    topic: "Finance",
    title: "The CH Sound",
    letter: "CH",
    sound: "/tʃ/ as in 'check'",
    exampleWords: [
      { word: "check", phonetic: "ch-e-ck" },
      { word: "chart", phonetic: "ch-ar-t" },
      { word: "charge", phonetic: "ch-ar-j" },
      { word: "cheap", phonetic: "ch-ee-p" },
    ],
    exercise: {
      prompt: "You are paying a bill. Which word starts with the CH sound?",
      targetSound: "ch",
      options: ["check", "bank", "card", "loan"],
      correctIndex: 0,
      explanation: "Check starts with CH. The other words begin with different sounds.",
    },
  },
  {
    id: "phonics-7",
    category: "phonics",
    topic: "Medical",
    title: "The CL Blend",
    letter: "CL",
    sound: "/kl/ as in 'clinic'",
    exampleWords: [
      { word: "clinic", phonetic: "cl-i-n-ic" },
      { word: "clean", phonetic: "cl-ee-n" },
      { word: "close", phonetic: "cl-oh-s" },
      { word: "clock", phonetic: "cl-o-ck" },
    ],
    exercise: {
      prompt: "At the doctor's office, which word begins with the CL blend?",
      targetSound: "cl",
      options: ["clinic", "doctor", "nurse", "pain"],
      correctIndex: 0,
      explanation: "Clinic begins with the CL blend. The others do not.",
    },
  },
  {
    id: "phonics-8",
    category: "phonics",
    topic: "Housing",
    title: "The PL Blend",
    letter: "PL",
    sound: "/pl/ as in 'place'",
    exampleWords: [
      { word: "place", phonetic: "pl-a-ce" },
      { word: "plan", phonetic: "pl-a-n" },
      { word: "plug", phonetic: "pl-u-g" },
      { word: "plate", phonetic: "pl-ay-t" },
    ],
    exercise: {
      prompt: "Which housing word starts with the PL blend?",
      targetSound: "pl",
      options: ["place", "rent", "home", "key"],
      correctIndex: 0,
      explanation: "Place begins with PL. The other options start with different sounds.",
    },
  },
  {
    id: "phonics-9",
    category: "phonics",
    topic: "Technology",
    title: "The TR Blend",
    letter: "TR",
    sound: "/tr/ as in 'track'",
    exampleWords: [
      { word: "track", phonetic: "tr-a-ck" },
      { word: "try", phonetic: "tr-y" },
      { word: "trash", phonetic: "tr-a-sh" },
      { word: "trend", phonetic: "tr-e-nd" },
    ],
    exercise: {
      prompt: "When using an app, which word starts with TR?",
      targetSound: "tr",
      options: ["track", "click", "login", "screen"],
      correctIndex: 0,
      explanation: "Track begins with TR. The other words begin with other sounds.",
    },
  },
  {
    id: "phonics-10",
    category: "phonics",
    topic: "Social Life",
    title: "The FR Blend",
    letter: "FR",
    sound: "/fr/ as in 'friend'",
    exampleWords: [
      { word: "friend", phonetic: "fr-i-end" },
      { word: "free", phonetic: "fr-ee" },
      { word: "fresh", phonetic: "fr-e-sh" },
      { word: "frame", phonetic: "fr-ay-m" },
    ],
    exercise: {
      prompt: "Which social word starts with FR?",
      targetSound: "fr",
      options: ["friend", "group", "talk", "event"],
      correctIndex: 0,
      explanation: "Friend starts with FR. Group, talk, and event do not.",
    },
  },
  {
    id: "phonics-11",
    category: "phonics",
    topic: "Dining",
    title: "The SP Blend",
    letter: "SP",
    sound: "/sp/ as in 'spoon'",
    exampleWords: [
      { word: "spoon", phonetic: "sp-oo-n" },
      { word: "spice", phonetic: "sp-ice" },
      { word: "space", phonetic: "sp-ay-ce" },
      { word: "spill", phonetic: "sp-i-ll" },
    ],
    exercise: {
      prompt: "At a restaurant, which word starts with SP?",
      targetSound: "sp",
      options: ["spoon", "plate", "drink", "fork"],
      correctIndex: 0,
      explanation: "Spoon begins with SP. The others begin with different sounds.",
    },
  },
  {
    id: "phonics-12",
    category: "phonics",
    topic: "Emergencies",
    title: "The ST Blend",
    letter: "ST",
    sound: "/st/ as in 'stop'",
    exampleWords: [
      { word: "stop", phonetic: "st-o-p" },
      { word: "stay", phonetic: "st-ay" },
      { word: "step", phonetic: "st-e-p" },
      { word: "state", phonetic: "st-ay-t" },
    ],
    exercise: {
      prompt: "In an emergency, which word starts with ST?",
      targetSound: "st",
      options: ["stop", "call", "help", "run"],
      correctIndex: 0,
      explanation: "Stop begins with ST and is a common emergency instruction.",
    },
  },
  {
    id: "phonics-13",
    category: "phonics",
    topic: "Community",
    title: "The BR Blend",
    letter: "BR",
    sound: "/br/ as in 'bridge'",
    exampleWords: [
      { word: "bridge", phonetic: "br-i-dge" },
      { word: "bring", phonetic: "br-i-ng" },
      { word: "broad", phonetic: "br-aw-d" },
      { word: "bright", phonetic: "br-igh-t" },
    ],
    exercise: {
      prompt: "Which community word starts with BR?",
      targetSound: "br",
      options: ["bridge", "park", "street", "school"],
      correctIndex: 0,
      explanation: "Bridge starts with BR. The other options start with different sounds.",
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
  {
    id: "sight-6",
    category: "sight-words",
    topic: "Finance",
    title: "Money and banking",
    words: [
      { word: "balance", definition: "How much money is in your account", sentence: "Check your balance before paying the bill." },
      { word: "deposit", definition: "Money put into your account", sentence: "I made a cash deposit at the bank." },
      { word: "withdraw", definition: "To take money out of your account", sentence: "You can withdraw money at the ATM." },
      { word: "interest", definition: "Extra money paid on savings or charged on loans", sentence: "This savings account earns interest each month." },
      { word: "budget", definition: "A plan for how to spend your money", sentence: "We made a budget for groceries and rent." },
    ],
  },
  {
    id: "sight-7",
    category: "sight-words",
    topic: "Medical",
    title: "Health care words",
    words: [
      { word: "symptom", definition: "A sign that you are sick", sentence: "A fever can be a symptom of illness." },
      { word: "prescription", definition: "Doctor's order for medicine", sentence: "Pick up your prescription at the pharmacy." },
      { word: "dosage", definition: "How much medicine to take", sentence: "Read the dosage on the bottle carefully." },
      { word: "appointment", definition: "A planned visit with a doctor", sentence: "My appointment is at 2 PM tomorrow." },
      { word: "allergy", definition: "A reaction to food, medicine, or other things", sentence: "Tell the nurse about your allergy." },
    ],
  },
  {
    id: "sight-8",
    category: "sight-words",
    topic: "Housing",
    title: "Home and rent",
    words: [
      { word: "lease", definition: "A contract to rent a home", sentence: "Read the lease before you sign it." },
      { word: "tenant", definition: "A person who rents a home", sentence: "The tenant paid rent on Friday." },
      { word: "landlord", definition: "The person who owns the rental home", sentence: "Call the landlord about the broken heater." },
      { word: "utility", definition: "Services like water, gas, and electricity", sentence: "Utilities are due at the end of the month." },
      { word: "maintenance", definition: "Repairs and care for a building", sentence: "Submit a maintenance request for the sink leak." },
    ],
  },
  {
    id: "sight-9",
    category: "sight-words",
    topic: "Technology",
    title: "Phone and computer basics",
    words: [
      { word: "password", definition: "Secret word you use to sign in", sentence: "Do not share your password with anyone." },
      { word: "update", definition: "A newer version of software", sentence: "Install the update before using the app." },
      { word: "download", definition: "To copy a file from the internet", sentence: "Download the form to your phone." },
      { word: "username", definition: "Name you use to sign into an account", sentence: "Enter your username and password." },
      { word: "notification", definition: "A message alert from an app", sentence: "I received a notification from my bank app." },
    ],
  },
  {
    id: "sight-10",
    category: "sight-words",
    topic: "Social Life",
    title: "People and plans",
    words: [
      { word: "invite", definition: "To ask someone to join you", sentence: "I will invite my neighbor to dinner." },
      { word: "conversation", definition: "Talking with another person", sentence: "We had a good conversation after class." },
      { word: "support", definition: "Help from other people", sentence: "Family support can make hard times easier." },
      { word: "respect", definition: "Treating others in a kind and fair way", sentence: "Show respect when people are speaking." },
      { word: "volunteer", definition: "To help without being paid", sentence: "She will volunteer at the community center." },
    ],
  },
  {
    id: "sight-11",
    category: "sight-words",
    topic: "Dining",
    title: "Food and restaurants",
    words: [
      { word: "menu", definition: "A list of food and drinks", sentence: "Please look at the menu before ordering." },
      { word: "ingredient", definition: "One item used to make food", sentence: "Salt is one ingredient in the soup." },
      { word: "allergen", definition: "A food that can cause a bad reaction", sentence: "Tell the server about your allergen." },
      { word: "portion", definition: "The amount of food served", sentence: "The portion was large enough to share." },
      { word: "receipt", definition: "Paper showing what you paid", sentence: "Ask for a receipt after you pay." },
    ],
  },
  {
    id: "sight-12",
    category: "sight-words",
    topic: "Emergencies",
    title: "Urgent situations",
    words: [
      { word: "urgent", definition: "Needs quick action", sentence: "This is urgent, so call now." },
      { word: "evacuate", definition: "To leave a place for safety", sentence: "Evacuate the building when the alarm sounds." },
      { word: "shelter", definition: "A safe place to stay", sentence: "Go to the shelter during the storm." },
      { word: "operator", definition: "Person who answers emergency calls", sentence: "The operator asked for my address." },
      { word: "injury", definition: "Physical harm to the body", sentence: "Tell the nurse about your injury." },
    ],
  },
  {
    id: "sight-13",
    category: "sight-words",
    topic: "Community",
    title: "Local services",
    words: [
      { word: "library", definition: "A place where you can borrow books", sentence: "The library is open until 8 PM." },
      { word: "transit", definition: "Public transportation like buses and trains", sentence: "Transit can help you get to work." },
      { word: "resource", definition: "A service or tool that helps people", sentence: "The center is a resource for job help." },
      { word: "permit", definition: "Official permission to do something", sentence: "You need a permit for that event." },
      { word: "meeting", definition: "A planned gathering to discuss something", sentence: "There is a neighborhood meeting tonight." },
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
  {
    id: "sentence-6",
    category: "sentences",
    title: "Using a monthly budget",
    topic: "Finance",
    passage:
      "A budget helps you plan your money before you spend it. First, write your income for the month. Next, list your bills like rent, phone, and groceries. Put some money aside for savings, even if it is a small amount. Track your spending each week to see if you are staying on plan. If one cost is too high, lower spending in another area.",
    questions: [
      {
        question: "What should you do first when making a budget?",
        options: ["Buy new items", "Write your monthly income", "Ignore your bills", "Spend cash quickly"],
        correctIndex: 1,
        explanation: "The passage says to start by writing your income for the month.",
      },
      {
        question: "What does the passage suggest if one cost is too high?",
        options: ["Stop budgeting", "Lower spending in another area", "Borrow money immediately", "Skip all bills"],
        correctIndex: 1,
        explanation: "It says to lower spending somewhere else if one category is too high.",
      },
    ],
  },
  {
    id: "sentence-7",
    category: "sentences",
    title: "Getting ready for a clinic visit",
    topic: "Medical",
    passage:
      "Before a clinic appointment, bring your ID, insurance card, and a list of medicines you take. Write down your symptoms and when they started. If you have questions, bring a small notebook so you can write the answers. Arrive 15 minutes early to complete forms. If you need language help, ask for an interpreter before your visit.",
    questions: [
      {
        question: "What should you bring to help describe your health problem?",
        options: ["A list of symptoms and when they started", "Only a snack", "Old receipts", "Nothing"],
        correctIndex: 0,
        explanation: "The passage says to write down symptoms and when they started.",
      },
      {
        question: "Why should you arrive early?",
        options: ["To pay extra", "To complete forms", "To skip the appointment", "To leave sooner"],
        correctIndex: 1,
        explanation: "It says to arrive 15 minutes early to complete forms.",
      },
    ],
  },
  {
    id: "sentence-8",
    category: "sentences",
    title: "Talking with your landlord",
    topic: "Housing",
    passage:
      "If something breaks in your apartment, report it quickly. Write a short message that explains the problem and the date it started. Keep a copy of your message for your records. If the issue affects safety, such as no heat in winter, say that clearly. Good communication helps repairs happen faster.",
    questions: [
      {
        question: "What should you include in your repair message?",
        options: ["The problem and when it started", "Your favorite movie", "Only your name", "No details"],
        correctIndex: 0,
        explanation: "The passage says to explain the problem and the date it started.",
      },
      {
        question: "Why should you keep a copy of your message?",
        options: ["To throw away later", "For your records", "To send to friends", "To avoid repairs"],
        correctIndex: 1,
        explanation: "The passage says to keep a copy for your records.",
      },
    ],
  },
  {
    id: "sentence-9",
    category: "sentences",
    title: "Staying safe online",
    topic: "Technology",
    passage:
      "Use strong passwords for important accounts like email and banking. A strong password uses letters, numbers, and symbols. Do not share your password by text message. If you get a message asking for personal information, stop and check if it is real. Update your phone and apps often to improve security.",
    questions: [
      {
        question: "What makes a password stronger?",
        options: ["Only your first name", "Letters, numbers, and symbols", "One short word", "Your birth year only"],
        correctIndex: 1,
        explanation: "The passage says strong passwords use letters, numbers, and symbols.",
      },
      {
        question: "What should you do if a message asks for personal information?",
        options: ["Reply right away", "Stop and check if it is real", "Share your password", "Delete every app"],
        correctIndex: 1,
        explanation: "It says to stop and verify the message first.",
      },
    ],
  },
  {
    id: "sentence-10",
    category: "sentences",
    title: "Planning time with others",
    topic: "Social Life",
    passage:
      "Making plans with family and friends is easier when you confirm the details. Agree on the date, time, and place. If your plans change, send a message as soon as possible. Being on time shows respect. Clear communication helps everyone feel included and valued.",
    questions: [
      {
        question: "What details should people confirm when making plans?",
        options: ["Date, time, and place", "Only the weather", "Nothing important", "Phone battery level"],
        correctIndex: 0,
        explanation: "The passage says to agree on the date, time, and place.",
      },
      {
        question: "Why should you send a message if plans change?",
        options: ["To confuse people", "To keep communication clear", "To cancel every time", "To avoid meeting"],
        correctIndex: 1,
        explanation: "The passage emphasizes clear communication and respect for others.",
      },
    ],
  },
  {
    id: "sentence-11",
    category: "sentences",
    title: "Reading a restaurant menu",
    topic: "Dining",
    passage:
      "Before you order, read the menu slowly. Check the item description to learn what ingredients are included. If you have a food allergy, tell the server before ordering. Look at the price and ask about extra charges, such as adding toppings. Choosing carefully helps you stay safe and within your budget.",
    questions: [
      {
        question: "What should you do if you have a food allergy?",
        options: ["Order quickly", "Tell the server before ordering", "Avoid reading the menu", "Skip all meals"],
        correctIndex: 1,
        explanation: "The passage says to tell the server about allergies before ordering.",
      },
      {
        question: "Why should you check prices and extra charges?",
        options: ["To spend more money", "To stay within your budget", "To avoid eating", "To get free food"],
        correctIndex: 1,
        explanation: "It says checking prices helps you stay within budget.",
      },
    ],
  },
  {
    id: "sentence-12",
    category: "sentences",
    title: "What to do in an emergency",
    topic: "Emergencies",
    passage:
      "In an emergency, stay calm and call 911. Speak clearly and give your exact address first. Explain what happened and if someone is hurt. Follow the operator's instructions until help arrives. If the area is unsafe, move to a safer place if you can do so quickly.",
    questions: [
      {
        question: "What is one of the first things you should say on a 911 call?",
        options: ["Your favorite color", "Your exact address", "Your work schedule", "A long story"],
        correctIndex: 1,
        explanation: "The passage says to give your exact address first.",
      },
      {
        question: "What should you do while waiting for help?",
        options: ["Hang up immediately", "Follow the operator's instructions", "Leave without warning", "Ignore safety"],
        correctIndex: 1,
        explanation: "It says to follow instructions until help arrives.",
      },
    ],
  },
  {
    id: "sentence-13",
    category: "sentences",
    title: "Using community services",
    topic: "Community",
    passage:
      "Community centers often offer classes, job support, and food resources. Read flyers and signs to learn dates and times. Bring any required documents, such as ID or proof of address. If you are unsure about a service, ask staff to explain the steps. Community programs can help families meet daily needs.",
    questions: [
      {
        question: "What can help you learn when services are available?",
        options: ["Ignoring signs", "Reading flyers and signs", "Waiting at home", "Calling random numbers"],
        correctIndex: 1,
        explanation: "The passage says to read flyers and signs for dates and times.",
      },
      {
        question: "What should you do if you do not understand a service?",
        options: ["Leave immediately", "Ask staff to explain the steps", "Guess the process", "Bring no documents"],
        correctIndex: 1,
        explanation: "The passage says to ask staff for an explanation if unsure.",
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
  {
    id: "real-world-6",
    category: "real-world",
    topic: "Finance",
    title: "Reading a monthly bank statement",
    documentType: "Bank Account Statement",
    content: `RIVER BANK
Monthly Checking Statement

Account Holder: __________________
Statement Period: 02/01/2026 - 02/28/2026

Beginning Balance: $1,242.18
Deposits:          $1,180.00
Withdrawals:       $   924.55
Service Fee:       $    10.00
Ending Balance:    $1,487.63

Important:
Review all transactions.
Report any errors within 30 days.`,
    vocabulary: [
      { word: "statement", definition: "A summary of account activity", phonetic: "stayt-ment" },
      { word: "withdrawal", definition: "Money taken out of an account", phonetic: "with-draw-ul" },
      { word: "service fee", definition: "A charge from the bank", phonetic: "sur-vis fee" },
      { word: "ending balance", definition: "Money left at the end of the period", phonetic: "en-ding bal-ance" },
    ],
    questions: [
      {
        question: "What is the ending balance on this statement?",
        options: ["$1,242.18", "$924.55", "$1,487.63", "$10.00"],
        correctIndex: 2,
        explanation: "The statement lists the ending balance as $1,487.63.",
      },
      {
        question: "How long do you have to report an error?",
        options: ["7 days", "30 days", "60 days", "No limit"],
        correctIndex: 1,
        explanation: "The statement says to report errors within 30 days.",
      },
    ],
  },
  {
    id: "real-world-7",
    category: "real-world",
    topic: "Medical",
    title: "After-visit instructions",
    documentType: "Clinic Visit Summary",
    content: `NORTHSIDE FAMILY CLINIC
After-Visit Summary

Patient: __________________
Date: __________________

Diagnosis: High blood pressure
Medication: Lisinopril 10 mg
Directions: Take 1 tablet once daily with water.

Follow-up appointment: 04/20/2026 at 10:30 AM
Call clinic if you have:
- severe dizziness
- chest pain
- trouble breathing

Clinic Phone: 555-0142`,
    vocabulary: [
      { word: "diagnosis", definition: "The health problem identified by the doctor", phonetic: "dy-ag-no-sis" },
      { word: "directions", definition: "Instructions for how to use medicine", phonetic: "di-rek-shuns" },
      { word: "follow-up", definition: "A later visit to check progress", phonetic: "fol-oh-up" },
      { word: "severe", definition: "Very serious or strong", phonetic: "suh-veer" },
    ],
    questions: [
      {
        question: "How often should the medicine be taken?",
        options: ["Twice daily", "Once daily", "Only at night", "Only when in pain"],
        correctIndex: 1,
        explanation: "The directions say take 1 tablet once daily.",
      },
      {
        question: "Which symptom should prompt a call to the clinic?",
        options: ["Mild hunger", "Severe dizziness", "Needing groceries", "Sleepiness after work"],
        correctIndex: 1,
        explanation: "The summary says to call if you have severe dizziness.",
      },
    ],
  },
  {
    id: "real-world-8",
    category: "real-world",
    topic: "Housing",
    title: "Maintenance request form",
    documentType: "Apartment Maintenance Request",
    content: `GREENVIEW APARTMENTS
Maintenance Request Form

Tenant Name: __________________
Unit Number: __________________
Date Reported: __________________

Issue Type:  Plumbing / Electrical / Heating / Other
Describe the problem:
_____________________________________

When did it start?
_____________________________________

Entry Permission:
[] Staff may enter if tenant is not home
[] Call tenant before entering

Office Phone: 555-0188`,
    vocabulary: [
      { word: "maintenance", definition: "Repairs and upkeep for a building", phonetic: "main-tuh-nuns" },
      { word: "plumbing", definition: "Pipes and water systems", phonetic: "plum-ing" },
      { word: "electrical", definition: "Related to power and wiring", phonetic: "ih-lek-trih-kul" },
      { word: "permission", definition: "Approval to do something", phonetic: "per-mish-un" },
    ],
    questions: [
      {
        question: "What should you include on this form?",
        options: ["The problem description", "Your favorite song", "Bank password", "Nothing specific"],
        correctIndex: 0,
        explanation: "The form asks you to describe the problem and when it started.",
      },
      {
        question: "What does entry permission section control?",
        options: ["How much rent costs", "Whether staff can enter the unit", "Your lease length", "Your move-out date"],
        correctIndex: 1,
        explanation: "It states whether maintenance staff may enter the apartment.",
      },
    ],
  },
  {
    id: "real-world-9",
    category: "real-world",
    topic: "Technology",
    title: "Account security alert",
    documentType: "Email Security Notice",
    content: `SECUREMAIL
Account Security Alert

We noticed a sign-in attempt from a new device.

Date/Time: 03/30/2026 8:14 PM
Location: Phoenix, AZ
Device: Chrome on Windows

If this was you, no action is needed.
If this was NOT you:
1) Change your password now
2) Turn on two-step verification
3) Review recent account activity

Support: help.securemail.com`,
    vocabulary: [
      { word: "attempt", definition: "An action someone tries to do", phonetic: "uh-tempt" },
      { word: "device", definition: "A phone, tablet, or computer", phonetic: "dih-vys" },
      { word: "verification", definition: "Extra step to confirm identity", phonetic: "vair-uh-fuh-kay-shun" },
      { word: "activity", definition: "Recent actions done in an account", phonetic: "ak-tiv-ih-tee" },
    ],
    questions: [
      {
        question: "What should you do first if the sign-in was not you?",
        options: ["Ignore the message", "Change your password now", "Delete your phone", "Post online"],
        correctIndex: 1,
        explanation: "The notice says to change your password immediately.",
      },
      {
        question: "What is two-step verification for?",
        options: ["Faster typing", "Extra identity protection", "More storage", "Lower internet cost"],
        correctIndex: 1,
        explanation: "Two-step verification adds another layer of security.",
      },
    ],
  },
  {
    id: "real-world-10",
    category: "real-world",
    topic: "Social Life",
    title: "Community event flyer",
    documentType: "Neighborhood Event Flyer",
    content: `WEST RIDGE COMMUNITY CENTER
Family Game Night

Date: Friday, April 12
Time: 6:00 PM - 8:00 PM
Location: 200 Maple Street

Free event for all ages.
Snacks and water provided.

Please register by Wednesday:
Call 555-0130 or visit westridgecc.org

Need help getting there?
Bus Route 7 stops across the street.`,
    vocabulary: [
      { word: "register", definition: "To sign up in advance", phonetic: "rej-uh-stur" },
      { word: "provided", definition: "Given or supplied", phonetic: "pruh-vy-ded" },
      { word: "location", definition: "Place where something happens", phonetic: "loh-kay-shun" },
      { word: "route", definition: "Path a bus or vehicle follows", phonetic: "root" },
    ],
    questions: [
      {
        question: "When does the event take place?",
        options: ["Friday, April 12", "Monday morning", "Saturday at noon", "No date listed"],
        correctIndex: 0,
        explanation: "The flyer lists Friday, April 12.",
      },
      {
        question: "How can someone register?",
        options: ["Only by mail", "Call or visit the website", "At midnight only", "No registration allowed"],
        correctIndex: 1,
        explanation: "It says to call 555-0130 or visit westridgecc.org.",
      },
    ],
  },
  {
    id: "real-world-11",
    category: "real-world",
    topic: "Dining",
    title: "Reading a takeout menu",
    documentType: "Restaurant Takeout Menu",
    content: `LAKESIDE KITCHEN - TAKEOUT MENU

Chicken Soup .......... $6.50
Veggie Wrap ........... $8.25
Grilled Fish Plate .... $12.00
Rice Bowl ............. $9.00

Add-ons:
Extra avocado ......... $1.50
Extra sauce ........... $0.75

Allergy Notice:
Please tell staff about food allergies before ordering.

Pickup Orders: 555-0174`,
    vocabulary: [
      { word: "takeout", definition: "Food you order to eat elsewhere", phonetic: "tayk-out" },
      { word: "add-on", definition: "Extra item added to an order", phonetic: "ad-on" },
      { word: "allergy", definition: "Bad body reaction to certain foods", phonetic: "al-er-jee" },
      { word: "pickup", definition: "Getting your order in person", phonetic: "pik-up" },
    ],
    questions: [
      {
        question: "What should a customer do before ordering with allergies?",
        options: ["Stay silent", "Tell staff about allergies", "Order random food", "Only drink water"],
        correctIndex: 1,
        explanation: "The menu says to tell staff about food allergies before ordering.",
      },
      {
        question: "How much is the veggie wrap?",
        options: ["$6.50", "$8.25", "$9.00", "$12.00"],
        correctIndex: 1,
        explanation: "The menu lists veggie wrap at $8.25.",
      },
    ],
  },
  {
    id: "real-world-12",
    category: "real-world",
    topic: "Emergencies",
    title: "Emergency shelter notice",
    documentType: "City Emergency Alert",
    content: `CITY OF NORTH VALLEY
Emergency Weather Alert

Severe storm expected tonight after 9 PM.

Safety Steps:
1) Charge your phone
2) Keep medicines and ID ready
3) Move to safe shelter if instructed

Emergency Shelter Open:
Lincoln High School Gym
Open: 7 PM - 8 AM

For urgent help call 911
For non-urgent info call 311`,
    vocabulary: [
      { word: "severe", definition: "Very serious or dangerous", phonetic: "suh-veer" },
      { word: "shelter", definition: "A safe place during danger", phonetic: "shel-ter" },
      { word: "urgent", definition: "Needs immediate action", phonetic: "ur-jent" },
      { word: "non-urgent", definition: "Important but not immediate emergency", phonetic: "non-ur-jent" },
    ],
    questions: [
      {
        question: "Where is the emergency shelter located?",
        options: ["City Hall", "Lincoln High School Gym", "Downtown Library", "River Park"],
        correctIndex: 1,
        explanation: "The notice says the shelter is at Lincoln High School Gym.",
      },
      {
        question: "Which number should you call for urgent help?",
        options: ["311", "411", "911", "211"],
        correctIndex: 2,
        explanation: "The notice says urgent help is 911.",
      },
    ],
  },
  {
    id: "real-world-13",
    category: "real-world",
    topic: "Community",
    title: "Bus schedule and route map",
    documentType: "Public Transit Schedule",
    content: `CITY TRANSIT - ROUTE 7

Weekday Departures (Main St Stop):
6:30 AM
7:00 AM
7:30 AM
8:00 AM

Evening Departures:
5:30 PM
6:00 PM
6:30 PM

Fare:
Adult $2.00 each ride
Reduced fare with approved pass

Need trip help? Call 555-0111`,
    vocabulary: [
      { word: "departure", definition: "Time when the bus leaves", phonetic: "dih-par-chur" },
      { word: "fare", definition: "Cost of a ride", phonetic: "fair" },
      { word: "reduced", definition: "Lower than normal amount", phonetic: "rih-doost" },
      { word: "pass", definition: "Card or ticket for transit use", phonetic: "pas" },
    ],
    questions: [
      {
        question: "What is the weekday departure after 7:00 AM?",
        options: ["6:30 AM", "7:30 AM", "5:30 PM", "8:30 AM"],
        correctIndex: 1,
        explanation: "The next listed departure after 7:00 AM is 7:30 AM.",
      },
      {
        question: "What is the regular adult fare per ride?",
        options: ["$1.00", "$1.50", "$2.00", "$2.50"],
        correctIndex: 2,
        explanation: "The schedule lists adult fare as $2.00 each ride.",
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

export function getLessonsByCategoryAndContext(category: string, context: PracticeContext): Lesson[] {
  const aliases = LEGACY_TOPIC_ALIASES_BY_CONTEXT[context] ?? [];
  return allLessons.filter((l) => l.category === category && aliases.includes(l.topic));
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
