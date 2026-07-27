"use client";

import { useState } from "react";
import Link from "next/link";
import { ServiceStep } from "@/components/booking/ServiceStep";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { ClientStep } from "@/components/booking/ClientStep";
import { ReviewStep } from "@/components/booking/ReviewStep";
import { ConfirmationStep } from "@/components/booking/ConfirmationStep";
import { Brand } from "@/components/common/Brand";
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
    <main className="max-w-3xl mx-auto px-5 py-10">
      {/* Cabecera / logo */}
      <div className="flex items-center justify-between mb-14">
        <Brand />
        <Link href="/panel" className="eyebrow text-coffee-500 hover:text-coffee-900 transition-colors">
          Panel
        </Link>
      </div>

      {/* Hero */}
      {step === 1 && (
        <div className="mb-12">
          <p className="eyebrow text-coffee-400 mb-4">{SALON.tagline}</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-coffee-ink">
            Reserva
            <br />
            tu hora
          </h1>
          <p className="text-coffee-500 mt-5 max-w-md">
            Elige servicio, día y hora. Confirmamos por WhatsApp. Simple, como debe ser.
          </p>
        </div>
      )}

      {/* Tarjeta */}
      <div className="bg-white border border-coffee-200/70 rounded-none sm:rounded-lg p-6 sm:p-10">
        {/* Progreso */}
        {step <= 4 && (
          <div className="mb-10">
            <div className="flex items-center gap-3">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex items-center gap-3 flex-1">
                  <span
                    className={`eyebrow ${
                      i + 1 === step ? "text-coffee-900" : i + 1 < step ? "text-coffee-400" : "text-coffee-300"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-px flex-1 ${i + 1 <= step ? "bg-coffee-900" : "bg-coffee-200"}`}
                  />
                </div>
              ))}
            </div>
            <p className="eyebrow text-coffee-400 mt-3">{STEP_LABELS[step - 1]}</p>
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

      <p className="eyebrow text-coffee-300 mt-8 text-center">
        {SALON.name} — {SALON.address}
      </p>
    </main>
  );
}
