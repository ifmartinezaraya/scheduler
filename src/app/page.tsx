"use client";

import { useState } from "react";
import Link from "next/link";
import { ServiceStep } from "@/components/booking/ServiceStep";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { ClientStep } from "@/components/booking/ClientStep";
import { ReviewStep } from "@/components/booking/ReviewStep";
import { ConfirmationStep } from "@/components/booking/ConfirmationStep";
import { SALON } from "@/lib/salon";
import { storage } from "@/lib/storage";
import { AppointmentDraft, Service, StoredAppointment } from "@/lib/types";

const STEP_LABELS = ["Servicio", "Fecha", "Datos", "Revisar"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [saved, setSaved] = useState<StoredAppointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setStep(1);
    setService(null);
    setDate("");
    setTime("");
    setClientName("");
    setWhatsapp("");
    setSaved(null);
  };

  const draft: AppointmentDraft | null = service
    ? {
        serviceId: service.id,
        serviceName: service.name,
        priceCLP: service.priceCLP,
        durationMin: service.durationMin,
        clientName,
        whatsapp,
        date,
        time,
      }
    : null;

  const handleConfirm = () => {
    if (!draft) return;
    setIsSubmitting(true);
    try {
      const appt = storage.save(draft);
      setSaved(appt);
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Cabecera / logo */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand to-brand-pink flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-brand/30">
            A
          </div>
          <div>
            <div className="font-extrabold text-lg leading-none">{SALON.name}</div>
            <div className="text-xs text-gray-500">{SALON.tagline}</div>
          </div>
        </div>
        <Link href="/panel" className="text-sm text-brand font-semibold hover:underline">
          Panel →
        </Link>
      </div>

      {/* Hero */}
      {step === 1 && (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight">
            Reserva tu hora en{" "}
            <span className="bg-gradient-to-r from-brand to-brand-pink bg-clip-text text-transparent">
              segundos
            </span>
          </h1>
          <p className="text-gray-500 mt-2">Elige tu servicio, día y hora. Confirmamos por WhatsApp.</p>
        </div>
      )}

      {/* Tarjeta */}
      <div className="bg-white rounded-3xl shadow-xl shadow-brand/5 border border-gray-100 p-6 sm:p-8">
        {/* Progreso */}
        {step <= 4 && (
          <div className="mb-8">
            <div className="flex gap-1.5">
              {STEP_LABELS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${i + 1 <= step ? "bg-brand" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {STEP_LABELS.map((label, i) => (
                <span key={label} className={i + 1 === step ? "text-brand font-semibold" : ""}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <ServiceStep
            selectedId={service?.id}
            onSelect={(s) => {
              setService(s);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <DateTimeStep
            date={date}
            time={time}
            onBack={() => setStep(1)}
            onSubmit={(d, t) => {
              setDate(d);
              setTime(t);
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <ClientStep
            name={clientName}
            whatsapp={whatsapp}
            onBack={() => setStep(2)}
            onSubmit={(n, w) => {
              setClientName(n);
              setWhatsapp(w);
              setStep(4);
            }}
          />
        )}

        {step === 4 && draft && (
          <ReviewStep draft={draft} onBack={() => setStep(3)} onConfirm={handleConfirm} isSubmitting={isSubmitting} />
        )}

        {step === 5 && saved && <ConfirmationStep appt={saved} onReset={reset} />}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        {SALON.name} · {SALON.address}
      </p>
    </main>
  );
}
