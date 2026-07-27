"use client";

import { Button } from "@/components/common/Button";
import { AppointmentDraft } from "@/lib/types";
import { formatCLP, formatDateLong } from "@/lib/salon";

export function ReviewStep({
  draft,
  onConfirm,
  onBack,
  isSubmitting,
}: {
  draft: AppointmentDraft;
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  const rows: [string, string][] = [
    ["Servicio", draft.serviceName],
    ["Duración", `${draft.durationMin} min`],
    ["Precio", formatCLP(draft.priceCLP)],
    ["Fecha", formatDateLong(draft.date)],
    ["Hora", draft.time],
    ["Nombre", draft.clientName],
    ["WhatsApp", draft.whatsapp],
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Revisa tu reserva</h2>
      <p className="text-gray-500 mb-6 text-sm">Confirma que todo esté correcto.</p>

      <div className="rounded-2xl border-2 border-gray-100 divide-y divide-gray-100 mb-8">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between px-4 py-3">
            <span className="text-gray-500 text-sm">{label}</span>
            <span className="font-semibold text-right">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>
          ← Atrás
        </Button>
        <Button onClick={onConfirm} isLoading={isSubmitting}>
          Confirmar reserva
        </Button>
      </div>
    </div>
  );
}
