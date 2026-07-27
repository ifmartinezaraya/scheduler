"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { getAvailableDates, getTimeSlots, formatDateLong } from "@/lib/salon";
import { storage } from "@/lib/storage";

export function DateTimeStep({
  date,
  time,
  onSubmit,
  onBack,
}: {
  date?: string;
  time?: string;
  onSubmit: (date: string, time: string) => void;
  onBack: () => void;
}) {
  const dates = useMemo(() => getAvailableDates(14), []);
  const slots = useMemo(() => getTimeSlots(), []);
  const [selDate, setSelDate] = useState<string>(date || dates[0]);
  const [selTime, setSelTime] = useState<string>(time || "");

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Fecha y hora</h2>
      <p className="text-gray-500 mb-6 text-sm">Elige el día y el horario disponible.</p>

      {/* Fechas */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {dates.map((d) => {
          const [, , day] = d.split("-");
          const wd = new Date(d + "T00:00:00").toLocaleDateString("es-CL", { weekday: "short" });
          return (
            <button
              key={d}
              onClick={() => {
                setSelDate(d);
                setSelTime("");
              }}
              className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all ${
                selDate === d ? "border-brand bg-brand text-white" : "border-gray-200 bg-white hover:border-brand/50"
              }`}
            >
              <span className="block text-xs uppercase">{wd}</span>
              <span className="block text-lg font-bold">{day}</span>
            </button>
          );
        })}
      </div>

      {/* Horas */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-8">
        {slots.map((t) => {
          const taken = storage.isTaken(selDate, t);
          return (
            <button
              key={t}
              disabled={taken}
              onClick={() => setSelTime(t)}
              className={`py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                taken
                  ? "border-gray-100 bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                  : selTime === t
                  ? "border-brand bg-brand text-white"
                  : "border-gray-200 bg-white hover:border-brand/50"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {selDate && (
        <p className="text-sm text-gray-500 mb-6">
          Seleccionado: <span className="font-semibold text-gray-800">{formatDateLong(selDate)}</span>
          {selTime && <span className="font-semibold text-gray-800"> · {selTime}</span>}
        </p>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Atrás
        </Button>
        <Button disabled={!selDate || !selTime} onClick={() => onSubmit(selDate, selTime)}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
