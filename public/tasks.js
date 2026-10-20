// Verden English Advent Calendar — content for 30 days (A2 level).
// In every item the FIRST option is the correct one; options are shuffled on screen.
// Days rotate through five task types: meaning → blanks → phrases → listening → quiz.

const MEANING = [
  {
    title: "Winter words",
    items: [
      { word: "snowflake", hint: "noun", options: ["a small piece of frozen water that falls from the sky", "a warm hat for cold days", "a game children play on ice"] },
      { word: "freezing", hint: "adjective", options: ["very, very cold", "a little bit wet", "bright and sunny"] },
      { word: "scarf", hint: "noun", options: ["a long piece of cloth you wear around your neck", "a shoe for snow", "a hot winter drink"] },
      { word: "slippery", hint: "adjective", options: ["easy to fall on because it is wet or icy", "very soft and warm", "full of small holes"] },
      { word: "fireplace", hint: "noun", options: ["a place in a room where you can make a fire", "a shop that sells wood", "a window in the roof"] },
    ],
  },
  {
    title: "Home and family",
    items: [
      { word: "nephew", hint: "noun", options: ["the son of your brother or sister", "your father's father", "the daughter of your aunt"] },
      { word: "cosy", hint: "adjective", options: ["warm, comfortable and nice", "big and empty", "old and broken"] },
      { word: "tidy", hint: "verb", options: ["to put things in the right place", "to cook food slowly", "to paint a wall"] },
      { word: "neighbour", hint: "noun", options: ["a person who lives near you", "a person who works in a hotel", "a person who drives a bus"] },
      { word: "stairs", hint: "noun", options: ["steps that take you up or down in a building", "a cupboard for plates", "the floor of a garden"] },
    ],
  },
  {
    title: "Food and cooking",
    items: [
      { word: "bake", hint: "verb", options: ["to cook bread or cake in an oven", "to wash vegetables in cold water", "to cut meat into small pieces"] },
      { word: "spicy", hint: "adjective", options: ["with a strong, hot taste, like chilli", "with no taste at all", "very sweet, like sugar"] },
      { word: "recipe", hint: "noun", options: ["instructions that tell you how to cook something", "a bill you pay in a restaurant", "a big plate for soup"] },
      { word: "leftovers", hint: "noun", options: ["food that is not eaten and you keep for later", "food you buy at the market", "the first dish of a meal"] },
      { word: "starving", hint: "adjective", options: ["very hungry", "very full", "very tired"] },
    ],
  },
  {
    title: "Travel",
    items: [
      { word: "luggage", hint: "noun", options: ["the bags and suitcases you take on a trip", "a ticket for a train", "a map of a city"] },
      { word: "delayed", hint: "adjective", options: ["late, not at the planned time", "cancelled forever", "very fast"] },
      { word: "sightseeing", hint: "noun", options: ["visiting interesting places as a tourist", "sleeping on a long flight", "shopping for food"] },
      { word: "abroad", hint: "adverb", options: ["in or to a different country", "at home with your family", "under the ground"] },
      { word: "book", hint: "verb", options: ["to reserve a room, a table or a ticket", "to read a story", "to close a door"] },
    ],
  },
  {
    title: "Feelings",
    items: [
      { word: "excited", hint: "adjective", options: ["very happy because something good is going to happen", "sad because you are alone", "angry about a mistake"] },
      { word: "nervous", hint: "adjective", options: ["a little afraid or worried", "calm and relaxed", "very sleepy"] },
      { word: "proud", hint: "adjective", options: ["happy about something you or another person did well", "sorry about something bad", "bored with your work"] },
      { word: "homesick", hint: "adjective", options: ["sad because you are far from home", "ill because of bad food", "happy to be at a new place"] },
      { word: "grateful", hint: "adjective", options: ["thankful for something", "jealous of somebody", "confused about something"] },
    ],
  },
  {
    title: "Celebrations",
    items: [
      { word: "wrap", hint: "verb", options: ["to cover a present with paper", "to open a big box", "to send a letter"] },
      { word: "fireworks", hint: "noun", options: ["colourful lights that explode in the night sky", "small candles on a cake", "lamps on a street"] },
      { word: "decorate", hint: "verb", options: ["to make something look nice for a special day", "to clean the kitchen", "to buy food for a party"] },
      { word: "guest", hint: "noun", options: ["a person you invite to your home or party", "a person who sells presents", "a person who cooks in a restaurant"] },
      { word: "wish", hint: "noun", options: ["something you hope will happen", "something you must do today", "something you forgot"] },
    ],
  },
];

const BLANKS = [
  {
    title: "My winter morning",
    note: "Present Simple",
    bank: ["get", "has", "walks", "drink", "starts", "sleeps"],
    items: [
      { text: "I ___ up at seven o'clock every day.", answer: "get" },
      { text: "My sister ___ breakfast at eight.", answer: "has" },
      { text: "We always ___ hot tea in winter.", answer: "drink" },
      { text: "Tom ___ to school because it is near.", answer: "walks" },
      { text: "The first lesson ___ at nine.", answer: "starts" },
    ],
  },
  {
    title: "Last weekend",
    note: "Past Simple",
    bank: ["went", "saw", "made", "bought", "was", "goes"],
    items: [
      { text: "Last Saturday we ___ to the city centre.", answer: "went" },
      { text: "I ___ a new pair of gloves.", answer: "bought" },
      { text: "We ___ a big Christmas tree in the square.", answer: "saw" },
      { text: "The weather ___ cold but sunny.", answer: "was" },
      { text: "In the evening my mum ___ hot chocolate.", answer: "made" },
    ],
  },
  {
    title: "Where is the cat?",
    note: "Prepositions of place",
    bank: ["under", "on", "next to", "behind", "in", "at"],
    items: [
      { text: "The cat is sleeping ___ the sofa, on the soft cushion.", answer: "on" },
      { text: "The presents are ___ the tree, on the floor.", answer: "under" },
      { text: "The milk is ___ the fridge.", answer: "in" },
      { text: "The lamp is ___ the bed, very close to it.", answer: "next to" },
      { text: "The dog is hiding ___ the door. I can't see it!", answer: "behind" },
    ],
  },
  {
    title: "Colder and colder",
    note: "Comparatives",
    bank: ["colder", "bigger", "better", "more expensive", "warmer", "good"],
    items: [
      { text: "January is ___ than October.", answer: "colder" },
      { text: "A house is ___ than a flat.", answer: "bigger" },
      { text: "A plane ticket is ___ than a bus ticket.", answer: "more expensive" },
      { text: "My English is ___ now than last year.", answer: "better" },
      { text: "Wool socks are ___ than cotton socks.", answer: "warmer" },
    ],
  },
  {
    title: "Holiday plans",
    note: "going to",
    bank: ["am", "is", "are", "going", "visit", "be"],
    items: [
      { text: "I ___ going to visit my grandma.", answer: "am" },
      { text: "My brother ___ going to cook dinner.", answer: "is" },
      { text: "We are ___ to watch a film tonight.", answer: "going" },
      { text: "They ___ going to travel by train.", answer: "are" },
      { text: "Are you going to ___ the museum?", answer: "visit" },
    ],
  },
  {
    title: "At the party",
    note: "There is / There are, some / any",
    bank: ["is", "are", "some", "any", "isn't", "have"],
    items: [
      { text: "There ___ a big cake on the table.", answer: "is" },
      { text: "There ___ twenty guests in the room.", answer: "are" },
      { text: "Would you like ___ juice?", answer: "some" },
      { text: "Sorry, we don't have ___ milk.", answer: "any" },
      { text: "There ___ any music. Let's put some on!", answer: "isn't" },
    ],
  },
];

const PHRASES = [
  {
    title: "Hello and goodbye",
    pairs: [
      ["How's it going?", "How are you?"],
      ["Nice to meet you.", "I'm happy to know you (first time)."],
      ["See you later!", "Goodbye, I'll see you again soon."],
      ["Long time no see!", "We haven't met for a long time."],
      ["Take care!", "Be safe and well (when you say goodbye)."],
    ],
  },
  {
    title: "Shopping",
    pairs: [
      ["How much is it?", "What is the price?"],
      ["Can I try it on?", "I want to wear it in the shop before I buy it."],
      ["I'm just looking.", "I don't need help right now."],
      ["Do you take cards?", "Can I pay with a bank card?"],
      ["It's on sale.", "It is cheaper than usual."],
    ],
  },
  {
    title: "At the café",
    pairs: [
      ["Can I have the menu, please?", "I want to see the list of food and drinks."],
      ["I'd like a cappuccino.", "Please bring me a cappuccino."],
      ["For here or to go?", "Will you eat in the café or take it away?"],
      ["Could we have the bill?", "We want to pay now."],
      ["Keep the change.", "You can keep the extra money."],
    ],
  },
  {
    title: "Finding your way",
    pairs: [
      ["Excuse me, where's the station?", "A polite question to find a place."],
      ["Go straight on.", "Don't turn, continue forward."],
      ["Turn left at the corner.", "Go to the left where two streets meet."],
      ["It's just around the corner.", "It's very close."],
      ["You can't miss it.", "It's very easy to see."],
    ],
  },
  {
    title: "Everyday phrasal verbs",
    pairs: [
      ["wake up", "stop sleeping"],
      ["put on", "start wearing clothes"],
      ["turn off", "stop a light or a machine"],
      ["look for", "try to find"],
      ["give up", "stop trying"],
    ],
  },
  {
    title: "Holiday wishes",
    pairs: [
      ["Merry Christmas!", "A greeting for the 25th of December."],
      ["Happy New Year!", "A greeting for the 1st of January."],
      ["All the best!", "I wish you good things."],
      ["Cheers!", "What we say when we lift our glasses."],
      ["Make a wish!", "Think of something you want to happen."],
    ],
  },
];

const LISTENING = [
  {
    title: "A snowy day",
    text:
      "Hi, I'm Anna. Today it is snowing in my town. I can see white roofs from my window. " +
      "After breakfast I'm going to the park with my little brother, Max. We want to build a big snowman. " +
      "Max has a red hat, and he wants to put it on the snowman. Then we are going to drink hot chocolate at home.",
    questions: [
      { q: "What is the weather like today?", options: ["It is snowing.", "It is raining.", "It is sunny and warm."] },
      { q: "Who is Max?", options: ["Anna's little brother", "Anna's friend from school", "Anna's dog"] },
      { q: "What are they going to drink?", options: ["hot chocolate", "orange juice", "green tea"] },
    ],
  },
  {
    title: "At the train station",
    text:
      "Attention, please. The ten fifteen train to Manchester is delayed by twenty minutes. " +
      "It will now leave at ten thirty-five from platform four. " +
      "Passengers for London, please go to platform two. Your train is on time. " +
      "We are sorry for the delay. Thank you.",
    questions: [
      { q: "Where does the delayed train go?", options: ["to Manchester", "to London", "to Liverpool"] },
      { q: "When does it leave now?", options: ["at 10:35", "at 10:15", "at 10:20"] },
      { q: "Which platform is the London train on?", options: ["platform two", "platform four", "platform ten"] },
    ],
  },
  {
    title: "Buying a present",
    text:
      "Shop assistant: Good afternoon. Can I help you? " +
      "Customer: Yes, please. I'm looking for a present for my dad. He loves reading. " +
      "Shop assistant: How about this book about mountains? It's very popular. " +
      "Customer: That's nice. How much is it? " +
      "Shop assistant: It's fifteen pounds. " +
      "Customer: Great, I'll take it. Can you wrap it, please?",
    questions: [
      { q: "Who is the present for?", options: ["the customer's dad", "the customer's sister", "the shop assistant"] },
      { q: "What is the book about?", options: ["mountains", "cooking", "football"] },
      { q: "How much is the book?", options: ["fifteen pounds", "fifty pounds", "five pounds"] },
    ],
  },
  {
    title: "My best friend",
    text:
      "My best friend is called Leo. He is twelve years old, one year older than me. " +
      "He has short dark hair and he is very tall. Leo is funny and kind. " +
      "We play basketball together every Tuesday and Friday. " +
      "In the summer his family moved to a new flat, but it's still near my house.",
    questions: [
      { q: "How old is the speaker?", options: ["eleven", "twelve", "thirteen"] },
      { q: "When do they play basketball?", options: ["on Tuesdays and Fridays", "on Mondays and Thursdays", "every day"] },
      { q: "What did Leo's family do in the summer?", options: ["They moved to a new flat.", "They went to another country.", "They bought a dog."] },
    ],
  },
  {
    title: "A phone message",
    text:
      "Hi Kate, it's Sarah. I'm calling about the party on Saturday. " +
      "It starts at seven, not at six. Can you bring some salad? I've got enough cake. " +
      "Oh, and my new address is twenty-two Park Road. " +
      "Call me back if you have any questions. Bye!",
    questions: [
      { q: "What time does the party start?", options: ["at seven", "at six", "at eight"] },
      { q: "What should Kate bring?", options: ["some salad", "a cake", "some music"] },
      { q: "What is Sarah's new address?", options: ["22 Park Road", "20 Park Road", "22 Park Street"] },
    ],
  },
  {
    title: "New Year in my family",
    text:
      "In my family, New Year is more important than Christmas. " +
      "On the thirty-first of December we cook a big dinner together. My grandmother always makes her special fish soup. " +
      "At midnight we open the window and listen to the bells. " +
      "Then we go outside and watch the fireworks. We go to bed very late, at about three o'clock.",
    questions: [
      { q: "Which holiday is more important for this family?", options: ["New Year", "Christmas", "Easter"] },
      { q: "What does the grandmother make?", options: ["fish soup", "a chocolate cake", "pancakes"] },
      { q: "When do they go to bed?", options: ["at about three o'clock", "at midnight", "at about ten o'clock"] },
    ],
  },
];

const QUIZ = [
  {
    title: "To be and to have",
    questions: [
      { q: "My parents ___ teachers.", options: ["are", "is", "am"] },
      { q: "She ___ two cats and a dog.", options: ["has", "have", "is"] },
      { q: "___ you from Spain?", options: ["Are", "Is", "Do"] },
      { q: "I ___ hungry. Let's eat!", options: ["am", "is", "have"] },
      { q: "We ___ got a car.", options: ["haven't", "hasn't", "aren't"] },
    ],
  },
  {
    title: "Questions and negatives",
    questions: [
      { q: "___ does your brother work?", options: ["Where", "Who", "Which"] },
      { q: "I ___ like coffee. I prefer tea.", options: ["don't", "doesn't", "not"] },
      { q: "___ she speak French?", options: ["Does", "Do", "Is"] },
      { q: "Did you ___ the film yesterday?", options: ["watch", "watched", "watching"] },
      { q: "He ___ go to school yesterday. He was ill.", options: ["didn't", "doesn't", "wasn't"] },
    ],
  },
  {
    title: "Now or every day?",
    questions: [
      { q: "Look! It ___.", options: ["is snowing", "snows", "snow"] },
      { q: "I usually ___ to work by bus.", options: ["go", "am going", "goes"] },
      { q: "Be quiet, please. The baby ___.", options: ["is sleeping", "sleeps", "sleep"] },
      { q: "She ___ her grandma every Sunday.", options: ["visits", "is visiting", "visit"] },
      { q: "What ___ you doing right now?", options: ["are", "do", "is"] },
    ],
  },
  {
    title: "Can, must, should",
    questions: [
      { q: "You ___ wear a warm coat. It's freezing!", options: ["should", "shouldn't", "can't"] },
      { q: "___ you swim?", options: ["Can", "Must", "Do"] },
      { q: "Students ___ use phones in the exam.", options: ["mustn't", "must", "should"] },
      { q: "I can't ___ to the party, sorry.", options: ["come", "to come", "coming"] },
      { q: "You look tired. You ___ go to bed.", options: ["should", "can't", "mustn't"] },
    ],
  },
  {
    title: "Past Simple",
    questions: [
      { q: "We ___ a great time in Paris last year.", options: ["had", "have", "haved"] },
      { q: "Where ___ you yesterday evening?", options: ["were", "was", "did"] },
      { q: "She ___ me a nice card.", options: ["sent", "sended", "send"] },
      { q: "I ___ my keys this morning.", options: ["lost", "losed", "lose"] },
      { q: "They ___ at home last weekend.", options: ["weren't", "didn't", "wasn't"] },
    ],
  },
  {
    title: "Big review",
    questions: [
      { q: "This is the ___ day of the year!", options: ["happiest", "happier", "most happy"] },
      { q: "How ___ presents did you get?", options: ["many", "much", "lot"] },
      { q: "I'm going ___ my friends tomorrow.", options: ["to meet", "meet", "meeting to"] },
      { q: "She ___ in London since 2020.", options: ["has lived", "lives", "is living"] },
      { q: "Happy New Year! I hope you ___ a wonderful year.", options: ["have", "having", "has"] },
    ],
  },
];

const TYPE_ORDER = ["meaning", "blanks", "phrases", "listening", "quiz"];
const SOURCES = { meaning: MEANING, blanks: BLANKS, phrases: PHRASES, listening: LISTENING, quiz: QUIZ };

export const TYPE_INFO = {
  meaning: { label: "Meanings", instruction: "Choose the correct meaning of each word.", ru: "Выберите правильное значение слова." },
  blanks: { label: "Fill the gaps", instruction: "Tap a word from the box, then tap a gap. One word is extra.", ru: "Заполните пропуски словами из рамки. Одно слово лишнее." },
  phrases: { label: "Phrases", instruction: "Match each phrase with its meaning. Tap a phrase, then tap its meaning.", ru: "Соедините фразу с её значением." },
  listening: { label: "Listening", instruction: "Press play and listen. You can listen many times. Then answer the questions.", ru: "Прослушайте запись и ответьте на вопросы." },
  quiz: { label: "Test", instruction: "Choose the correct answer.", ru: "Выберите правильный ответ." },
};

export const DAYS = Array.from({ length: 30 }, (_, i) => {
  const type = TYPE_ORDER[i % TYPE_ORDER.length];
  const set = SOURCES[type][Math.floor(i / TYPE_ORDER.length)];
  return { day: i + 1, type, ...set };
});
