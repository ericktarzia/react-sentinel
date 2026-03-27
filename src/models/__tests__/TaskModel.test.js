import { describe, it, expect } from "vitest";
import { TaskModel } from "../TaskModel";

describe("TaskModel (Entity Normalization)", () => {
  it("deve garantir que os campos básicos tenham valores padrão se a API falhar", () => {
    const rawData = {}; // Simula dado corrompido ou vazio
    const task = TaskModel(rawData);

    expect(task.title).toBe("Sem título");
    expect(task.completed).toBe(false);
    expect(task.id).toBeNull();
  });

  it("deve converter corretamente o status completed para boolean", () => {
    const rawData = { id: 1, title: "Task", completed: 1 }; // API mandando 1 (int)
    const task = TaskModel(rawData);

    expect(task.completed).toBe(true);
  });
});
