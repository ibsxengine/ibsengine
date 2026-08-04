"use client";

import { FORMSPREE_ENDPOINT } from "@/lib/constants";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";

type FormStatus = "idle" | "submitting" | "success" | "error";

const NEEDS = [
  "Web y captación",
  "WhatsApp / citas",
  "CRM y control",
  "App sectorial",
  "Auditoría general",
];

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [need, setNeed] = useState(NEEDS[4]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("interes", need);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="contact-form-success relative overflow-hidden rounded-sm border border-[#d4dce8] bg-[#f0f4f8] p-8 text-center"
      >
        <p className="font-serif relative text-xl font-semibold text-[#15325b]">
          Mensaje enviado
        </p>
        <p className="relative mt-2 text-sm text-[#5a6a7e]">
          Te contactaremos en breve. Gracias por escribirnos.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-1.5 block text-[0.7rem]">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="form-shell-input"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow mb-1.5 block text-[0.7rem]">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="form-shell-input"
            placeholder="600 000 000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="eyebrow mb-1.5 block text-[0.7rem]">
          Email <span className="font-sans normal-case tracking-normal text-[#5a6a7e]">(opcional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="form-shell-input"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="sector" className="eyebrow mb-1.5 block text-[0.7rem]">
          ¿A qué se dedica tu negocio?
        </label>
        <input
          id="sector"
          name="sector"
          type="text"
          className="form-shell-input"
          placeholder="Ej. peluquería, gestoría, ecommerce, clínica…"
        />
      </div>

      <div>
        <p className="eyebrow mb-2 text-[0.7rem]">¿Qué necesitas?</p>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNeed(n)}
              className={`form-shell-chip ${need === n ? "is-active" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <input type="hidden" name="message" value={`Interés: ${need}.`} />
      </div>

      <div>
        <label htmlFor="notes" className="eyebrow mb-1.5 block text-[0.7rem]">
          Cuéntanos más
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="form-shell-input resize-none"
          placeholder="Breve descripción de tu situación actual…"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="gold" className="w-full sm:w-auto">
          {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
        </Button>
        <p className="text-[10px] text-[#5a6a7e]">
          Respuesta en menos de 24h · Sin compromiso
        </p>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          No se pudo enviar. Escríbenos directamente por WhatsApp.
        </p>
      )}
    </form>
  );
}
