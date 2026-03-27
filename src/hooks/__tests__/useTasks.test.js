import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTasks } from "../useTasks";
import { taskService } from "../../services/taskService";

vi.mock("../../services/taskService");

describe("useTasks Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve iniciar com estado de loading true e lista vazia", async () => {
    taskService.getAll.mockResolvedValue({ tasks: [], meta: {} });

    const { result } = renderHook(() => useTasks());

    expect(result.current.loading).toBe(true);
    expect(result.current.tasks).toEqual([]);
  });

  it("deve carregar as tarefas com sucesso e mudar loading para false", async () => {
    const mockData = {
      tasks: [{ id: 1, title: "Task Teste" }],
      meta: { totalPages: 1, totalElements: 1 },
    };
    taskService.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("Task Teste");
  });

  it("não deve avançar a página se for a última página", async () => {
    const mockData = { tasks: [], meta: { totalPages: 2 } };
    taskService.getAll.mockResolvedValue(mockData);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.goToPage(1);
    });

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.page).toBe(1);
  });

  it("deve remover a tarefa da lista local ao deletar", async () => {
    const mockData = {
      tasks: [
        { id: 1, title: "T1" },
        { id: 2, title: "T2" },
      ],
      meta: {},
    };
    taskService.getAll.mockResolvedValue(mockData);
    taskService.deleteTask.mockResolvedValue(true);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deleteTask(1);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe(2);
  });
});
