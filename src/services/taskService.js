import { apiClient } from "./api";

import { TaskModel } from "../models/TaskModel";

export const taskService = {
  async getAll(page = 0, size = 10) {
    const qs = `?page=${page}&size=${size}`;
    const pageData = await apiClient.get(`/tasks${qs}`);

    return {
      tasks: (pageData.content || []).map(TaskModel),
      meta: {
        totalElements: pageData.totalElements,
        totalPages: pageData.totalPages,
        isLast: pageData.last,
        pageNumber: pageData.number,
      },
    };
  },

  async completeTask(task) {
    try {
      const response = await apiClient.patch(`/tasks/${task.id}/complete`, {
        ...task,
      });

      if (!response) throw new Error("Falha ao atualizar task");
      const data = await response;
      return TaskModel(data);
    } catch (error) {
      console.error("[taskService] completeTask error:", error);
      throw error;
    }
  },

  async deleteTask(taskId) {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      return true;
    } catch (error) {
      console.error("[taskService] deleteTask error:", error);
      throw error;
    }
  },

  async save(task) {
    if (task.id) {
      const data = await apiClient.patch(`/tasks/${task.id}`, task);
      return TaskModel(data);
    } else {
      const data = await apiClient.post("/tasks", {
        ...task,
        completed: false,
      });
      return TaskModel(data);
    }
  },
};
