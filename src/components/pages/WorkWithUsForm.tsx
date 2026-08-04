"use client";

import { FORMSPREE_CAREERS_ENDPOINT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

export function WorkWithUsForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("_subject", "Candidatura — Trabaja con nosotros");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CAREERS_ENDPOINT}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-gold-from/25 bg-navy-alt/50 p-8 text-center"
      >
        <p className="font-serif text-xl text-off-white">Candidatura enviada</p>
        <p className="text-text-secondary mt-2 text-sm">Revisaremos tu perfil y te contactaremos.</p>
      </motion.div>
    );
  }

  const field =
    "w-full rounded-sm border border-white/10 bg-navy/80 px-4 py-3.5 text-sm text-off-white placeholder:text-text-secondary/50 transition-colors focus:border-gold-to/40 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input name="nombre" type="text" required placeholder="Nombre completo" className={field} />
      <input name="email" type="email" required placeholder="Email" className={field} />
      <input name="telefono" type="tel" placeholder="Teléfono" className={field} />
      <input name="puesto" type="text" required placeholder="Especialidad / puesto" className={field} />
      <textarea
        name="mensaje"
        rows={3}
        placeholder="Cuéntanos sobre ti y tu experiencia…"
        className={`${field} resize-none`}
      />
      <div>
        <p className="eyebrow mb-2 text-[0.65rem]">Currículum (PDF)</p>
        <input
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full text-sm text-text-secondary file:mr-3 file:rounded-sm file:border file:border-white/15 file:bg-white/5 file:px-3 file:py-2 file:text-xs file:text-off-white"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {status === "submitting" ? "Enviando…" : "Enviar candidatura"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-400">No se pudo enviar. Escríbenos a info@ibsengine.com</p>
      )}
    </form>
  );
}
