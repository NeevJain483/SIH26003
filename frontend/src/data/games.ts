export const gameCatalog = [
  {
    id: "memory-sequence",
    title: "Memory Sequence",
    tag: "Recommended",
    description:
      "Remember a small story from home, then place it back in order.",
    icon: "layers",
    color: "coral",
    playable: true,
  },
  {
    id: "sounds-home",
    title: "Sounds of Home",
    tag: "Coming next",
    description:
      "Recognise familiar sounds from festivals, markets and family life.",
    icon: "volume",
    color: "mustard",
    playable: false,
  },
  {
    id: "colours-crafts",
    title: "Colours & Crafts",
    tag: "Coming next",
    description:
      "Match patterns inspired by Muga silk, Dokhona and Naga shawls.",
    icon: "sparkles",
    color: "leaf",
    playable: false,
  },
  {
    id: "places-remember",
    title: "Places I Remember",
    tag: "Coming next",
    description:
      "Recognise beloved places from across the North Eastern Region.",
    icon: "map",
    color: "blue",
    playable: false,
  },
] as const;

export type Game = (typeof gameCatalog)[number];
