import React, { useState, useEffect, useRef } from "react";
import { Save, X, Loader2, CheckCircle2, Circle } from "lucide-react";

export default function TaskFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);

  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "");
      setDescription(initialData?.description || "");
      setCompleted(initialData?.completed || false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    const success = await onSave({
      id: initialData?.id,
      title,
      description,
      completed,
    });
    setIsSaving(false);

    if (success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <header className="flex justify-between items-center mb-8">
          <h3 className="text-white text-xl font-bold tracking-tighter">
            {isEdit ? "Editar Atividade" : "Nova Atividade"}
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Título */}
          <div>
            <label className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2 block">
              Título
            </label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
              disabled={isSaving}
            />
          </div>

          {/* Campo de Descrição */}
          <div>
            <label className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2 block">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
              disabled={isSaving}
            />
          </div>

          {/* Se for edição, mostra o Toggle de Status com Estética Sentinel */}
          {isEdit && (
            <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800/50 flex justify-between items-center">
              <div>
                <span className="text-[9px] text-zinc-600 uppercase block">
                  Status_do_Cluster
                </span>
                <span
                  className={`text-xs font-bold ${completed ? "text-emerald-500" : "text-zinc-400"}`}
                >
                  {completed ? "COMPLETO" : "PENDENTE"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCompleted(!completed)}
                className={`p-2 rounded-lg transition-all ${completed ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-800 text-zinc-600"}`}
              >
                {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving || !title.trim()}
            className="w-full py-4 rounded-xl font-bold text-xs tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Save size={16} /> {isEdit ? "ATUALIZAR" : "SALVAR"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
