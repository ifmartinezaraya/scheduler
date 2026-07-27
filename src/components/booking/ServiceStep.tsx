"use client";

import { SERVICES, formatCLP } from "@/lib/salon";
import { Service } from "@/lib/types";

export function ServiceStep({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (service: Service) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight mb-1">Elige un servicio</h2>
      <p className="text-coffee-400 mb-8 text-sm">Selecciona lo que quieres reservar.</p>
      <div className="divide-y divide-coffee-200/70 border-y border-coffee-200/70">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`group w-full flex items-center gap-5 text-left py-5 transition-colors ${
              selectedId === s.id ? "bg-coffee-50" : "hover:bg-coffee-50/60"
            }`}
          >
            <span className="eyebrow text-coffee-300 w-8">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">
              <span className="block font-bold uppercase tracking-wide text-coffee-ink">{s.name}</span>
              <span className="block text-xs uppercase tracking-widest text-coffee-400 mt-1">
                {s.durationMin} min
              </span>
            </span>
            <span className="font-bold text-coffee-700">{formatCLP(s.priceCLP)}</span>
            <span className="text-coffee-300 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
