export type SequenceItem = {
  label: string;
  emoji: string;
};

export type SequenceRound = {
  id: string;
  prompt: string;
  hint: string;
  items: SequenceItem[];
};

export const sequenceRounds: SequenceRound[] = [
  {
    id: "assam",
    prompt: "Trip to Assam",
    hint: "Remember the order of the journey.",
    items: [
      {
        label: "Pack your bag",
        emoji: "🎒",
      },
      {
        label: "Go to the airport",
        emoji: "✈️",
      },
      {
        label: "Take the flight",
        emoji: "🛫",
      },
      {
        label: "Reach Assam",
        emoji: "🏞️",
      },
    ],
  },

  {
    id: "lake",
    prompt: "Visit to the Lake",
    hint: "Remember what happened first.",
    items: [
      {
        label: "Get ready",
        emoji: "👕",
      },
      {
        label: "Leave home",
        emoji: "🚶",
      },
      {
        label: "Reach the lake",
        emoji: "🌊",
      },
      {
        label: "Enjoy the view",
        emoji: "🌅",
      },
    ],
  },

  {
    id: "morning",
    prompt: "Getting Ready",
    hint: "Remember your morning routine.",
    items: [
      {
        label: "Wake up",
        emoji: "🌞",
      },
      {
        label: "Brush your teeth",
        emoji: "🪥",
      },
      {
        label: "Take a bath",
        emoji: "🚿",
      },
      {
        label: "Have breakfast",
        emoji: "🍳",
      },
    ],
  },
];