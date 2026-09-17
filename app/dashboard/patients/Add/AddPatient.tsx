"use client";

import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Option {
  id: string;
  name: string;
}

export default function AddPatientForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [wards, setWards] = useState<Option[]>([]);
  const [doctors, setDoctors] = useState<Option[]>([]);
  const [fetchingOptions, setFetchingOptions] = useState(true);

  // Auto-generate a preview Patient ID
  const generatePatientId = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000);
    return `PAT-${year}${month}${day}-${random}`;
  };

  const [formData, setFormData] = useState({
    patientId: generatePatientId(),
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
    emergencyContactName: "",
    emergencyContactPhone: "",
    allergies: "",
    notes: "",
  });

  // Fetch Wards & Doctors
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setFetchingOptions(true);

        const [wardsRes, doctorsRes] = await Promise.all([
          fetch("/api/wards"),
          fetch("/api/doctors"),
        ]);

        if (wardsRes.ok) {
          const wardsData = await wardsRes.json();
          setWards(wardsData.data || wardsData || []);
        }

        if (doctorsRes.ok) {
          const doctorsData = await doctorsRes.json();
          setDoctors(doctorsData.data || doctorsData || []);
        }
      } catch (error) {
        console.error("Failed to load wards/doctors", error);
        // Fallback mock data (remove in production)
        setWards([
          { id: "1", name: "General Ward" },
          { id: "2", name: "ICU" },
          { id: "3", name: "Pediatric Ward" },
          { id: "4", name: "Maternity Ward" },
          { id: "5", name: "Surgical Ward" },
        ]);
        setDoctors([
          { id: "1", name: "Dr. Adebayo Okonkwo" },
          { id: "2", name: "Dr. Chioma Eze" },
          { id: "3", name: "Dr. Ibrahim Musa" },
          { id: "4", name: "Dr. Fatima Bello" },
          { id: "5", name: "Dr. Tunde Adeyemi" },
        ]);
      } finally {
        setFetchingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.age || Number(formData.age) <= 0) {
      toast.error("Please enter a valid age");
      return false;
    }
    if (!formData.bloodGroup) {
      toast.error("Please select a blood group");
      return false;
    }
    if (!formData.condition.trim()) {
      toast.error("Medical condition is required");
      return false;
    }
    if (!formData.ward) {
      toast.error("Please select a ward");
      return false;
    }
    if (!formData.doctor) {
      toast.error("Please select a doctor");
      return false;
    }
    if (
      formData.contact &&
      !/^\d{10,15}$/.test(formData.contact.replace(/\D/g, ""))
    ) {
      toast.error("Please enter a valid contact number");
      return false;
    }
    if (
      formData.emergencyContactPhone &&
      !/^\d{10,15}$/.test(formData.emergencyContactPhone.replace(/\D/g, ""))
    ) {
      toast.error("Please enter a valid emergency contact number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

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
          // Backend can override patientId if needed
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add patient");
        return;
      }

      toast.success(`Patient ${formData.patientId} added successfully 🎉`);

      // Reset form with new Patient ID
      setFormData({
        patientId: generatePatientId(),
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
        emergencyContactName: "",
        emergencyContactPhone: "",
        allergies: "",
        notes: "",
      });

      setTimeout(() => {
        router.push("/dashboard/patients");
      }, 1300);
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

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2 px-3 md:px-8"
      >
        {/* Patient Information */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Patient Information
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Basic demographic and contact details.
          </p>
        </div>

        {/* Auto-generated Patient ID */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Patient ID
          </label>
          <input
            name="patientId"
            value={formData.patientId}
            readOnly
            className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 p-3 rounded-lg outline-none cursor-not-allowed font-mono"
          />
          <p className="text-xs text-zinc-500">Auto-generated (can be overridden by system)</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            name="age"
            type="number"
            min="0"
            max="150"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Select Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option
                key={bg}
                value={bg}
                className="bg-white text-black dark:bg-zinc-900 dark:text-white"
              >
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Contact Number
          </label>
          <input
            name="contact"
            type="tel"
            placeholder="e.g. 08012345678"
            value={formData.contact}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Address
          </label>
          <input
            name="address"
            placeholder="Home address"
            value={formData.address}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Emergency Contact */}
        <div className="md:col-span-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 pt-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Emergency Contact
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Person to contact in case of emergency.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Emergency Contact Name
          </label>
          <input
            name="emergencyContactName"
            placeholder="Full name of emergency contact"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Emergency Contact Phone
          </label>
          <input
            name="emergencyContactPhone"
            type="tel"
            placeholder="e.g. 08098765432"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Medical Information */}
        <div className="md:col-span-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 pt-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Medical Information
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Admission and treatment details.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Medical Condition <span className="text-red-500">*</span>
          </label>
          <input
            name="condition"
            placeholder="e.g. Malaria, Fracture, etc."
            value={formData.condition}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Select Gender (Optional)
            </option>
            <option value="Male" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Male
            </option>
            <option value="Female" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Female
            </option>
            <option value="Other" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Other
            </option>
          </select>
        </div>

        {/* Ward Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Ward <span className="text-red-500">*</span>
          </label>
          <select
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            required
            disabled={fetchingOptions}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
          >
            <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              {fetchingOptions ? "Loading wards..." : "Select Ward"}
            </option>
            {wards.map((ward) => (
              <option
                key={ward.id}
                value={ward.name}
                className="bg-white text-black dark:bg-zinc-900 dark:text-white"
              >
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Attending Doctor <span className="text-red-500">*</span>
          </label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            disabled={fetchingOptions}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
          >
            <option value="" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              {fetchingOptions ? "Loading doctors..." : "Select Doctor"}
            </option>
            {doctors.map((doc) => (
              <option
                key={doc.id}
                value={doc.name}
                className="bg-white text-black dark:bg-zinc-900 dark:text-white"
              >
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Admission Date
          </label>
          <input
            type="date"
            name="admitDate"
            value={formData.admitDate}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="Admitted" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Admitted
            </option>
            <option value="Outpatient" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Outpatient
            </option>
            <option value="Discharged" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Discharged
            </option>
            <option value="Critical" className="bg-white text-black dark:bg-zinc-900 dark:text-white">
              Critical
            </option>
          </select>
        </div>

        {/* Allergies */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Allergies
          </label>
          <textarea
            name="allergies"
            placeholder="List any known allergies (e.g. Penicillin, Peanuts, Latex...)"
            value={formData.allergies}
            onChange={handleChange}
            rows={3}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Additional Notes
          </label>
          <textarea
            name="notes"
            placeholder="Any additional medical notes or observations..."
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="border border-zinc-300 dark:border-zinc-700 bg-transparent dark:bg-white/10 backdrop-blur-md placeholder:text-zinc-400 text-zinc-900 dark:text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-5 mt-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/patients")}
            disabled={loading}
            className="px-5 py-3 bg-zinc-200 dark:bg-zinc-800 font-medium text-zinc-800 dark:text-white rounded-lg hover:opacity-80 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || fetchingOptions}
            className="px-6 py-3 bg-blue-900 hover:bg-blue-800 font-medium text-white rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Patient...
              </>
            ) : (
              "Add Patient"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}