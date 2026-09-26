import { db } from "@mindcare-ner/db";

export const getCaregiverDashboard = async (userId: string) => {
  // The caregiver is a User whose role is "caregiver".
  const caregiver = await db.orm.public.User.first({
    id: userId,
  });

  if (!caregiver) {
    const error = new Error("Caregiver user not found");
    (error as any).statusCode = 404;
    throw error;
  }

  if (caregiver.role !== "caregiver") {
    const error = new Error("User is not a caregiver");
    (error as any).statusCode = 403;
    throw error;
  }

  // Find all patients assigned to this caregiver.
  const caregiverPatients = await db.orm.public.CaregiverPatient.where({
    caregiverId: userId,
  }).all();

  const patientSummaries = await Promise.all(
    caregiverPatients.map(async (assignment) => {
      const patient = await db.orm.public.Patient.first({
        id: assignment.patientId,
      });

      if (!patient) {
        return null;
      }

      const sessions = await db.orm.public.GameSession.where({
        patientId: patient.id,
      }).all();

      const completedSessions = sessions.filter(
        (session) => session.completedAt !== null,
      );

      const latestSession = [...completedSessions].sort(
        (a, b) =>
          new Date(b.startedAt).getTime() -
          new Date(a.startedAt).getTime(),
      )[0];

      const performances =
        await db.orm.public.CognitivePerformance.where({
          patientId: patient.id,
        }).all();

      const latestPerformance = [...performances].sort(
        (a, b) =>
          new Date(b.measuredAt).getTime() -
          new Date(a.measuredAt).getTime(),
      )[0];

      const performanceWithAccuracy = performances.filter(
        (performance) => performance.accuracyPercent !== null,
      );

      const averageAccuracy =
        performanceWithAccuracy.length > 0
          ? performanceWithAccuracy.reduce(
              (total, performance) =>
                total + Number(performance.accuracyPercent),
              0,
            ) / performanceWithAccuracy.length
          : 0;

      return {
        patient: {
          id: patient.id,
          userId: patient.userId,
          patientCode: patient.patientCode,
          displayName: patient.displayName,
          primaryLanguage: patient.primaryLanguage,
        },

        relationship: {
          relationship: assignment.relationship,
          isPrimary: assignment.isPrimary,
        },

        activity: {
          totalSessions: completedSessions.length,

          latestSession: latestSession
            ? {
                id: latestSession.id,
                gameId: latestSession.gameId,
                startedAt: latestSession.startedAt,
                completedAt: latestSession.completedAt,
                totalQuestions: latestSession.totalQuestions,
                correctAnswers: latestSession.correctAnswers,
                averageResponseMs: latestSession.averageResponseMs,
              }
            : null,
        },

        performance: {
          averageAccuracy: Number(averageAccuracy.toFixed(2)),

          latest: latestPerformance
            ? {
                id: latestPerformance.id,
                sessionId: latestPerformance.sessionId,
                cognitiveDomain: latestPerformance.cognitiveDomain,
                score: latestPerformance.score,
                accuracyPercent: latestPerformance.accuracyPercent,
                averageResponseMs: latestPerformance.averageResponseMs,
                errorRate: latestPerformance.errorRate,
                difficultyLevel: latestPerformance.difficultyLevel,
                measuredAt: latestPerformance.measuredAt,
              }
            : null,
        },
      };
    }),
  );

  const patients = patientSummaries.filter(
    (patient): patient is NonNullable<typeof patient> => patient !== null,
  );

  return {
    caregiver: {
      id: caregiver.id,
      fullName: caregiver.fullName,
      email: caregiver.email,
      phone: caregiver.phone,
    },

    patients,

    summary: {
      totalPatients: patients.length,

      totalCompletedSessions: patients.reduce(
        (total, patient) =>
          total + patient.activity.totalSessions,
        0,
      ),
    },
  };
};