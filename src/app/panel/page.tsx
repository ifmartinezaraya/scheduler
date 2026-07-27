"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { storage } from "@/lib/storage";
import { AppointmentStatus, StoredAppointment } from "@/lib/types";
import {
  SALON,
  buildConfirmationMessage,
  formatCLP,
  formatDateLong,
  normalizePhone,
  waMeLink,
} from "@/lib/salon";

const STATUS_STYLE: Record<AppointmentStatus, string> = {
  pendiente: "bg-amber-100 text-amber-700",
  confirmada: "bg-green-100 text-green-700",
  reagendar: "bg-red-100 text-red-700",
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
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Panel de reservas</h1>
          <p className="text-gray-500 text-sm">{SALON.name} · {items.length} reserva(s)</p>
        </div>
        <Link href="/" className="text-sm text-brand font-semibold hover:underline">
          ← Volver a reservar
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400">
          Aún no hay reservas. Cuando un cliente reserve, aparecerá aquí.
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{a.clientName}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {a.serviceName} · {formatCLP(a.priceCLP)}
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    📅 {formatDateLong(a.date)} · 🕐 {a.time}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">📱 {a.whatsapp}</div>
                </div>

                <div className="flex flex-col items-stretch gap-2 min-w-[200px]">
                  <a
                    href={confirmLink(a)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2 rounded-full hover:brightness-95 transition text-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z" />
                    </svg>
                    Enviar confirmación
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus(a.id, "confirmada")}
                      className="flex-1 text-xs font-semibold px-2 py-1.5 rounded-full border border-green-200 text-green-700 hover:bg-green-50"
                    >
                      Confirmada
                    </button>
                    <button
                      onClick={() => setStatus(a.id, "reagendar")}
                      className="flex-1 text-xs font-semibold px-2 py-1.5 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      Reagendar
                    </button>
                    <button
                      onClick={() => del(a.id)}
                      className="text-xs font-semibold px-2 py-1.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50"
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
