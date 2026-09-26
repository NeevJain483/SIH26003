import { db } from "@mindcare-ner/db";

export const getCaregiverPatientDetails = async (
  caregiverId: string,
  patientId: string,
) => {
  // First verify that this caregiver is actually assigned to this patient.
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

  // Get the patient profile.
  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");
    (error as any).statusCode = 404;
    throw error;
  }

  // Get all game sessions for this patient.
  const sessions = await db.orm.public.GameSession.where({
    patientId: patient.id,
  }).all();

  const completedSessions = sessions.filter(
    (session) => session.completedAt !== null,
  );

  // Latest completed session.
  const latestSession = [...completedSessions].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  )[0];

  // Get cognitive performance records.
  const performances = await db.orm.public.CognitivePerformance.where({
    patientId: patient.id,
  }).all();

  // Latest cognitive performance.
  const latestPerformance = [...performances].sort(
    (a, b) =>
      new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime(),
  )[0];

  // Calculate average accuracy.
  const performanceWithAccuracy = performances.filter(
    (performance) => performance.accuracyPercent !== null,
  );

  const averageAccuracy =
    performanceWithAccuracy.length > 0
      ? performanceWithAccuracy.reduce(
          (total, performance) => total + Number(performance.accuracyPercent),
          0,
        ) / performanceWithAccuracy.length
      : 0;

  // Calculate average response time.
  const performanceWithResponseTime = performances.filter(
    (performance) => performance.averageResponseMs !== null,
  );

  const averageResponseTime =
    performanceWithResponseTime.length > 0
      ? performanceWithResponseTime.reduce(
          (total, performance) => total + Number(performance.averageResponseMs),
          0,
        ) / performanceWithResponseTime.length
      : 0;

  return {
    patient: {
      id: patient.id,
      userId: patient.userId,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      primaryLanguage: patient.primaryLanguage,
      state: patient.state,
      district: patient.district,
      village: patient.village,
      dementiaStage: patient.dementiaStage,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactPhone: patient.emergencyContactPhone,
      consentStatus: patient.consentStatus,
    },

    caregiverRelationship: {
      relationship: assignment.relationship,
      isPrimary: assignment.isPrimary,
      assignedAt: assignment.createdAt,
    },

    activity: {
      totalSessions: completedSessions.length,

      totalQuestions: completedSessions.reduce(
        (total, session) => total + (session.totalQuestions ?? 0),
        0,
      ),

      totalCorrectAnswers: completedSessions.reduce(
        (total, session) => total + (session.correctAnswers ?? 0),
        0,
      ),

      latestSession: latestSession
        ? {
            id: latestSession.id,
            gameId: latestSession.gameId,
            startedAt: latestSession.startedAt,
            completedAt: latestSession.completedAt,
            totalQuestions: latestSession.totalQuestions,
            correctAnswers: latestSession.correctAnswers,
            averageResponseMs: latestSession.averageResponseMs,
            initialDifficulty: latestSession.initialDifficulty,
            finalDifficulty: latestSession.finalDifficulty,
            moodBefore: latestSession.moodBefore,
            moodAfter: latestSession.moodAfter,
          }
        : null,
    },

    performance: {
      totalMeasurements: performances.length,

      averageAccuracy: Number(averageAccuracy.toFixed(2)),

      averageResponseTime: Math.round(averageResponseTime),

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
};
