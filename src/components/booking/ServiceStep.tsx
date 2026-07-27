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
      <h2 className="text-xl font-bold mb-1">Elige un servicio</h2>
      <p className="text-gray-500 mb-6 text-sm">Selecciona el servicio que deseas reservar.</p>
      <div className="grid gap-3">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className={`flex items-center gap-4 text-left p-4 rounded-2xl border-2 transition-all ${
              selectedId === s.id
                ? "border-brand bg-brand/5"
                : "border-gray-200 hover:border-brand/50 bg-white"
            }`}
          >
            <span className="text-2xl w-11 h-11 flex items-center justify-center rounded-xl bg-brand/10">
              {s.icon}
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{s.name}</span>
              <span className="block text-sm text-gray-500">{s.durationMin} min</span>
            </span>
            <span className="font-bold text-brand">{formatCLP(s.priceCLP)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
