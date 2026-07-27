export type AppointmentStatus = "pendiente" | "confirmada" | "reagendar";

export interface Service {
  id: string;
  name: string;
  durationMin: number;
  priceCLP: number;
  icon: string;
}

// Datos de una reserva antes de guardarse.
export interface AppointmentDraft {
  serviceId: string;
  serviceName: string;
  priceCLP: number;
  durationMin: number;
  clientName: string;
  whatsapp: string; // tal como lo escribió el cliente
  date: string; // AAAA-MM-DD
  time: string; // HH:MM
}

export interface StoredAppointment extends AppointmentDraft {
  id: string;
  status: AppointmentStatus;
  createdAt: string;
}
