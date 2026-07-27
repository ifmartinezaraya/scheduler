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
      <h2 className="text-2xl font-bold uppercase tracking-tight mb-1">Fecha y hora</h2>
      <p className="text-coffee-400 mb-8 text-sm">Elige el día y el horario.</p>

      {/* Fechas */}
      <p className="eyebrow text-coffee-400 mb-3">Día</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {dates.map((d) => {
          const [, , day] = d.split("-");
          const wd = new Date(d + "T00:00:00").toLocaleDateString("es-CL", { weekday: "short" });
          const active = selDate === d;
          return (
            <button
              key={d}
              onClick={() => {
                setSelDate(d);
                setSelTime("");
              }}
              className={`flex-shrink-0 w-14 py-3 text-center border transition-colors ${
                active
                  ? "border-coffee-900 bg-coffee-900 text-coffee-50"
                  : "border-coffee-200 bg-white hover:border-coffee-400"
              }`}
            >
              <span className="block text-[0.6rem] uppercase tracking-widest">{wd}</span>
              <span className="block text-lg font-bold">{day}</span>
            </button>
          );
        })}
      </div>

      {/* Horas */}
      <p className="eyebrow text-coffee-400 mb-3">Hora</p>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-10">
        {slots.map((t) => {
          const taken = storage.isTaken(selDate, t);
          const active = selTime === t;
          return (
            <button
              key={t}
              disabled={taken}
              onClick={() => setSelTime(t)}
              className={`py-2.5 text-sm font-medium border transition-colors ${
                taken
                  ? "border-coffee-100 bg-coffee-50 text-coffee-300 cursor-not-allowed line-through"
                  : active
                  ? "border-coffee-900 bg-coffee-900 text-coffee-50"
                  : "border-coffee-200 bg-white hover:border-coffee-400"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          Atrás
        </Button>
        <Button disabled={!selDate || !selTime} onClick={() => onSubmit(selDate, selTime)}>
          Continuar
        </Button>
      </div>
      {selDate && selTime && (
        <p className="eyebrow text-coffee-400 mt-4 text-right">
          {formatDateLong(selDate)} · {selTime}
        </p>
      )}
    </div>
  );
}
