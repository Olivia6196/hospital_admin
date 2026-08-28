"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
export default function AdminLoginPage() {
  const { status } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <section className="min-h-screen bg-[url('/images/background-image.jpg')] bg-cover bg-center relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/hospital-logo.png"
              alt="Hospital Logo"
              width={50}
              height={50}
            />

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>

              <p className="text-sm text-gray-500">
                Hospital Management Dashboard
              </p>
            </div>
          </div>
        </div>
         {error && (
          <p className="text-red-700 bg-red-100 rounded-lg text-center px-4 py-6">
            {error}
          </p>
        )}

        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              setLoading(true);
              setError("");
              const res = await signIn("credentials", {
                ...formData,
                redirect: false,
              });

              if (!res || !res.ok) {
                setError(res?.error || "Invalid credentials");
                router.push("/");
                return;
              }

              router.push("/dashboard");
            } catch (err) {
              console.log(err);
              setError("An unexpected error occurred");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure access for authorized hospital administrators only.
        </p>
        <div className="text-center mt-4">
          <a href="/" className="text-blue-600 hover:underline">
            Go Back
          </a>
        </div>
      </div>
    </section>
  );
}
