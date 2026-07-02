"use client";
import { useEffect, useState } from "react";
import { PageHero } from "@/app/components/main/UI";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useLoading } from "@/hooks/useLoading";
const locations = [
  {
    name: "Main Hospital",
    address: "123 Medical Center Drive, New York, NY 10001",
    phone: "+1 (800) 123-4567",
    hours: "Open 24/7",
  },
  {
    name: "Downtown Clinic",
    address: "456 Park Avenue, New York, NY 10022",
    phone: "+1 (800) 123-4568",
    hours: "Mon–Fri: 8am–8pm",
  },
  {
    name: "Brooklyn Center",
    address: "789 Atlantic Ave, Brooklyn, NY 11217",
    phone: "+1 (800) 123-4569",
    hours: "Mon–Sat: 9am–6pm",
  },
];
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const { showLoading, hideLoading } = useLoading();
    
      useEffect(() => {
        showLoading();
        
        const timer = setTimeout(() => {
          hideLoading();
        }, 500);
    return () => clearTimeout(timer);
      }, []);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-linear-to-tr from-blue-600 via-blue-800 to-blue-700">
        <PageHero
          title="Contact Us"
          subtitle="We're here to help. Reach out to us with any questions or concerns."
        />
      </div>

      {/* Contact Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            {
              icon: Phone,
              color:
                "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
              title: "Phone",
              lines: ["+1 (800) 123-4567", "Available 24/7"],
            },
            {
              icon: Mail,
              color:
                "bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400",
              title: "Email",
              lines: ["liviacorehospital@gmail.com", "We reply within 24 hours"],
            },
            {
              icon: MapPin,
              color:
                "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400",
              title: "Address",
              lines: ["123 Medical Center Drive", "New York, NY 10001"],
            },
          ].map(({ icon: Icon, color, title, lines }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}
              >
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-1">
                  {title}
                </h3>
                {lines.map((l, i) => (
                  <p
                    key={i}
                    className={`text-sm ${i === 0 ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-400 dark:text-gray-500"}`}
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle
                    size={32}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        placeholder="How can we help?"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:scale-[1.02]"
                  >
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Locations */}
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Locations
            </h2>
            <div className="space-y-4 mb-6">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
                      <MapPin
                        size={18}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {loc.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
                        {loc.address}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Phone size={12} /> {loc.phone}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                          <Clock size={12} /> {loc.hours}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-64 flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2916.104459774284!2d-76.0255325!3d43.0392336!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d98c4ec349f607%3A0x4d0551707cc269b5!2sNorthEast%20Medical%20center!5e0!3m2!1sen!2sng!4v1781306932809!5m2!1sen!2sng"
                width="600"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Office Hours
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            {[
              {
                day: "Monday – Friday",
                hours: "8:00 AM – 8:00 PM",
                status: "Open",
              },
              { day: "Saturday", hours: "9:00 AM – 6:00 PM", status: "Open" },
              { day: "Sunday", hours: "10:00 AM – 4:00 PM", status: "Limited" },
              {
                day: "Emergency Care",
                hours: "24 hours / 7 days",
                status: "Always Open",
              },
            ].map(({ day, hours, status }, i) => (
              <div
                key={day}
                className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 ${i % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""}`}
              >
                <span className="font-medium text-gray-900 dark:text-white text-sm">
                  {day}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {hours}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      status === "Always Open"
                        ? "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400"
                        : status === "Open"
                          ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                          : "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
