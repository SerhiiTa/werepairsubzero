"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FormEvent,
  useEffect,
} from "react";
import { X, CheckCircle } from "lucide-react";

interface BookingContextType {
  openModal: () => void;
}
const BookingContext = createContext<BookingContextType>({ openModal: () => {} });
export const useBookingModal = () => useContext(BookingContext);

const BOT_TOKEN = "7729286289:AAHLTyOGP7cs6K_GXCHsR1BFkMkOhzp3ovM";
const CHAT_ID = "444284470";

const TIME_SLOTS = [
  { value: "Morning 8am–12pm", label: "Morning (8am – 12pm)" },
  { value: "Afternoon 12pm–3pm", label: "Afternoon (12pm – 3pm)" },
  { value: "Late Afternoon 3pm–6pm", label: "Late Afternoon (3pm – 6pm)" },
];

const emptyForm = {
  name: "",
  phone: "",
  address: "",
  zip: "",
  issue: "",
  date: "",
  time: TIME_SLOTS[0].value,
};

type FormField = keyof typeof emptyForm;
type Touched = Record<FormField, boolean>;

const allUntouched: Touched = {
  name: false, phone: false, address: false,
  zip: false, issue: false, date: false, time: false,
};
const allTouched: Touched = {
  name: true, phone: true, address: true,
  zip: true, issue: true, date: true, time: true,
};

// ── helpers ──────────────────────────────────────────────────────────────────

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function isSunday(dateStr: string) {
  if (!dateStr) return false;
  return new Date(dateStr + "T00:00:00").getDay() === 0;
}

function formatDate(dateStr: string) {
  if (!dateStr) return dateStr;
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ── validators ───────────────────────────────────────────────────────────────

const validate: Record<FormField, (v: string) => string> = {
  name: (v) => {
    if (!v.trim()) return "Name is required.";
    if (!/^[a-zA-Z\s]{2,}$/.test(v.trim())) return "At least 2 characters, letters only.";
    return "";
  },
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "Phone is required.";
    if (digits.length < 10) return "Enter at least 10 digits.";
    return "";
  },
  address: (v) => {
    if (!v.trim()) return "Address is required.";
    if (v.trim().length < 5) return "At least 5 characters required.";
    return "";
  },
  zip: (v) => {
    if (!v) return "ZIP code is required.";
    if (!/^\d{5}$/.test(v)) return "Enter a valid 5-digit ZIP code.";
    return "";
  },
  issue: (v) => {
    if (!v.trim()) return "Please describe the issue.";
    if (v.trim().length < 10) return "At least 10 characters required.";
    return "";
  },
  date: (v) => {
    if (!v) return "Please select a date.";
    if (isSunday(v)) return "We're closed on Sundays. Please select Mon – Sat.";
    return "";
  },
  time: (v) => {
    if (!v) return "Please select a time slot.";
    return "";
  },
};

function getErrors(form: typeof emptyForm): Record<FormField, string> {
  return Object.fromEntries(
    (Object.keys(form) as FormField[]).map((k) => [k, validate[k](form[k])])
  ) as Record<FormField, string>;
}

function isFormValid(form: typeof emptyForm): boolean {
  return (Object.keys(form) as FormField[]).every((k) => validate[k](form[k]) === "");
}

// ── provider + modal UI ───────────────────────────────────────────────────────

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState<Touched>(allUntouched);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setSuccess(false);
    setForm(emptyForm);
    setTouched(allUntouched);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const touch = (field: FormField) => () =>
    setTouched((t) => ({ ...t, [field]: true }));

  const set = (field: FormField) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const raw = e.target.value;
    const val = field === "phone" ? formatPhone(raw) : raw;
    setForm((f) => ({ ...f, [field]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(allTouched);
    if (!isFormValid(form)) return;

    const text =
      `🔧 New Booking — WeRepairSubZero\n\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📍 Address: ${form.address}, ZIP: ${form.zip}\n` +
      `📅 Date: ${formatDate(form.date)}, Time: ${form.time}\n` +
      `🔧 Issue: ${form.issue}`;

    setSubmitting(true);
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      });
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  };

  const errors = getErrors(form);

  const fieldClass = (field: FormField) => {
    const hasError = touched[field] && errors[field];
    return [
      "w-full border rounded-lg px-3.5 py-2.5 text-[#1E293B] text-sm",
      "focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-slate-400 transition",
      hasError
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-slate-200 focus:ring-[#1D4ED8]",
    ].join(" ");
  };

  const ErrorMsg = ({ field }: { field: FormField }) =>
    touched[field] && errors[field] ? (
      <p className="text-red-500 text-xs mt-1 leading-snug">{errors[field]}</p>
    ) : null;

  return (
    <BookingContext.Provider value={{ openModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-2xl flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 z-10">
              <div>
                <h2 className="text-xl font-black text-[#1E293B]">Book a Service Appointment</h2>
                <p className="text-sm text-slate-500 mt-0.5">Mon – Sat · 7:00 AM – 7:00 PM</p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-6">
              {success ? (
                <div className="text-center py-10">
                  <CheckCircle size={52} className="text-[#1D4ED8] mx-auto mb-4" />
                  <h3 className="text-xl font-black text-[#1E293B] mb-2">Thank you!</h3>
                  <p className="text-slate-500">We&apos;ll confirm your appointment shortly.</p>
                  <button
                    onClick={closeModal}
                    className="mt-8 bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#1e40af] transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={set("name")}
                        onBlur={touch("name")}
                        className={fieldClass("name")}
                      />
                      <ErrorMsg field="name" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="(713) 000-0000"
                        value={form.phone}
                        onChange={set("phone")}
                        onBlur={touch("phone")}
                        className={fieldClass("phone")}
                      />
                      <ErrorMsg field="phone" />
                    </div>
                  </div>

                  {/* Address + ZIP */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Address *
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St, Houston"
                        value={form.address}
                        onChange={set("address")}
                        onBlur={touch("address")}
                        className={fieldClass("address")}
                      />
                      <ErrorMsg field="address" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        ZIP *
                      </label>
                      <input
                        type="text"
                        placeholder="77001"
                        maxLength={5}
                        value={form.zip}
                        onChange={set("zip")}
                        onBlur={touch("zip")}
                        className={fieldClass("zip")}
                      />
                      <ErrorMsg field="zip" />
                    </div>
                  </div>

                  {/* Issue */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Describe the Issue *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Fridge not cooling, ice maker not working…"
                      value={form.issue}
                      onChange={set("issue")}
                      onBlur={touch("issue")}
                      className={fieldClass("issue") + " resize-none"}
                    />
                    <div className="flex justify-between items-start">
                      <ErrorMsg field="issue" />
                      <span className={`text-xs ml-auto mt-1 ${form.issue.trim().length < 10 ? "text-slate-400" : "text-green-500"}`}>
                        {form.issue.trim().length}/10
                      </span>
                    </div>
                  </div>

                  {/* Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Preferred Date * (Mon – Sat)
                      </label>
                      <input
                        type="date"
                        min={getMinDate()}
                        value={form.date}
                        onChange={set("date")}
                        onBlur={touch("date")}
                        className={fieldClass("date")}
                      />
                      <ErrorMsg field="date" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Preferred Time *
                      </label>
                      <select
                        value={form.time}
                        onChange={set("time")}
                        onBlur={touch("time")}
                        className={fieldClass("time") + " bg-white cursor-pointer"}
                      >
                        <option value="">— select —</option>
                        {TIME_SLOTS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <ErrorMsg field="time" />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#1D4ED8] text-white py-3.5 rounded-lg font-bold text-base hover:bg-[#1e40af] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending…" : "Request Appointment"}
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-3">
                      We&apos;ll call to confirm within 30 minutes.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
