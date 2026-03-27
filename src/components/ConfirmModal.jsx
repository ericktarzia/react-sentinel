import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-red-900/30 w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-red-500/10 rounded-xl">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <h3 className="text-white text-lg font-bold tracking-tight mb-2">
          Excluir Tarefa?
        </h3>
        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
          Você está prestes a remover:{" "}
          <span className="text-zinc-200 font-mono italic">"{taskTitle}"</span>.
          Essa ação não pode ser desfeita no cluster.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all"
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-lg shadow-red-900/20"
          >
            CONFIRMAR EXCLUSÃO
          </button>
        </div>
      </div>
    </div>
  );
}
