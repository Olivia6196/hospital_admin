"use client";

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, ChevronDown, CheckCircle, Phone, Mail } from 'lucide-react'
import { PageHero } from '@/app/components/main/UI'
import { toast } from 'react-toastify'
import { useLoading } from '@/hooks/useLoading'

const services = ['General Consultation', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Ophthalmology', 'Emergency Care', 'Surgery', 'Dermatology', 'Gynecology', 'Psychiatry', 'Dental Care']
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM']

type Doctor = {
  id: string
  name: string
  specialty: string
}

export default function AppointmentsPage() {
  const { showLoading, hideLoading } = useLoading();
  const [step, setStep] = useState(1)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loadingDoctors, setLoadingDoctors] = useState(false)
  
  const [form, setForm] = useState({
    service: '', 
    doctor: '', 
    date: '', 
    time: '',
    name: '', 
    email: '', 
    phone: '', 
    dob: '', 
    gender: '', 
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  // Fetch doctors when service changes
  useEffect(() => {
     showLoading();
        
        const timer = setTimeout(() => {
          hideLoading();
        }, 500);

    if (!form.service) {
      setDoctors([])
      return () => clearTimeout(timer)
    }

    const fetchDoctors = async () => {
      setLoadingDoctors(true)
      try {
        const response = await fetch(`/api/doctors?service=${encodeURIComponent(form.service)}`)
        if (!response.ok) throw new Error('Failed to fetch doctors')
        
        const data: Doctor[] = await response.json()
        setDoctors(data)
        
        if (form.doctor && !data.some(d => d.name === form.doctor)) {
          update('doctor', '')
        }
      } catch (error) {
        console.error('Error fetching doctors:', error)
        toast.error('Failed to load available doctors. Please try again.')
        setDoctors([])
      } finally {
        setLoadingDoctors(false)
      }
    }

    fetchDoctors()
  }, [form.service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error("Failed to book appointment")

      toast.success("Appointment booked successfully!")
      setSubmitted(true)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    }
  }

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-950 min-h-screen">
        <div className="bg-[url('/images/appointmentbg.jpg')] bg-cover bg-center relative">
          <PageHero title="Appointment Confirmed!" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-800 shadow-xl">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">Appointment Booked!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Your appointment has been confirmed. We'll send a reminder to <strong className="text-gray-700 dark:text-gray-300">{form.email}</strong>.</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 text-left mb-6 space-y-3">
              {[
                { label: 'Patient', value: form.name },
                { label: 'Service', value: form.service },
                { label: 'Doctor', value: form.doctor },
                { label: 'Date', value: form.date },
                { label: 'Time', value: form.time },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => { 
                setSubmitted(false); 
                setStep(1); 
                setForm({ service: '', doctor: '', date: '', time: '', name: '', email: '', phone: '', dob: '', gender: '', notes: '' })
                setDoctors([])
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/appointmentbg.jpg')] bg-cover bg-center relative">
        <PageHero
          title="Book an Appointment"
          subtitle="Schedule your visit with our specialists in just a few clicks"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="hidden md:flex items-center justify-center gap-4 mb-12">
            {[
              { n: 1, label: 'Select Service & Doctor' },
              { n: 2, label: 'Choose Date' },
              { n: 3, label: 'Your Info' },
              { n: 4, label: 'Confirm' },
            ].map(({ n, label }, i, arr) => (
              <div key={n} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step > n ? 'bg-blue-600 border-blue-600 text-white' :
                    step === n ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50' :
                    'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
                  }`}>
                    {step > n ? <CheckCircle size={16} /> : n}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium ${step === n ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
                </div>
                {i < arr.length - 1 && <div className={`h-0.5 w-12 md:w-20 -mt-3.5 ${step > n ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="p-5 md:p-8">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Service</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                    {services.map(s => (
                      <button 
                        type="button" 
                        key={s} 
                        onClick={() => {
                          update('service', s)
                          // Doctor will be cleared by useEffect
                        }}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          form.service === s
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/30'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Doctor Selection */}
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Doctor</h3>
                  {form.service ? (
                    loadingDoctors ? (
                      <div className="text-center py-12 text-gray-500">Loading available doctors...</div>
                    ) : doctors.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {doctors.map(doctor => (
                          <button
                            type="button"
                            key={doctor.id}
                            onClick={() => update('doctor', doctor.name)}
                            className={`p-6 rounded-2xl border-2 transition-all text-left ${
                              form.doctor === doctor.name
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                          >
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">{doctor.name}</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialty}</div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        No doctors available for the selected service at the moment.
                      </div>
                    )
                  ) : (
                    <div className="text-center py-12 text-gray-400 dark:text-gray-500 italic">
                      Please select a service first
                    </div>
                  )}

                  <div className="mt-10 flex justify-end">
                    <button 
                      type="button" 
                      onClick={() => setStep(2)} 
                      disabled={!form.service || !form.doctor}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Date & Time</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Preferred Date *</label>
                      <input 
                        type="date" 
                        value={form.date} 
                        onChange={e => update('date', e.target.value)} 
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Available Time Slots *</label>
                      <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                        {timeSlots.map(t => (
                          <button 
                            type="button" 
                            key={t} 
                            onClick={() => update('time', t)}
                            className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                              form.time === t
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                    <button 
                      type="button" 
                      onClick={() => setStep(3)} 
                      disabled={!form.date || !form.time}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe' },
                      { key: 'email', label: 'Email Address *', type: 'email', placeholder: 'john@example.com' },
                      { key: 'phone', label: 'Phone Number *', type: 'tel', placeholder: '+1 (555) 000-0000' },
                      { key: 'dob', label: 'Date of Birth', type: 'date', placeholder: '' },
                      { key: 'age', label: 'Age', type: 'number', placeholder: '25' }, // Note: age not in form state - add if needed
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                        <input 
                          type={type} 
                          value={(form as any)[key] || ''} 
                          onChange={e => update(key, e.target.value)} 
                          placeholder={placeholder}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                      <div className="flex gap-3">
                        {['Male', 'Female', 'Other'].map(g => (
                          <button 
                            type="button" 
                            key={g} 
                            onClick={() => update('gender', g)}
                            className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all ${
                              form.gender === g ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
                      <textarea 
                        value={form.notes} 
                        onChange={e => update('notes', e.target.value)} 
                        rows={3} 
                        placeholder="Describe your symptoms or any relevant medical history..."
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                    <button 
                      type="button" 
                      onClick={() => setStep(4)} 
                      disabled={!form.name || !form.email || !form.phone}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
                    >
                      Review Appointment
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Review & Confirm</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Appointment Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { icon: User, label: 'Service', value: form.service },
                        { icon: User, label: 'Doctor', value: form.doctor || 'Not selected' },
                        { icon: Calendar, label: 'Date', value: form.date },
                        { icon: Clock, label: 'Time', value: form.time },
                        { icon: User, label: 'Patient', value: form.name },
                        { icon: Mail, label: 'Email', value: form.email },
                        { icon: Phone, label: 'Phone', value: form.phone },
                        { icon: User, label: 'Gender', value: form.gender || 'Not specified' },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
                            <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">By confirming, you agree to our <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.</p>
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                    <button 
                      type="submit"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:scale-105"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}