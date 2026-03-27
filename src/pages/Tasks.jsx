import React, { useState } from "react";

import {
  CheckCircle2,
  Circle,
  RefreshCw,
  AlertCircle,
  Trash2,
  Edit,
  PlusCircle,
} from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import ConfirmModal from "../components/ConfirmModal";
import TaskFormModal from "../components/TaskFormModal";

export default function Tasks() {
  const {
    tasks,
    loading,
    error,
    pagination,
    completeTask,
    deleteTask,
    refresh,
    handleSave,
    nextPage,
    prevPage,
    goToPage,
  } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteTask(selectedTask.id);
    setModalOpen(false);
    refresh();
  };

  const openCreate = () => {
    setSelectedTask(null);
    setFormModalOpen(true);
  };

  const openEdit = (task) => {
    setSelectedTask(task);
    setFormModalOpen(true);
  };

  if (loading)
    return (
      <div className="p-10 flex items-center gap-3 text-emerald-500 font-mono">
        <RefreshCw className="animate-spin" size={18} /> Sincronizando_API...
      </div>
    );

  return (
    <div className="p-10 font-mono">
      <header className="flex justify-between items-center mb-10 max-w-2xl">
        <h2 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">
          Task_Manager
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="text-zinc-600 hover:text-white transition-colors"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={openCreate}
            className="bg-emerald-600 px-4 py-2 rounded-lg text-[10px] font-bold"
          >
            <PlusCircle size={14} className="inline-block mr-1" />
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-500 text-xs flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="grid gap-3 max-w-2xl">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex justify-between items-center hover:border-zinc-600 transition-all"
          >
            <span
              className={`text-sm tracking-tight ${task.completed ? "text-zinc-600 line-through" : "text-zinc-200 font-medium"}`}
            >
              {task.title}
            </span>
            <div className="group items-center gap-3 space-x-8">
              <button
                onClick={() => completeTask(task)}
                className={`transition-all duration-300 ${task.completed ? "text-emerald-500" : "text-zinc-700 hover:text-white"}`}
              >
                {task.completed ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <Circle size={22} />
                )}
              </button>

              <button
                onClick={() => openEdit(task)}
                className="p-2 text-yellow-400  hover:text-yellow-500 transition-colors opacity-50 group-hover:opacity-100 transition-all"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => openDeleteModal(task)}
                className="text-red-500 hover:text-red-700 transition-colors opacity-50 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 max-w-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={(pagination?.pageNumber || 0) <= 0}
            className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: pagination?.totalPages || 1 }).map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`px-2 py-1 rounded ${idx === (pagination?.pageNumber || 0) ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-400"}`}
                >
                  {idx + 1}
                </button>
              ),
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={pagination?.isLast}
            className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <footer className="text-[9px] text-zinc-700 uppercase">
          Page {(pagination?.pageNumber || 0) + 1} of{" "}
          {pagination?.totalPages || 1}
        </footer>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        taskTitle={selectedTask?.title}
      />
      <TaskFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSave}
        initialData={selectedTask}
      />
    </div>
  );
}
