import { AppointmentDraft, AppointmentStatus, StoredAppointment } from "./types";

const STORAGE_KEY = "studio_aura_appointments";

export const storage = {
  save: (draft: AppointmentDraft): StoredAppointment => {
    const all = storage.getAll();
    const appt: StoredAppointment = {
      ...draft,
      id: crypto.randomUUID(),
      status: "pendiente",
      createdAt: new Date().toISOString(),
    };
    all.push(appt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return appt;
  },

  getAll: (): StoredAppointment[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as StoredAppointment[]) : [];
  },

  // Comprueba si un horario (fecha + hora) ya está ocupado.
  isTaken: (date: string, time: string): boolean => {
    return storage.getAll().some((a) => a.date === date && a.time === time && a.status !== "reagendar");
  },

  updateStatus: (id: string, status: AppointmentStatus): void => {
    const all = storage.getAll().map((a) => (a.id === id ? { ...a, status } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  remove: (id: string): void => {
    const all = storage.getAll().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
