import { db } from "@mindcare-ner/db";

interface RecordGameResponseInput {
  sessionId: string;
  gameItemId: string;
  questionNumber?: number;
  answerGiven?: string;
  isCorrect?: boolean;
  responseTimeMs?: number;
  hesitationMs?: number;
  difficultyAtAttempt?: number;
}

export const recordGameResponse = async (
  patientId: string,
  input: RecordGameResponseInput,
) => {
  // First make sure the session belongs to this patient
  const session = await db.orm.public.GameSession.first({
    id: input.sessionId,
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

  // Make sure the game item exists
  const gameItem = await db.orm.public.GameItem.first({
    id: input.gameItemId,
    isActive: true,
  });

  if (!gameItem) {
    const error = new Error("Game item not found or inactive");
    (error as any).statusCode = 404;
    throw error;
  }

  const response = await db.orm.public.GameResponse.create({
    sessionId: input.sessionId,
    gameItemId: input.gameItemId,
    questionNumber: input.questionNumber ?? null,
    answerGiven: input.answerGiven ?? null,
    isCorrect: input.isCorrect ?? null,
    responseTimeMs: input.responseTimeMs ?? null,
    hesitationMs: input.hesitationMs ?? null,
    difficultyAtAttempt: input.difficultyAtAttempt ?? null,
  });

  return response;
};
