"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";

export function ClientStep({
  name,
  whatsapp,
  onSubmit,
  onBack,
}: {
  name?: string;
  whatsapp?: string;
  onSubmit: (name: string, whatsapp: string) => void;
  onBack: () => void;
}) {
  const [clientName, setClientName] = useState(name || "");
  const [phone, setPhone] = useState(whatsapp || "");
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    if (clientName.trim().length < 2) {
      setError("Ingresa tu nombre.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8) {
      setError("Ingresa un número de WhatsApp válido.");
      return;
    }
    setError(null);
    onSubmit(clientName.trim(), phone.trim());
  };

  const inputClass =
    "w-full px-0 py-3 bg-transparent border-b border-coffee-300 focus:border-coffee-900 outline-none text-lg placeholder:text-coffee-300 transition-colors";

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase tracking-tight mb-1">Tus datos</h2>
      <p className="text-coffee-400 mb-8 text-sm">Te enviaremos la confirmación por WhatsApp.</p>

      <label className="block mb-8">
        <span className="eyebrow text-coffee-400">Nombre</span>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Tu nombre"
          className={inputClass}
        />
      </label>

      <label className="block mb-2">
        <span className="eyebrow text-coffee-400">WhatsApp</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+56 9 1234 5678"
          className={inputClass}
        />
      </label>
      <p className="text-xs text-coffee-400 mb-8">Incluye el código de país. Ej: +56 9 XXXX XXXX</p>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Atrás
        </Button>
        <Button onClick={handleContinue}>Continuar</Button>
      </div>
    </div>
  );
}
