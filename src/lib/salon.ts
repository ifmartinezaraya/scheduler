// Configuración central de la peluquería ficticia (MVP).
// Edita estos datos para adaptarlo a una peluquería real.

import { Service } from "./types";

export const SALON = {
  name: "Studio Aura",
  tagline: "Peluquería & Barbería",
  // Número de WhatsApp de la peluquería (formato internacional, solo dígitos).
  // Ficticio para el MVP. Ej. Chile: 56 9 XXXX XXXX
  whatsapp: "56961234567",
  address: "Av. Providencia 1234, Santiago",
  // Días abiertos: 0=Dom, 1=Lun, ... 6=Sáb. Aquí Mar(2) a Sáb(6).
  openDays: [2, 3, 4, 5, 6],
  openHour: 10, // 10:00
  closeHour: 19, // 19:00 (último turno antes de cerrar)
  slotStepMin: 30,
};

export const SERVICES: Service[] = [
  { id: "corte", name: "Corte de cabello", durationMin: 30, priceCLP: 12000, icon: "✂️" },
  { id: "corte-barba", name: "Corte + Barba", durationMin: 45, priceCLP: 18000, icon: "🧔" },
  { id: "tinte", name: "Tinte / Color", durationMin: 90, priceCLP: 35000, icon: "🎨" },
  { id: "peinado", name: "Peinado / Brushing", durationMin: 40, priceCLP: 15000, icon: "💇" },
  { id: "manicure", name: "Manicure", durationMin: 45, priceCLP: 14000, icon: "💅" },
];

export function getService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

// Formatea un precio en pesos chilenos.
export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
}

// Devuelve las próximas N fechas abiertas (según openDays).
export function getAvailableDates(count = 14): string[] {
  const dates: string[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (dates.length < count) {
    if (SALON.openDays.includes(d.getDay())) {
      dates.push(toDateKey(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

// Genera las horas disponibles (HH:MM) de un día según el horario del salón.
export function getTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = SALON.openHour; h < SALON.closeHour; h++) {
    for (let m = 0; m < 60; m += SALON.slotStepMin) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

// Clave de fecha estable AAAA-MM-DD (sin desfase de zona horaria).
export function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Muestra una fecha legible en español.
export function formatDateLong(dateKey: string): string {
  const [y, m, day] = dateKey.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  const str = d.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Normaliza un teléfono a solo dígitos con código de país (Chile por defecto).
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  // Si son 9 dígitos y empieza por 9 (móvil chileno), anteponemos 56.
  if (digits.length === 9 && digits.startsWith("9")) digits = "56" + digits;
  // Si son 8 dígitos, asumimos móvil sin el 9 -> 56 9 ...
  else if (digits.length === 8) digits = "569" + digits;
  return digits;
}

// Construye el mensaje de confirmación que la peluquería envía al cliente.
export function buildConfirmationMessage(opts: {
  clientName: string;
  serviceName: string;
  dateLabel: string;
  time: string;
}): string {
  return (
    `Hola ${opts.clientName}! 👋 Tu reserva en ${SALON.name} quedó registrada:\n\n` +
    `💇 Servicio: ${opts.serviceName}\n` +
    `📅 Fecha: ${opts.dateLabel}\n` +
    `🕐 Hora: ${opts.time}\n\n` +
    `¿Confirmas tu asistencia? Responde:\n` +
    `✅ SÍ para confirmar\n` +
    `🔁 CAMBIAR si prefieres otra hora\n\n` +
    `¡Te esperamos! 📍 ${SALON.address}`
  );
}

// Mensaje que el cliente envía a la peluquería para confirmar su propia reserva.
export function buildClientMessage(opts: {
  clientName: string;
  serviceName: string;
  dateLabel: string;
  time: string;
}): string {
  return (
    `Hola ${SALON.name}! Soy ${opts.clientName}. ` +
    `Quiero confirmar mi reserva de "${opts.serviceName}" para el ${opts.dateLabel} a las ${opts.time}. ¡Gracias!`
  );
}

// Genera un enlace wa.me con mensaje pre-cargado.
export function waMeLink(phoneDigits: string, message: string): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
