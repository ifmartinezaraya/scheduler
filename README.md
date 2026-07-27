# Studio Aura · Reservador de citas

MVP de **reservador de citas para peluquería** con confirmación por **WhatsApp**. El cliente elige servicio, día y hora, deja su nombre y WhatsApp, y recibe/envía la confirmación por WhatsApp. Incluye un **panel** para que la peluquería gestione las reservas.

> Proyecto de demostración para una peluquería ficticia (**Studio Aura**). Basado en [NextAppointments](https://github.com/ajdichmann/nextappointments).

## ✨ Funcionalidades

- **Reserva en 4 pasos:** servicio → fecha y hora → datos (nombre + WhatsApp) → revisar.
- **Horarios inteligentes:** solo días/horas abiertos; los horarios ya reservados se marcan como ocupados.
- **Confirmación por WhatsApp (Fase 1):** genera un enlace `wa.me` con el mensaje pre-cargado (sin necesidad de API ni aprobación).
- **Panel de la peluquería** (`/panel`): lista de reservas, estados (pendiente / confirmada / reagendar) y botón para **enviar la confirmación al cliente** por WhatsApp (con opción de confirmar asistencia o reagendar).
- Persistencia local en el navegador (`localStorage`) — ideal para un MVP sin backend.

## 🛠 Tecnología

Next.js 14 · React 18 · TypeScript · Tailwind CSS

## 🚀 Puesta en marcha

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` (reserva) y `http://localhost:3000/panel` (panel).

## ⚙️ Configuración

Edita `src/lib/salon.ts` para adaptarlo a una peluquería real:

- `SALON.name`, `tagline`, `address`
- `SALON.whatsapp` → número de la peluquería (formato internacional, solo dígitos)
- `SALON.openDays`, `openHour`, `closeHour`, `slotStepMin` → horarios
- `SERVICES` → servicios, duración y precios

## 🗺️ Roadmap (siguientes fases)

- **Fase 2:** envío 100% automático con la **WhatsApp Business Cloud API** (o Twilio) y botones interactivos "Confirmar / Reagendar".
- **Fase 3:** cuentas de usuario, base de datos y recordatorios automáticos previos a la cita.

## 📦 Despliegue

Optimizado para **[Vercel](https://vercel.com)** (creadores de Next.js): conecta el repositorio y despliega sin configuración. También compatible con Netlify o cualquier hosting Node.

## Licencia

Basado en NextAppointments. Revisa la licencia del proyecto original.
