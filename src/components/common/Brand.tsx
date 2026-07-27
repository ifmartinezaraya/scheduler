import { SALON } from "@/lib/salon";

// Marca AURA: pincelada sumi-e (inspiración dinámica tipo Nike, minimalismo japonés) + wordmark.
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 rounded-lg bg-coffee-900 flex items-center justify-center">
        <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M9 41 Q 33 55 57 15 Q 41 33 25 35 Q 15 36 9 30 Z" fill="#e0d0bd" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-xl font-extrabold uppercase tracking-[0.18em] text-coffee-ink">
          Aura
        </span>
        {!compact && (
          <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-coffee-400 mt-0.5">
            {SALON.tagline}
          </span>
        )}
      </span>
    </div>
  );
}
