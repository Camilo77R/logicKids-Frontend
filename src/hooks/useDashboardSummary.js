import { useEffect, useState } from "react";
import dashboardService from "../services/dashboardService";

export function useDashboardSummary() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSummary = async () => {
    setIsLoading(true);
    setError("");

    const result = await dashboardService.getSummary();

    if (!result.success) {
      setSummary(null);
      setError(result.message || "No se pudo cargar la informacion.");
      setIsLoading(false);
      return;
    }

    setSummary(result.data);
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const bootstrapSummary = async () => {
      const result = await dashboardService.getSummary();

      if (!isMounted) {
        return;
      }

      if (!result.success) {
        setSummary(null);
        setError(result.message || "No se pudo cargar la informacion.");
        setIsLoading(false);
        return;
      }

      setSummary(result.data);
      setIsLoading(false);
    };

    bootstrapSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    summary,
    isLoading,
    error,
    reloadSummary: loadSummary,
  };
}
