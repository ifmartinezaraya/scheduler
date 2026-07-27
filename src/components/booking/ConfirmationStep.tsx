"use client";

import { StoredAppointment } from "@/lib/types";
import { SALON, buildClientMessage, formatDateLong, waMeLink } from "@/lib/salon";

export function ConfirmationStep({ appt, onReset }: { appt: StoredAppointment; onReset: () => void }) {
  const dateLabel = formatDateLong(appt.date);
  const clientMsg = buildClientMessage({
    clientName: appt.clientName,
    serviceName: appt.serviceName,
    dateLabel,
    time: appt.time,
  });
  const link = waMeLink(SALON.whatsapp, clientMsg);

  return (
    <div className="text-center">
      <span className="inline-block w-14 h-14 rounded-full bg-coffee-900 flex items-center justify-center mb-6">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e0d0bd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <p className="eyebrow text-coffee-400 mb-2">Reserva registrada</p>
      <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-4 text-coffee-ink">
        Nos vemos pronto
      </h2>
      <p className="text-coffee-500 mb-8 max-w-sm mx-auto">
        {appt.clientName}, tu hora para <strong className="text-coffee-ink">{appt.serviceName}</strong> el{" "}
        <strong className="text-coffee-ink">{dateLabel}</strong> a las{" "}
        <strong className="text-coffee-ink">{appt.time}</strong> quedó registrada.
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold uppercase tracking-[0.12em] text-sm px-7 py-3 rounded-full hover:brightness-95 transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z" />
        </svg>
        Confirmar por WhatsApp
      </a>

      <p className="text-xs text-coffee-400 mt-6 mb-8">
        La peluquería también te escribirá para confirmar o reagendar.
      </p>

      <button onClick={onReset} className="eyebrow text-coffee-500 hover:text-coffee-900 transition-colors">
        Hacer otra reserva
      </button>
    </div>
  );
}
