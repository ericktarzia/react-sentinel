export const TaskModel = (data) => ({
  id: data.id || null,
  title: data.title || "Sem título",
  description: data.description || "",
  completed: Boolean(data.completed),
});
