const DASHBOARD_DELAY_MS = 450;

const dashboardSummaryMock = {
  success: true,
  data: {
    group: {
      id: "group-logic-beginners",
      name: "Exploradores de Logica",
      level: "Nivel inicial",
      totalStudents: 12,
      activeStudents: 10,
      inactiveStudents: 2,
      averageAge: 8,
      completionRate: 78,
      pendingReviews: 3,
      nextSessionLabel: "Hoy · 4:00 PM",
    },
    insights: {
      mostPlayedGame: {
        name: "Patrones en la selva",
        percentage: 42,
        helper: "Fue el juego mas usado por el grupo esta semana.",
      },
      developmentSkill: {
        name: "Reconocimiento de patrones",
        percentage: 81,
        helper: "Es la habilidad con mejor consolidacion en el grupo.",
      },
    },
    metrics: [
      {
        id: "active_students",
        label: "Estudiantes activos",
        value: "10",
        helper: "2 necesitan seguimiento esta semana",
        tone: "primary",
      },
      {
        id: "completion_rate",
        label: "Progreso promedio",
        value: "78%",
        helper: "Subio 6 puntos frente a la semana pasada",
        tone: "success",
      },
      {
        id: "pending_reviews",
        label: "Actividades por revisar",
        value: "3",
        helper: "Listas para retroalimentacion del tutor",
        tone: "warning",
      },
    ],
    topPerformers: [
      {
        id: "student-01",
        rank: 1,
        name: "Mia Torres",
        score: 96,
        wins: 14,
        badge: "Dominio destacado",
      },
      {
        id: "student-04",
        rank: 2,
        name: "Tomas Vega",
        score: 91,
        wins: 12,
        badge: "Gran consistencia",
      },
      {
        id: "student-03",
        rank: 3,
        name: "Valeria Cruz",
        score: 88,
        wins: 10,
        badge: "En ascenso",
      },
    ],
    recentActivity: [
      {
        id: "activity-1",
        title: "Mia completo la mision de patrones",
        description: "Resolvio 8 ejercicios seguidos sin ayudas.",
        timestamp: "Hace 12 min",
        status: "Completado",
      },
      {
        id: "activity-2",
        title: "Samuel necesita apoyo en secuencias",
        description: "Fallo dos retos seguidos y quedo marcado para revision.",
        timestamp: "Hace 35 min",
        status: "Seguimiento",
      },
      {
        id: "activity-3",
        title: "Nuevo codigo de acceso entregado a Valeria",
        description: "El backend debe generar el codigo real; el frontend solo lo muestra.",
        timestamp: "Ayer",
        status: "Informativo",
      },
    ],
    focusStudents: [
      {
        id: "student-01",
        name: "Mia Torres",
        age: 8,
        progress: 92,
        streak: 5,
        note: "Lista para pasar al siguiente bloque.",
      },
      {
        id: "student-02",
        name: "Samuel Rojas",
        age: 9,
        progress: 51,
        streak: 1,
        note: "Conviene practicar secuencias con apoyo visual.",
      },
      {
        id: "student-03",
        name: "Valeria Cruz",
        age: 7,
        progress: 68,
        streak: 3,
        note: "Va ganando confianza en clasificacion y patrones.",
      },
    ],
  },
  message: "Resumen del grupo cargado desde mocks.",
};

export const getDashboardSummaryMock = () =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(dashboardSummaryMock), DASHBOARD_DELAY_MS);
  });

export const getEmptyDashboardSummaryMock = () =>
  new Promise((resolve) => {
    window.setTimeout(
      () =>
        resolve({
          success: true,
          data: {
            group: {
              id: "group-empty",
              name: "Grupo sin estudiantes",
              level: "Nivel inicial",
              totalStudents: 0,
              activeStudents: 0,
              inactiveStudents: 0,
              averageAge: 0,
              completionRate: 0,
              pendingReviews: 0,
              nextSessionLabel: "Sin agenda",
            },
            insights: {
              mostPlayedGame: {
                name: "Sin datos",
                percentage: 0,
                helper: "Aun no hay partidas suficientes para medir este indicador.",
              },
              developmentSkill: {
                name: "Sin datos",
                percentage: 0,
                helper: "Todavia no hay evidencia para identificar una habilidad dominante.",
              },
            },
            metrics: [],
            topPerformers: [],
            recentActivity: [],
            focusStudents: [],
          },
          message: "Aun no hay estudiantes registrados en el grupo.",
        }),
      DASHBOARD_DELAY_MS
    );
  });
