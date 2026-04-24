import api from "./api";
import { getDashboardSummaryMock } from "../mocks/dashboardMocks";
import { USE_MOCKS } from "./runtimeConfig";

const normalizeError = (error) => ({
  success: false,
  data: null,
  message: error.response?.data?.message || "No se pudo cargar el dashboard del tutor.",
  status: error.response?.status || 500,
});

const dashboardService = {
  getSummary: async () => {
    if (USE_MOCKS) {
      return getDashboardSummaryMock();
    }

    try {
      const response = await api.get("/dashboard/summary");
      return {
        success: response.data?.success ?? true,
        data: response.data?.data ?? null,
        message: response.data?.message || "Resumen del dashboard cargado.",
        status: response.status,
      };
    } catch (error) {
      return normalizeError(error);
    }
  },
};

export default dashboardService;
