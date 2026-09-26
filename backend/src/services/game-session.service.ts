import { db } from "@mindcare-ner/db";

interface StartGameSessionInput {
  gameId: string;
  initialDifficulty?: number;
  deviceId?: string;
  moodBefore?: string;
}

interface CompleteGameSessionInput {
  moodAfter?: string;
}

export const startGameSession = async (
  patientId: string,
  input: StartGameSessionInput,
) => {
  const game = await db.orm.public.Game.first({
    id: input.gameId,
    isActive: true,
  });

  if (!game) {
    const error = new Error("Game not found or inactive");
    (error as any).statusCode = 404;
    throw error;
  }

  const difficulty = input.initialDifficulty ?? game.difficultyMin;

  if (difficulty < game.difficultyMin || difficulty > game.difficultyMax) {
    const error = new Error("Invalid difficulty level");
    (error as any).statusCode = 400;
    throw error;
  }

  const session = await db.orm.public.GameSession.create({
    patientId,
    gameId: game.id,
    initialDifficulty: difficulty,
    deviceId: input.deviceId ?? null,
    moodBefore: input.moodBefore ?? null,
    totalQuestions: 0,
    correctAnswers: 0,
    syncStatus: "pending",
  });

  return session;
};

export const completeGameSession = async (
  patientId: string,
  sessionId: string,
  input: CompleteGameSessionInput,
) => {
  const session = await db.orm.public.GameSession.first({
    id: sessionId,
    patientId,
  });

  if (!session) {
    const error = new Error("Game session not found");
    (error as any).statusCode = 404;
    throw error;
  }
  if (session.completedAt) {
    const error = new Error("Game session is already completed");
    (error as any).statusCode = 400;
    throw error;
  }

  const responses = await db.orm.public.GameResponse.where({
    sessionId,
  }).all();

  if (responses.length === 0) {
    const error = new Error("Cannot complete a game session without responses");

    (error as any).statusCode = 400;
    throw error;
  }

  const totalQuestions = responses.length;

  const correctAnswers = responses.filter(
    (response) => response.isCorrect === true,
  ).length;

  const answeredResponses = responses.filter(
    (response) => response.isCorrect !== null,
  );

  const accuracy =
    answeredResponses.length > 0
      ? (correctAnswers / answeredResponses.length) * 100
      : 0;

  const responseTimes = responses
    .map((response) => response.responseTimeMs)
    .filter((time): time is number => time !== null);

  const averageResponseMs =
    responseTimes.length > 0
      ? Math.round(
          responseTimes.reduce((sum, time) => sum + time, 0) /
            responseTimes.length,
        )
      : null;

  const errorRate =
    answeredResponses.length > 0
      ? ((answeredResponses.length - correctAnswers) /
          answeredResponses.length) *
        100
      : 0;

  let finalDifficulty = session.initialDifficulty ?? 1;

  if (accuracy >= 85 && finalDifficulty < 5) {
    finalDifficulty += 1;
  } else if (accuracy < 50 && finalDifficulty > 1) {
    finalDifficulty -= 1;
  }

  const completedSession = await db.orm.public.GameSession.where({
    id: sessionId,
  }).update({
    finalDifficulty,
    totalQuestions,
    correctAnswers,
    averageResponseMs,
    moodAfter: input.moodAfter ?? null,
    syncStatus: "synced",
  });
  const performance = await db.orm.public.CognitivePerformance.create({
    patientId,
    sessionId,
    cognitiveDomain: "memory",
    score: accuracy.toString(),
    accuracyPercent: accuracy.toString(),
    averageResponseMs: averageResponseMs ?? null,
    errorRate: errorRate.toString(),
    difficultyLevel: finalDifficulty,
  });
  return {
    session: completedSession,
    performance,
    summary: {
      totalQuestions,
      correctAnswers,
      accuracy,
      averageResponseMs,
      errorRate,
      finalDifficulty,
    },
  };
};
