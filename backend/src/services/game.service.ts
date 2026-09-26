import { db } from "@mindcare-ner/db";

export const getActiveGames = async () => {
  const games = await db.orm.public.Game.where({
    isActive: true,
  }).all();

  return games.map((game) => ({
    id: game.id,
    name: game.name,
    gameType: game.gameType,
    cognitiveDomain: game.cognitiveDomain,
    difficultyMin: game.difficultyMin,
    difficultyMax: game.difficultyMax,
    languageCode: game.languageCode,
  }));
};
