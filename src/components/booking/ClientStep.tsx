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

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">Tus datos</h2>
      <p className="text-gray-500 mb-6 text-sm">Te enviaremos la confirmación por WhatsApp.</p>

      <label className="block mb-4">
        <span className="block text-sm font-medium mb-1">Nombre</span>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand outline-none"
        />
      </label>

      <label className="block mb-2">
        <span className="block text-sm font-medium mb-1">WhatsApp</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+56 9 1234 5678"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand outline-none"
        />
      </label>
      <p className="text-xs text-gray-400 mb-6">Incluye el código de país. Ej: +56 9 XXXX XXXX</p>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Atrás
        </Button>
        <Button onClick={handleContinue}>Continuar</Button>
      </div>
    </div>
  );
}
