"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/common/Brand";
import { storage } from "@/lib/storage";
import { AppointmentStatus, StoredAppointment } from "@/lib/types";
import {
  buildConfirmationMessage,
  formatCLP,
  formatDateLong,
  normalizePhone,
  waMeLink,
} from "@/lib/salon";

const STATUS_STYLE: Record<AppointmentStatus, string> = {
  pendiente: "border-coffee-300 text-coffee-500",
  confirmada: "border-coffee-900 bg-coffee-900 text-coffee-50",
  reagendar: "border-red-300 text-red-700",
};

export default function PanelPage() {
  const [items, setItems] = useState<StoredAppointment[]>([]);

  const refresh = () => setItems(storage.getAll().sort((a, b) => (a.date + a.time > b.date + b.time ? 1 : -1)));

  useEffect(() => {
    refresh();
  }, []);

  const setStatus = (id: string, status: AppointmentStatus) => {
    storage.updateStatus(id, status);
    refresh();
  };

  const del = (id: string) => {
    if (confirm("¿Eliminar esta reserva?")) {
      storage.remove(id);
      refresh();
    }
  };

  const confirmLink = (a: StoredAppointment) => {
    const msg = buildConfirmationMessage({
      clientName: a.clientName,
      serviceName: a.serviceName,
      dateLabel: formatDateLong(a.date),
      time: a.time,
    });
    return waMeLink(normalizePhone(a.whatsapp), msg);
  };

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-14">
        <Brand />
        <Link href="/" className="eyebrow text-coffee-500 hover:text-coffee-900 transition-colors">
          Reservar
        </Link>
      </div>

      <div className="mb-10">
        <p className="eyebrow text-coffee-400 mb-3">Administración</p>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-coffee-ink">
          Reservas
        </h1>
        <p className="text-coffee-400 text-sm mt-2">{items.length} reserva(s) registradas</p>
      </div>

      {items.length === 0 ? (
        <div className="border border-coffee-200 bg-white p-16 text-center">
          <p className="eyebrow text-coffee-300">Aún no hay reservas</p>
        </div>
      ) : (
        <div className="border-t border-coffee-200/70">
          {items.map((a) => (
            <div key={a.id} className="border-b border-coffee-200/70 py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg uppercase tracking-wide text-coffee-ink">{a.clientName}</span>
                    <span className={`text-[0.6rem] uppercase tracking-widest px-2 py-0.5 border rounded-full ${STATUS_STYLE[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="eyebrow text-coffee-400 mt-2">
                    {a.serviceName} — {formatCLP(a.priceCLP)}
                  </div>
                  <div className="text-sm text-coffee-600 mt-1">
                    {formatDateLong(a.date)} · {a.time}
                  </div>
                  <div className="text-sm text-coffee-400 mt-1">{a.whatsapp}</div>
                </div>

                <div className="flex flex-col items-stretch gap-2 min-w-[210px]">
                  <a
                    href={confirmLink(a)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold uppercase tracking-[0.1em] text-xs px-4 py-2.5 rounded-full hover:brightness-95 transition"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z" />
                    </svg>
                    Enviar confirmación
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus(a.id, "confirmada")}
                      className="flex-1 text-[0.65rem] uppercase tracking-widest px-2 py-2 border border-coffee-300 text-coffee-700 hover:bg-coffee-900 hover:text-coffee-50 hover:border-coffee-900 transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setStatus(a.id, "reagendar")}
                      className="flex-1 text-[0.65rem] uppercase tracking-widest px-2 py-2 border border-coffee-300 text-coffee-700 hover:bg-coffee-100 transition-colors"
                    >
                      Reagendar
                    </button>
                    <button
                      onClick={() => del(a.id)}
                      className="text-[0.65rem] uppercase tracking-widest px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
