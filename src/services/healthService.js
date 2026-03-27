import { apiClient } from "./api";

export const healthService = {
  async checkHealth() {
    try {
      const data = await apiClient.get("/health");
      return data && data.online === true;
    } catch (error) {
      console.error("[healthService] checkHealth error:", error);
      return false;
    }
  },
};
