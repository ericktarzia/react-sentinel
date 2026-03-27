import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await taskService.getAll(page, size);
      setTasks(result.tasks);
      setPagination(result.meta);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  const completeTask = useCallback(async (task) => {
    try {
      const updatedTask = await taskService.completeTask(task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSave = async (taskData) => {
    try {
      await taskService.save(taskData);
      await fetchTasks();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const nextPage = () => {
    if (pagination && typeof pagination.totalPages === "number") {
      setPage((p) => Math.min(p + 1, pagination.totalPages - 1));
    } else {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  const goToPage = (n) => setPage(() => Math.max(0, n));

  return {
    tasks,
    pagination,
    loading,
    refresh: fetchTasks,
    completeTask,
    deleteTask,
    handleSave,
    page,
    size,
    nextPage,
    prevPage,
    goToPage,
  };
}
