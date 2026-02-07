"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type BackendShape = {
  message?: unknown;
  error?: unknown;
  msg?: unknown;
  errors?: Array<{ message?: unknown }> | unknown;
  data?: unknown;
};

type Status =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; text: string }
  | { type: "error"; text: string };

const easeOut = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOut },
  },
};

const toastVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: "blur(8px)",
    transition: { duration: 0.25, ease: easeOut },
  },
};

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function normalizeBackendMessage(raw: unknown): string {
  if (!raw) return "";
  if (typeof raw === "string") return raw;

  const obj = asRecord(raw) as BackendShape | null;
  if (!obj) return "";

  const direct =
    (typeof obj.message === "string" ? obj.message : "") ||
    (typeof obj.error === "string" ? obj.error : "") ||
    (typeof obj.msg === "string" ? obj.msg : "");

  if (direct) return direct;

  if (Array.isArray(obj.errors)) {
    const first = obj.errors[0];
    if (first && typeof first.message === "string") return first.message;
  }

  return "";
}

export default function ContactUsForm({
  onSubmit,
  title = "Question not answered yet?\nWe are here to help!",
}: {
  onSubmit?: (payload: ContactPayload) => Promise<unknown> | unknown;
  title?: string;
}) {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof ContactPayload, boolean>>({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [status, setStatus] = useState<Status>({ type: "idle" });

  const errors = useMemo(() => {
    const e: Partial<Record<keyof ContactPayload, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!form.email.trim()) e.email = "Please enter your email address.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email address.";
    if (!form.phone.trim()) e.phone = "Please enter your phone number.";
    if (!form.message.trim()) e.message = "Please enter your message.";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const update =
    (key: keyof ContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      if (status.type !== "idle") setStatus({ type: "idle" });
    };

  const markTouched = (key: keyof ContactPayload) => () =>
    setTouched((p) => ({ ...p, [key]: true }));

  const disabled = status.type === "loading";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, phone: true, message: true });

    if (hasErrors) {
      setStatus({
        type: "error",
        text: "Please fill in all required fields correctly.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const res = await onSubmit?.(form);

      const resObj = asRecord(res);
      const dataObj = resObj ? asRecord(resObj.data) : null;

      const backendMsg =
        normalizeBackendMessage(res) ||
        normalizeBackendMessage(resObj) ||
        normalizeBackendMessage(dataObj) ||
        "";

      setStatus({
        type: "success",
        text: backendMsg || "Message sent successfully.",
      });

      setForm({ name: "", email: "", phone: "", message: "" });
      setTouched({ name: false, email: false, phone: false, message: false });
    } catch (err: unknown) {
      const errObj = asRecord(err);
      const responseObj = errObj ? asRecord(errObj.response) : null;
      const responseDataObj = responseObj ? asRecord(responseObj.data) : null;

      const backendMsg =
        normalizeBackendMessage(responseDataObj) ||
        normalizeBackendMessage(errObj?.data) ||
        normalizeBackendMessage(errObj?.message) ||
        "Failed to send. Please try again.";

      setStatus({ type: "error", text: backendMsg });
    }
  };

  return (
    <section className="w-full bg-white">
      <motion.div
        className="mx-auto w-full max-w-[1300px] px-4 py-14 sm:px-6 md:py-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <motion.div variants={fadeUp} className="pt-2">
            <p className="text-2xl font-medium text-neutral-700">Contact</p>
          </motion.div>

          <div className="w-full">
            <motion.h2
              variants={fadeUp}
              className="whitespace-pre-line text-balance text-[46px] font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-[58px] md:text-[68px]"
            >
              {title}
            </motion.h2>

            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="mt-9 w-full max-w-[920px]"
            >
              <div className="space-y-8">
                <Field
                  label="Full Name"
                  value={form.name}
                  onChange={update("name")}
                  onBlur={markTouched("name")}
                  type="text"
                  name="name"
                  autoComplete="name"
                  disabled={disabled}
                  error={touched.name ? errors.name : ""}
                />

                <Field
                  label="Email"
                  value={form.email}
                  onChange={update("email")}
                  onBlur={markTouched("email")}
                  type="email"
                  name="email"
                  autoComplete="email"
                  disabled={disabled}
                  error={touched.email ? errors.email : ""}
                />

                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={update("phone")}
                  onBlur={markTouched("phone")}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  disabled={disabled}
                  error={touched.phone ? errors.phone : ""}
                />

                <TextField
                  label="Message"
                  value={form.message}
                  onChange={update("message")}
                  onBlur={markTouched("message")}
                  name="message"
                  disabled={disabled}
                  error={touched.message ? errors.message : ""}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--background-primary)] px-9 py-3.5 text-[15px] font-medium text-[var(--background-primary)] transition hover:bg-[var(--background-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 hover:ring-2 hover:ring-[var(--background-primary)]/30 duration-400 ease-in-out"
                  >
                    {disabled ? "Sending..." : "Send Message"}
                  </button>

                  <AnimatePresence mode="wait">
                    {status.type === "success" ? (
                      <motion.p
                        key="success"
                        variants={toastVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-[15px] font-medium text-emerald-600"
                      >
                        {status.text}
                      </motion.p>
                    ) : null}

                    {status.type === "error" ? (
                      <motion.p
                        key="error"
                        variants={toastVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="text-[15px] font-medium text-red-600"
                      >
                        {status.text}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type,
  name,
  autoComplete,
  disabled,
  error,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  type: string;
  name: string;
  autoComplete?: string;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="block text-[15px] font-medium text-neutral-700">{label}</span>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          disabled={disabled}
          className="mt-2 w-full border-b border-neutral-300 bg-transparent pb-1 text-[17px] text-neutral-900 outline-none transition focus:border-[var(--background-primary)] disabled:opacity-60"
        />
      </label>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key={`${name}-error`}
            variants={toastVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mt-2 text-sm font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  onBlur,
  name,
  disabled,
  error,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  name: string;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div className="w-full">
      <label className="block w-full">
        <span className="block text-[15px] font-medium text-neutral-700">{label}</span>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          rows={4}
          className="mt-3 w-full resize-y border-b border-neutral-300 bg-transparent pb-3.5 text-[17px] text-neutral-900 outline-none transition focus:border-[var(--background-primary)] disabled:opacity-60"
        />
      </label>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key={`${name}-error`}
            variants={toastVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="mt-2 text-sm font-medium text-red-600"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
