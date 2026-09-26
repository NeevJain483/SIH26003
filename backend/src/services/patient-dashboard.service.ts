import { db } from "@mindcare-ner/db";

export const getPatientDashboard = async (userId: string) => {
  // --------------------------------------------------
  // 1. Find patient
  // --------------------------------------------------

  const patient = await db.orm.public.Patient.first({
    userId,
  });

  if (!patient) {
    const error = new Error("Patient profile not found");
    (error as any).statusCode = 404;
    throw error;
  }

  // --------------------------------------------------
  // 2. Get all game sessions for this patient
  // --------------------------------------------------

  const sessions = await db.orm.public.GameSession.where({
    patientId: patient.id,
  }).all();

  // --------------------------------------------------
  // 3. Get completed sessions
  // --------------------------------------------------

  const completedSessions = sessions.filter(
    (session) => session.completedAt !== null,
  );

  // --------------------------------------------------
  // 4. Today's sessions
  // --------------------------------------------------

  const today = new Date();

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
  );

  const todaysSessions = completedSessions.filter((session) => {
    const sessionDate = new Date(session.startedAt);

    return (
      sessionDate >= startOfDay &&
      sessionDate < endOfDay
    );
  });

  // --------------------------------------------------
  // 5. Calculate today's statistics
  // --------------------------------------------------

  const gamesCompletedToday = todaysSessions.length;

  const questionsToday = todaysSessions.reduce(
    (total, session) =>
      total + (session.totalQuestions ?? 0),
    0,
  );

  const correctAnswersToday = todaysSessions.reduce(
    (total, session) =>
      total + (session.correctAnswers ?? 0),
    0,
  );

  const todayAccuracy =
    questionsToday > 0
      ? (correctAnswersToday / questionsToday) * 100
      : 0;

  // --------------------------------------------------
  // 6. Recent sessions
  // --------------------------------------------------

  const recentSessions = [...completedSessions]
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() -
        new Date(a.startedAt).getTime(),
    )
    .slice(0, 5);

  // --------------------------------------------------
  // 7. Get cognitive performance
  // --------------------------------------------------

  const performances =
    await db.orm.public.CognitivePerformance.where({
      patientId: patient.id,
    }).all();

  const recentPerformance = [...performances]
    .sort(
      (a, b) =>
        new Date(b.measuredAt).getTime() -
        new Date(a.measuredAt).getTime(),
    )
    .slice(0, 5);

  // --------------------------------------------------
  // 8. Calculate overall performance
  // --------------------------------------------------

  const performanceWithAccuracy = performances.filter(
    (performance) =>
      performance.accuracyPercent !== null,
  );

  const averageAccuracy =
    performanceWithAccuracy.length > 0
      ? performanceWithAccuracy.reduce(
          (total, performance) =>
            total +
            Number(performance.accuracyPercent),
          0,
        ) / performanceWithAccuracy.length
      : 0;

  const performanceWithResponseTime =
    performances.filter(
      (performance) =>
        performance.averageResponseMs !== null,
    );

  const averageResponseTime =
    performanceWithResponseTime.length > 0
      ? performanceWithResponseTime.reduce(
          (total, performance) =>
            total +
            Number(performance.averageResponseMs),
          0,
        ) / performanceWithResponseTime.length
      : 0;

  // --------------------------------------------------
  // 9. Return dashboard
  // --------------------------------------------------

  return {
    patient: {
      id: patient.id,
      userId: patient.userId,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
      primaryLanguage: patient.primaryLanguage,
    },

    today: {
      gamesCompleted: gamesCompletedToday,
      questionsAnswered: questionsToday,
      correctAnswers: correctAnswersToday,
      accuracy: Number(todayAccuracy.toFixed(2)),
    },

    overall: {
      totalSessions: completedSessions.length,
      averageAccuracy: Number(
        averageAccuracy.toFixed(2),
      ),
      averageResponseTime: Math.round(
        averageResponseTime,
      ),
    },

    recentSessions: recentSessions.map(
      (session) => ({
        id: session.id,
        gameId: session.gameId,
        startedAt: session.startedAt,
        completedAt: session.completedAt,
        totalQuestions: session.totalQuestions,
        correctAnswers: session.correctAnswers,
        averageResponseMs:
          session.averageResponseMs,
        initialDifficulty:
          session.initialDifficulty,
        finalDifficulty:
          session.finalDifficulty,
      }),
    ),

    recentPerformance: recentPerformance.map(
      (performance) => ({
        id: performance.id,
        sessionId: performance.sessionId,
        cognitiveDomain:
          performance.cognitiveDomain,
        score: performance.score,
        accuracyPercent:
          performance.accuracyPercent,
        averageResponseMs:
          performance.averageResponseMs,
        errorRate: performance.errorRate,
        difficultyLevel:
          performance.difficultyLevel,
        measuredAt: performance.measuredAt,
      }),
    ),
  };
};