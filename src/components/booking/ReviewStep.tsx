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
      <h2 className="text-2xl font-bold uppercase tracking-tight mb-1">Revisa tu reserva</h2>
      <p className="text-coffee-400 mb-8 text-sm">Confirma que todo esté correcto.</p>

      <div className="divide-y divide-coffee-200/70 border-y border-coffee-200/70 mb-10">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between items-center py-3.5">
            <span className="eyebrow text-coffee-400">{label}</span>
            <span className="font-semibold text-right text-coffee-ink">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>
          Atrás
        </Button>
        <Button onClick={onConfirm} isLoading={isSubmitting}>
          Confirmar reserva
        </Button>
      </div>
    </div>
  );
}
