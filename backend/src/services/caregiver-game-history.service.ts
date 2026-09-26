import { db } from "@mindcare-ner/db";

export const getCaregiverGameHistory = async (
  caregiverId: string,
  patientId: string,
) => {
  // Verify that this caregiver is assigned to this patient.
  const assignment = await db.orm.public.CaregiverPatient.first({
    caregiverId,
    patientId,
  });

  if (!assignment) {
    const error = new Error(
      "Patient not found or patient is not assigned to this caregiver",
    );

    (error as any).statusCode = 404;

    throw error;
  }

  // Verify that the patient exists.
  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");

    (error as any).statusCode = 404;

    throw error;
  }

  // Get all sessions for this patient.
  const sessions = await db.orm.public.GameSession.where({
    patientId,
  }).all();

  // We only want completed games in the history.
  const completedSessions = sessions
    .filter((session) => session.completedAt !== null)
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() -
        new Date(a.startedAt).getTime(),
    );

  const history = await Promise.all(
    completedSessions.map(async (session) => {
      // Get the game information.
      const game = await db.orm.public.Game.first({
        id: session.gameId,
      });

      // Get responses belonging to this session.
      const responses = await db.orm.public.GameResponse.where({
        sessionId: session.id,
      }).all();

      // Get cognitive performance for this session.
      const performances =
        await db.orm.public.CognitivePerformance.where({
          patientId,
          sessionId: session.id,
        }).all();

      const performance = performances[0] ?? null;

      return {
        session: {
          id: session.id,
          gameId: session.gameId,
          startedAt: session.startedAt,
          completedAt: session.completedAt,
          initialDifficulty: session.initialDifficulty,
          finalDifficulty: session.finalDifficulty,
          totalQuestions: session.totalQuestions,
          correctAnswers: session.correctAnswers,
          averageResponseMs: session.averageResponseMs,
          moodBefore: session.moodBefore,
          moodAfter: session.moodAfter,
          syncStatus: session.syncStatus,
        },

        game: game
          ? {
              id: game.id,
              name: game.name,
              gameType: game.gameType,
              cognitiveDomain: game.cognitiveDomain,
              difficultyMin: game.difficultyMin,
              difficultyMax: game.difficultyMax,
              languageCode: game.languageCode,
            }
          : null,

        performance: performance
          ? {
              id: performance.id,
              cognitiveDomain: performance.cognitiveDomain,
              score: performance.score,
              accuracyPercent: performance.accuracyPercent,
              averageResponseMs:
                performance.averageResponseMs,
              errorRate: performance.errorRate,
              difficultyLevel:
                performance.difficultyLevel,
              measuredAt: performance.measuredAt,
            }
          : null,

        responses: responses
          .sort(
            (a, b) =>
              (a.questionNumber ?? 0) -
              (b.questionNumber ?? 0),
          )
          .map((response) => ({
            id: response.id,
            gameItemId: response.gameItemId,
            questionNumber: response.questionNumber,
            answerGiven: response.answerGiven,
            isCorrect: response.isCorrect,
            responseTimeMs: response.responseTimeMs,
            hesitationMs: response.hesitationMs,
            difficultyAtAttempt:
              response.difficultyAtAttempt,
            createdAt: response.createdAt,
          })),
      };
    }),
  );

  return {
    patient: {
      id: patient.id,
      userId: patient.userId,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
      primaryLanguage: patient.primaryLanguage,
    },

    caregiverRelationship: {
      relationship: assignment.relationship,
      isPrimary: assignment.isPrimary,
    },

    summary: {
      totalCompletedSessions: history.length,

      totalQuestions: history.reduce(
        (total, item) =>
          total + (item.session.totalQuestions ?? 0),
        0,
      ),

      totalCorrectAnswers: history.reduce(
        (total, item) =>
          total + (item.session.correctAnswers ?? 0),
        0,
      ),
    },

    history,
  };
};