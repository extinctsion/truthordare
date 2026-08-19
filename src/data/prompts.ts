import { Prompt, SpecialPrompt } from '../types/game';

export const PROMPTS: Prompt[] = [
  // FRIENDS - TRUTHS
  {
    id: 'f_t_1',
    categoryId: 'friends',
    type: 'truth',
    text: 'What is your most embarrassing moment in high school?',
  },
  {
    id: 'f_t_2',
    categoryId: 'friends',
    type: 'truth',
    text: 'What is the dumbest lie you ever told your parents?',
  },
  {
    id: 'f_t_3',
    categoryId: 'friends',
    type: 'truth',
    text: 'If you had to trade lives with anyone in this room for a week, who would it be?',
  },
  {
    id: 'f_t_4',
    categoryId: 'friends',
    type: 'truth',
    text: 'What is a secret talent or weird habit you have never told anyone here?',
  },
  {
    id: 'f_t_5',
    categoryId: 'friends',
    type: 'truth',
    text: 'Have you ever stalked an ex on social media in the last month?',
  },
  {
    id: 'f_t_6',
    categoryId: 'friends',
    type: 'truth',
    text: 'What is the most ridiculous purchase you have ever made?',
  },
  {
    id: 'f_t_7',
    categoryId: 'friends',
    type: 'truth',
    text: 'Who in this room would survive the longest in a zombie apocalypse?',
  },

  // FRIENDS - DARES
  {
    id: 'f_d_1',
    categoryId: 'friends',
    type: 'dare',
    text: 'Let the challenger post anything they want on your social media story.',
  },
  {
    id: 'f_d_2',
    categoryId: 'friends',
    type: 'dare',
    text: 'Do your best impression of someone in this room until someone guesses who it is.',
  },
  {
    id: 'f_d_3',
    categoryId: 'friends',
    type: 'dare',
    text: 'Call a random contact and sing Happy Birthday to them passionately.',
  },
  {
    id: 'f_d_4',
    categoryId: 'friends',
    type: 'dare',
    text: 'Speak in a dramatic opera voice for the next two rounds.',
  },
  {
    id: 'f_d_5',
    categoryId: 'friends',
    type: 'dare',
    text: 'Let the challenger re-style your hair however they want.',
  },
  {
    id: 'f_d_6',
    categoryId: 'friends',
    type: 'dare',
    text: 'Do 15 rapid push-ups while chanting your own name.',
  },

  // COUPLES - TRUTHS
  {
    id: 'c_t_1',
    categoryId: 'couples',
    type: 'truth',
    text: 'What was your very first impression of your current or last crush?',
  },
  {
    id: 'c_t_2',
    categoryId: 'couples',
    type: 'truth',
    text: 'What is one thing that instantly turns you on in a relationship?',
  },
  {
    id: 'c_t_3',
    categoryId: 'couples',
    type: 'truth',
    text: 'What is the most romantic date you have ever fantasized about?',
  },
  {
    id: 'c_t_4',
    categoryId: 'couples',
    type: 'truth',
    text: 'Have you ever had a crush on a friend’s partner?',
  },
  {
    id: 'c_t_5',
    categoryId: 'couples',
    type: 'truth',
    text: 'What is your biggest relationship fear?',
  },

  // COUPLES - DARES
  {
    id: 'c_d_1',
    categoryId: 'couples',
    type: 'dare',
    text: 'Slow dance with the challenger to an imaginary romance song for 30 seconds.',
  },
  {
    id: 'c_d_2',
    categoryId: 'couples',
    type: 'dare',
    text: 'Whisper your favorite compliment into the challenger’s ear in a dramatic voice.',
  },
  {
    id: 'c_d_3',
    categoryId: 'couples',
    type: 'dare',
    text: 'Hold hands with the player to your right for the next 3 rounds.',
  },
  {
    id: 'c_d_4',
    categoryId: 'couples',
    type: 'dare',
    text: 'Give a 60-second romantic speech dedicated to an object in the room.',
  },

  // PARTY - TRUTHS
  {
    id: 'p_t_1',
    categoryId: 'party',
    type: 'truth',
    text: 'What is the wild form of party chaos you’ve personally witnessed?',
  },
  {
    id: 'p_t_2',
    categoryId: 'party',
    type: 'truth',
    text: 'Who in this room is most likely to get arrested on a night out?',
  },
  {
    id: 'p_t_3',
    categoryId: 'party',
    type: 'truth',
    text: 'What is the worst text message you sent while intoxicated or hyper?',
  },
  {
    id: 'p_t_4',
    categoryId: 'party',
    type: 'truth',
    text: 'Have you ever snuck into a VIP area or event without permission?',
  },

  // PARTY - DARES
  {
    id: 'p_d_1',
    categoryId: 'party',
    type: 'dare',
    text: 'Attempt a 20-second freestyle rap about the person across from you.',
  },
  {
    id: 'p_d_2',
    categoryId: 'party',
    type: 'dare',
    text: 'Do a moonwalk or dramatic dance across the entire room.',
  },
  {
    id: 'p_d_3',
    categoryId: 'party',
    type: 'dare',
    text: 'Let the challenger invent a silly nickname that everyone must call you for the rest of the game.',
  },
  {
    id: 'p_d_4',
    categoryId: 'party',
    type: 'dare',
    text: 'Chug a glass of water without using your hands.',
  },

  // DEEP - TRUTHS
  {
    id: 'd_t_1',
    categoryId: 'deep',
    type: 'truth',
    text: 'What is a life lesson you had to learn the hard way?',
  },
  {
    id: 'd_t_2',
    categoryId: 'deep',
    type: 'truth',
    text: 'What is a belief you held deeply five years ago that you no longer believe?',
  },
  {
    id: 'd_t_3',
    categoryId: 'deep',
    type: 'truth',
    text: 'What is your biggest unfulfilled dream right now?',
  },
  {
    id: 'd_t_4',
    categoryId: 'deep',
    type: 'truth',
    text: 'What is something you forgive yourself for, even if it took years?',
  },

  // DEEP - DARES
  {
    id: 'd_d_1',
    categoryId: 'deep',
    type: 'dare',
    text: 'Look into the challenger’s eyes silently for 45 full seconds without speaking or laughing.',
  },
  {
    id: 'd_d_2',
    categoryId: 'deep',
    type: 'dare',
    text: 'Share one genuine, heart-felt compliment about every single player present.',
  },
  {
    id: 'd_d_3',
    categoryId: 'deep',
    type: 'dare',
    text: 'Tell the story of the moment you felt most proud of yourself.',
  },

  // SPICY - TRUTHS
  {
    id: 's_t_1',
    categoryId: 'spicy',
    type: 'truth',
    text: 'What is your spiciest secret fantasy that you’ve never admitted aloud?',
  },
  {
    id: 's_t_2',
    categoryId: 'spicy',
    type: 'truth',
    text: 'Who in this room would you pick for a secret midnight rendezvous?',
  },
  {
    id: 's_t_3',
    categoryId: 'spicy',
    type: 'truth',
    text: 'What is the boldest text message in your recent chat history?',
  },
  {
    id: 's_t_4',
    categoryId: 'spicy',
    type: 'truth',
    text: 'Have you ever had spicy thoughts about someone currently sitting in this room?',
  },

  // SPICY - DARES
  {
    id: 's_d_1',
    categoryId: 'spicy',
    type: 'dare',
    text: 'Whisper a seductive secret into the challenger’s ear.',
  },
  {
    id: 's_d_2',
    categoryId: 'spicy',
    type: 'dare',
    text: 'Give the challenger a 30-second back rub or shoulder massage.',
  },
  {
    id: 's_d_3',
    categoryId: 'spicy',
    type: 'dare',
    text: 'Do a seductive runway walk across the room and end with a dramatic pose.',
  },
  {
    id: 's_d_4',
    categoryId: 'spicy',
    type: 'dare',
    text: 'Let the challenger send a flirty emoji to the 3rd person in your DM list.',
  },
];

export const SPECIAL_PROMPTS: SpecialPrompt[] = [
  {
    id: 'sp_1',
    type: 'double_dare',
    title: 'DOUBLE DARE!',
    categoryTitle: 'CHAOS ROUND',
    prompt: 'You must do 20 jumping jacks AND let the challenger pick a funny filter to take a photo of you!',
    points: 40,
  },
  {
    id: 'sp_2',
    type: 'duo_challenge',
    title: 'DOUBLE DARE!',
    categoryTitle: 'DUO CHALLENGE 🤝',
    prompt: 'Both players must complete 10 squats while looking deep into each other\'s eyes!',
    points: 40,
  },
  {
    id: 'sp_3',
    type: 'revenge',
    title: 'REVENGE ROUND!',
    categoryTitle: 'REVENGE ⚔️',
    prompt: 'The challenger must complete a dare chosen directly by the target player!',
    points: 40,
  },
  {
    id: 'sp_4',
    type: 'chaos',
    title: 'CHAOS ROUND!',
    categoryTitle: 'TOTAL MADNESS ⚡',
    prompt: 'Everyone in the room must speak in accents for the next 2 full rounds!',
    points: 40,
  },
];
