import { CheckCircle, X, ArrowRight, Shield, Phone } from 'lucide-react'
import Link from 'next/link'
import { PageHero, SectionHeader } from '@/app/components/main/UI'

const plans = [
  {
    name: 'All Physicians',
    price: 900, period: 'year',
    color: 'bg-white dark:bg-gray-900',
    accent: 'text-blue-600 dark:text-blue-400',
    badge: null,
    features: [
      { label: '2 General Consultations/month', included: true },
      { label: 'Lab Tests (Basic)', included: true },
      { label: '24/7 Emergency Access', included: true },
      { label: 'Online Health Records', included: true },
      { label: 'Specialist Referrals', included: false },
      { label: 'Priority Booking', included: false },
      { label: 'Dental & Vision', included: false },
      { label: 'Mental Health Sessions', included: false },
    ]
  },
  {
    name: 'Doctor Visits',
    price: 150, period: 'month',
    color: 'bg-blue-600',
    accent: 'text-white',
    badge: 'Most Popular',
    features: [
      { label: 'Unlimited Consultations', included: true },
      { label: 'Lab Tests (Comprehensive)', included: true },
      { label: '24/7 Emergency Access', included: true },
      { label: 'Online Health Records', included: true },
      { label: 'Specialist Referrals', included: true },
      { label: 'Priority Booking', included: true },
      { label: 'Dental & Vision', included: false },
      { label: 'Mental Health Sessions', included: false },
    ]
  },
  {
    name: 'Urgent Care',
    price: 250, period: 'month',
    color: 'bg-white dark:bg-gray-900',
    accent: 'text-blue-600 dark:text-blue-400',
    badge: 'Premium',
    features: [
      { label: 'Unlimited Consultations', included: true },
      { label: 'Lab Tests (Comprehensive)', included: true },
      { label: '24/7 Emergency Access', included: true },
      { label: 'Online Health Records', included: true },
      { label: 'Specialist Referrals', included: true },
      { label: 'Priority Booking', included: true },
      { label: 'Dental & Vision', included: true },
      { label: 'Mental Health Sessions', included: true },
    ]
  },
]

const commonProcedures = [
  { name: 'General Consultation', price: '$120–$200' },
  { name: 'Blood Panel (Complete)', price: '$80–$150' },
  { name: 'X-Ray (single view)', price: '$150–$300' },
  { name: 'MRI Scan', price: '$800–$2,500' },
  { name: 'CT Scan', price: '$500–$1,800' },
  { name: 'Echocardiogram', price: '$1,000–$3,000' },
  { name: 'Colonoscopy', price: '$1,500–$3,500' },
  { name: 'Minor Surgery', price: '$2,000–$8,000' },
]

const faqs = [
  { q: 'What insurance do you accept?', a: 'We accept most major insurance plans including Blue Cross, Aetna, Cigna, UnitedHealthcare, and Medicare/Medicaid. Contact us to verify your coverage.' },
  { q: 'Are there payment plans available?', a: 'Yes, we offer flexible payment plans for qualifying patients. Our financial counselors can work with you to find a solution that fits your budget.' },
  { q: 'What does free consultation include?', a: 'Our free initial consultation includes a 15-minute meeting with a healthcare professional to discuss your symptoms and recommend next steps.' },
  { q: 'Can I upgrade my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.' },
]

export default function PricingPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/pricebg.jpg')] bg-cover bg-center relative">
      <PageHero
        title="Transparent Pricing"
        subtitle="Quality healthcare with clear, honest pricing — no surprises"
      />
      <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Plans" title="MediCore Clinic Pricing Plans" subtitle="Choose the plan that best fits your healthcare needs."/>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl overflow-hidden border ${
                plan.name === 'Doctor Visits'
                  ? 'border-blue-600 shadow-2xl shadow-blue-100 dark:shadow-blue-900/30 scale-105'
                  : 'border-gray-200 dark:border-gray-700 shadow-sm'
              } ${plan.color}`}>
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-xs font-bold uppercase tracking-wider bg-amber-400 text-white">
                    {plan.badge}
                  </div>
                )}
                <div className={`p-8 ${plan.badge ? 'pt-12' : ''}`}>
                  <h3 className={`font-display font-bold text-xl mb-1 ${plan.name === 'Doctor Visits' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{plan.name}</h3>
                  <div className={`flex items-end gap-1 mt-4 mb-6 ${plan.name === 'Doctor Visits' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    <span className="text-4xl font-display font-bold">${plan.price}</span>
                    <span className={`text-sm mb-1.5 ${plan.name === 'Doctor Visits' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>/{plan.period}</span>
                  </div>
                  <div className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <div key={f.label} className="flex items-center gap-2.5">
                        {f.included
                          ? <CheckCircle size={16} className={plan.name === 'Doctor Visits' ? 'text-blue-200 shrink-0' : 'text-blue-600 dark:text-blue-400 shrink-0'} />
                          : <X size={16} className={plan.name === 'Doctor Visits' ? 'text-blue-300/50 shrink-0' : 'text-gray-300 dark:text-gray-600 shrink-0'} />}
                        <span className={`text-sm ${
                          f.included
                            ? plan.name === 'Doctor Visits' ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                            : plan.name === 'Doctor Visits' ? 'text-blue-200/50' : 'text-gray-400 dark:text-gray-600'
                        }`}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/appointments"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${
                      plan.name === 'Doctor Visits'
                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100 dark:shadow-blue-900/20'
                    }`}>
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Procedures */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Fee Schedule" title="Common Procedure Costs" subtitle="Estimated costs for common procedures (without insurance). Actual costs vary." />
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-semibold px-6 py-3">
              <span>Procedure</span>
              <span className="text-right">Estimated Cost</span>
            </div>
            {commonProcedures.map((p, i) => (
              <div key={p.name} className={`grid grid-cols-2 px-6 py-4 text-sm border-b border-gray-100 dark:border-gray-800 last:border-0 ${i % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{p.name}</span>
                <span className="text-right text-blue-600 dark:text-blue-400 font-semibold">{p.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">*Prices are estimates. Actual costs depend on your specific case and insurance coverage.</p>
        </div>
      </section>

      {/* Insurance */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Insurance" title="We Accept Major Insurance Plans" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['Blue Cross', 'Aetna', 'Cigna', 'UnitedHealth', 'Humana', 'Medicare'].map(ins => (
              <div key={ins} className="bg-gray-50 dark:bg-gray-900 rounded-xl py-4 px-2 text-center border border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400">
                <Shield size={20} className="mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                {ins}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader badge="FAQs" title="Frequently Asked Questions"/>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{q}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <Phone size={32} className="mx-auto text-blue-600 mb-4" />
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">Have Billing Questions?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Our billing team is here to help you understand your coverage and costs.</p>
          <div className="flex justify-center gap-4">
            <a href="tel:+18001234567" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105">
              Call Billing Team
            </a>
            <Link href="/contact" className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
