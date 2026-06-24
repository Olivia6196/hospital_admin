"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";
import { StaffRole } from "@/models";
import { DEPARTMENTS, StaffApplication } from "@/lib/types";
import { FieldShell, Select, TextArea, TextInput } from "@/app/components/submain/FormField";
import { useLoading } from "@/hooks/useLoading";

const ROLE_OPTIONS: { value: StaffRole; label: string; desc: string }[] = [
  { value: "doctor", label: "Doctor", desc: "Physician or specialist" },
  { value: "nurse", label: "Nurse", desc: "Registered or licensed nurse" },
  { value: "staff", label: "Other Staff", desc: "Admin, technician, support" },
];

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  role: StaffRole;
  department: string;
  yearsOfExperience: string;
  school: string;
  bio: string;
  photoDataUrl?: string;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  role: "doctor",
  department: DEPARTMENTS[0],
  yearsOfExperience: "",
  school: "",
  bio: "",
  photoDataUrl: undefined,
};

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showLoading, hideLoading } = useLoading();
    
      useEffect(() => {
        showLoading();
        
        const timer = setTimeout(() => {
          hideLoading();
        }, 500);
        return () => clearTimeout(timer);
    
      }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photoDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Enter a phone number.";
    if (!form.yearsOfExperience || Number(form.yearsOfExperience) < 0) {
      next.yearsOfExperience = "Enter years of experience.";
    }
    if (!form.school.trim()) next.school = "Enter the school you attended.";
    if (!form.bio.trim() || form.bio.trim().length < 20) {
      next.bio = "Write at least a short sentence or two about yourself.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    const application: StaffApplication = {
      id: `app_${Date.now()}`,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      role: form.role,
      department: form.department,
      yearsOfExperience: Number(form.yearsOfExperience),
      school: form.school.trim(),
      bio: form.bio.trim(),
      photoDataUrl: form.photoDataUrl,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/staff-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!response.ok) {
        throw new Error("Application submission failed");
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert("Could not submit your application right now. Please try again.");
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
          <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint-50 text-mint-600 dark:bg-mint-500/10 dark:text-mint-400">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            Application received
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Thanks, {form.fullName.split(" ")[0]}. Our admin team will review your details and
            email you at <span className="font-medium text-gray-700 dark:text-gray-300">{form.email}</span> once
            you are approved. You will then be able to create your account password and
            access your dashboard.
          </p>
          <button
            onClick={() => router.push("/doctors")}
            className="mt-8 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-black/90 dark:text-white transition-all hover:bg-brand-700 hover:scale-105"
          >
            Back to Doctors
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen ">
       <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
              Staff application
            </p>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
              Tell us about yourself
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We will review your application and reach out by email with next steps.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-3xl border border-line-light bg-white dark:bg-blue-950/30 p-6 shadow-soft sm:p-8"
          >
            <div className="flex items-center justify-center gap-4 mb-20 mt-8">
              <div className="relative h-25 w-25 shrink-0 overflow-hidden rounded-full border border-black dark:border-white">
                {form.photoDataUrl ? (
                  <img src={form.photoDataUrl} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-black dark:text-white">
                    <UploadCloud size={20} />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="photo"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black bg-white dark:bg-transparent backdrop-blur-2xl px-3.5 py-2 text-sm font-medium text-black/80 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-line-dark dark:bg-surface-dark dark:text-gray-300 dark:hover:border-brand-500 dark:hover:text-brand-400"
                >
                  <UploadCloud size={14} />
                  Upload photo
                </label>
                <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">JPG or PNG, optional but recommended.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Full name" htmlFor="fullName" required error={errors.fullName}>
                <TextInput
                  id="fullName"
                  placeholder="Dr. Amara Okeke"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Email address" htmlFor="email" required error={errors.email}>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </FieldShell>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Phone number" htmlFor="phone" required error={errors.phone}>
                <TextInput
                  id="phone"
                  type="tel"
                  placeholder=" 800 000 0000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </FieldShell>
              <FieldShell label="Years of experience" htmlFor="years" required error={errors.yearsOfExperience}>
                <TextInput
                  id="years"
                  type="number"
                  min={0}
                  placeholder="5"
                  value={form.yearsOfExperience}
                  onChange={(e) => update("yearsOfExperience", e.target.value)}
                />
              </FieldShell>
            </div>

            <FieldShell label="I am applying as a" htmlFor="role" required>
              <div className="grid grid-cols-3 gap-3">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => update("role", opt.value)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      form.role === opt.value
                        ? "border-brand-500 bg-brand-50 bg-white ring ring-brand-100 dark:bg-brand-950 dark:ring-brand-900"
                        : "border-line-light bg-white/70 hover:border-brand-300 dark:border-line-dark dark:bg-surface-dark dark:hover:border-brand-600"
                    }`}
                  >
                    <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </FieldShell>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldShell label="Department" htmlFor="department" required>
                <Select
                  id="department"
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </FieldShell>
              <FieldShell label="School attended" htmlFor="school" required error={errors.school}>
                <TextInput
                  id="school"
                  placeholder="Harvard Medical School"
                  value={form.school}
                  onChange={(e) => update("school", e.target.value)}
                />
              </FieldShell>
            </div>

            <FieldShell
              label="Short bio"
              htmlFor="bio"
              required
              hint="A couple of sentences about your background and interests."
              error={errors.bio}
            >
              <TextArea
                id="bio"
                rows={4}
                placeholder="Tell us a little about yourself..."
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
              />
            </FieldShell>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full md:w-40 mx-auto items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white bg-blue-700 transition-all hover:bg-blue-900 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
