"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage(result.message);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to process request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[url('/images/background-image.jpg')] bg-cover bg-center relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" />
      <section className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-500">Enter your admin email and we will send a reset link.</p>
        {message && <p className="mt-5 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">{message}</p>}
        {error && <p className="mt-5 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </label>
          <button disabled={loading} className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <Link href="/login" className="mt-6 block text-center text-sm text-blue-600 hover:underline">Back to login</Link>
      </section>
    </main>
  );
}
