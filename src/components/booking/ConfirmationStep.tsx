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
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">¡Reserva registrada!</h2>
      <p className="text-gray-500 mb-6">
        {appt.clientName}, tu hora para <strong>{appt.serviceName}</strong> el <strong>{dateLabel}</strong> a las{" "}
        <strong>{appt.time}</strong> quedó guardada.
      </p>

      <div className="rounded-2xl bg-brand/5 border border-brand/20 p-5 mb-6 text-left">
        <p className="text-sm text-gray-600 mb-3">
          📲 Confirma tu asistencia por WhatsApp con un solo toque. Se abrirá un mensaje listo para enviar a{" "}
          {SALON.name}.
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.5-.3z" />
            <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20z" />
          </svg>
          Confirmar por WhatsApp
        </a>
      </div>

      <p className="text-xs text-gray-400 mb-6">
        La peluquería también te escribirá para confirmar o reagendar tu hora.
      </p>

      <button onClick={onReset} className="text-brand font-semibold hover:underline">
        Hacer otra reserva
      </button>
    </div>
  );
}
