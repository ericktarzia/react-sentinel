import React from "react";
import { Database, Activity, RefreshCcw } from "lucide-react";
import { useApiHealth } from "../hooks/useApiHealth";

export default function Dashboard() {
  const { status, lastCheck } = useApiHealth(5000);

  return (
    <div className="p-10 font-mono">
      <header className="mb-10">
        <h2 className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
          <Activity
            size={14}
            className={
              status === "ONLINE"
                ? "animate-pulse text-emerald-500"
                : "text-red-500"
            }
          />
          Sentinel_Health_Monitor
        </h2>
      </header>

      <div
        className={`max-w-md border p-8 rounded-2xl transition-all duration-700 shadow-2xl ${
          status === "ONLINE"
            ? "border-emerald-500/20 bg-emerald-950/5"
            : "border-red-500/20 bg-red-950/5"
        }`}
      >
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${status === "ONLINE" ? "bg-emerald-500/10" : "bg-red-500/10"}`}
            >
              <Database
                className={
                  status === "ONLINE" ? "text-emerald-500" : "text-red-500"
                }
              />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-tighter text-lg">
                SpringBoot API
              </h3>
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest">
                v1.0.4-stable
              </p>
              <p>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">
                  Endpoint
                </span>
                <br />
                <span className="text-xs text-zinc-400 font-bold">
                  {import.meta.env.VITE_API_URL || "URL não configurada"}
                </span>
              </p>
            </div>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              status === "ONLINE"
                ? "bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            }`}
          />
        </div>

        <div className="flex border-t border-zinc-800/50 pt-6">
          <div className="flex-1">
            <span className="block text-[9px] text-zinc-600 uppercase mb-1">
              State
            </span>
            <span
              className={`text-xs font-black tracking-widest ${status === "ONLINE" ? "text-emerald-500" : "text-red-500"}`}
            >
              {status}
            </span>
          </div>
          <div className="flex-1 text-right">
            <span className="block text-[9px] text-zinc-600 uppercase mb-1">
              Last_Sync
            </span>
            <span className="text-xs text-zinc-400 font-bold">
              {lastCheck || "--:--:--"}
            </span>
          </div>
        </div>
      </div>

      <footer className="mt-8 flex items-center gap-2 text-[9px] text-zinc-800 font-bold">
        <RefreshCcw size={10} className="animate-spin" />
        POLLING_ACTIVE_@_5000MS
      </footer>
    </div>
  );
}
