import { LucideIcon } from "lucide-react";

interface FieldShellProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export function FieldShell({ label, htmlFor, required, hint, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700  dark:text-white">
        {label}
        {required && <span className="ml-1 text-brand-500"></span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400 dark:text-black">{hint}</p>}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

const baseInputClass =
  "w-full rounded-xl border border-line-light outline-none bg-white/70 px-3.5 py-2.5 text-sm text-black placeholder:text-black transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-line-dark dark:bg-surface-dark dark:text-black dark:placeholder:text-black dark:focus:ring-brand-900";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`bg-gray-300 ${baseInputClass} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseInputClass} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`${baseInputClass} appearance-none bg-no-repeat ${props.className ?? ""}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
        backgroundPosition: "right 0.75rem center",
        backgroundSize: "1rem",
        paddingRight: "2.5rem",
      }}
    />
  );
}

export function IconBadge({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 ${className}`}>
      <Icon size={18} />
    </span>
  );
}
