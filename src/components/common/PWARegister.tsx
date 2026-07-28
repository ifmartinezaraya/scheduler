"use client";

import { useEffect } from "react";

// Registra el service worker para habilitar la instalación como app (PWA).
export function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const register = () =>
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* silencioso: la app funciona igual sin SW */
        });
      if (document.readyState === "complete") register();
      else window.addEventListener("load", register);
    }
  }, []);

  return null;
}
