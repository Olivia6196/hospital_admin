"use client";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export default function AddPatientForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    ward: "",
    doctor: "",
    admitDate: "",
    status: "Admitted",
    address: "",
    bloodGroup: "",
    contact: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          admitDate: formData.admitDate
            ? new Date(formData.admitDate)
            : new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add patient");
        return;
      }

      toast.success("Patient added successfully 🎉");

      setFormData({
        name: "",
        age: "",
        gender: "",
        condition: "",
        ward: "",
        doctor: "",
        admitDate: "",
        status: "Admitted",
        address: "",
        bloodGroup: "",
        contact: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7 px-3 md:p-6">
      <Header
        title="Patient Registration Form"
        subtitle="Register and admit a new patient into the hospital system"
      />
      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 px-3 md:px-8">
        {/* Patient Information */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Patient Information
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Basic demographic and contact details.
          </p>
        </div>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
          required
        />

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        >
          <option
            value=""
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Select Blood Group
          </option>

          <option
            value="A+"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            A+
          </option>
          <option
            value="A-"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            A-
          </option>
          <option
            value="B+"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            B+
          </option>
          <option
            value="B-"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            B-
          </option>
          <option
            value="AB+"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            AB+
          </option>
          <option
            value="AB-"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            AB-
          </option>
          <option
            value="O+"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            O+
          </option>
          <option
            value="O-"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            O-
          </option>
        </select>

        <input
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="md:col-span-2 border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        />

        {/* Medical Information */}
        <div className="md:col-span-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 pt-5 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Medical Information
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Admission and treatment details.
          </p>
        </div>

        <input
          name="condition"
          placeholder="Medical Condition"
          value={formData.condition}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        >
          <option
            value=""
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Gender (Optional)
          </option>
          <option
            value="Male"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Male
          </option>
          <option
            value="Female"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Female
          </option>
          <option
            value="Other"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Other
          </option>
        </select>

        <input
          name="ward"
          placeholder="Ward"
          value={formData.ward}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
          required
        />

        <input
          name="doctor"
          placeholder="Doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
          required
        />

        <input
          type="date"
          name="admitDate"
          value={formData.admitDate}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-white text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-1 focus:ring-blue-800"
        >
          <option
            value="Admitted"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Admitted
          </option>
          <option
            value="Outpatient"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Outpatient
          </option>
          <option
            value="Discharged"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Discharged
          </option>
          <option
            value="Critical"
            className="bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            Critical
          </option>
        </select>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3 border-t rounded-2xl border-zinc-200 dark:border-zinc-800 pt-5 mt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/patients")}
            className="px-5 py-3 bg-blue-900 dark:bg-white font-medium text-white dark:text-blue-900 rounded-lg hover:opacity-70 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-blue-900 hover:bg-blue-700 font-medium text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Patient..." : "Add Patient"}
          </button>
        </div>
      </form>
    </div>
  );
}
