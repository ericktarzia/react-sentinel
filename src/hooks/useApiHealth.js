import { useState, useEffect } from "react";
import { healthService } from "../services/healthService";

export function useApiHealth(intervalMs = 5000) {
  const [status, setStatus] = useState("CHECKING");
  const [lastCheck, setLastCheck] = useState(null);

  useEffect(() => {
    const performCheck = async () => {
      const isOnline = await healthService.checkHealth();
      setStatus(isOnline ? "ONLINE" : "OFFLINE");
      setLastCheck(new Date().toLocaleTimeString());
    };

    performCheck();
    const timer = setInterval(performCheck, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return { status, lastCheck };
}
