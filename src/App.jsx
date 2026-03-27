import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import { LayoutDashboard, ListChecks } from "lucide-react";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-zinc-300 font-mono flex">
        {/* Sidebar de Navegação */}
        <nav className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-8">
          <div className="text-white font-bold tracking-tighter text-xl mb-4 text-emerald-500">
            SENTINEL_OS
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex items-center gap-3 p-3 rounded hover:bg-zinc-900 transition-colors text-sm"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/tasks"
              className="flex items-center gap-3 p-3 rounded hover:bg-zinc-900 transition-colors text-sm"
            >
              <ListChecks size={18} /> Task Manager
            </Link>
          </div>
        </nav>

        {/* Área de Conteúdo (Onde as telas aparecem) */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
