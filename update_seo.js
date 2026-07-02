const fs = require('fs');
const path = require('path');

const metadataMap = {
  'app/(frontend)/page.tsx': {
    title: 'LiviaCore Hospital — Comprehensive Healthcare Services',
    description: 'Discover expert medical services, patient-centered care, and 24/7 support at LiviaCore Hospital.',
  },
  'app/(frontend)/about/page.tsx': {
    title: 'About LiviaCore Hospital — Mission and Care',
    description: 'Learn about LiviaCore Hospital’s mission, history, and healthcare commitment to patients and the community.',
  },
  'app/(frontend)/services/page.tsx': {
    title: 'LiviaCore Hospital Services — Specialized Healthcare',
    description: 'Explore our medical specialties, from cardiology to emergency care, at LiviaCore Hospital.',
  },
  'app/(frontend)/doctors/page.tsx': {
    title: 'Find Doctors at LiviaCore Hospital',
    description: 'Browse experienced hospital specialists and book appointments with LiviaCore Hospital doctors.',
  },
  'app/(frontend)/appointments/page.tsx': {
    title: 'Book Appointments at LiviaCore Hospital',
    description: 'Schedule a medical appointment with LiviaCore Hospital’s expert care team online.',
  },
  'app/(frontend)/blog/page.tsx': {
    title: 'LiviaCore Hospital Blog — Health News and Tips',
    description: 'Read the latest health advice, medical updates, and wellness articles from LiviaCore Hospital.',
  },
  'app/(frontend)/contact/page.tsx': {
    title: 'Contact LiviaCore Hospital',
    description: 'Get in touch with LiviaCore Hospital for appointments, support, and patient services.',
  },
  'app/(frontend)/apply/page.tsx': {
    title: 'Apply to Join LiviaCore Hospital',
    description: 'Submit a staff application to join the LiviaCore Hospital team and advance your healthcare career.',
  },
  'app/(frontend)/pricing/page.tsx': {
    title: 'LiviaCore Hospital Pricing — Affordable Care Plans',
    description: 'Review healthcare pricing, service packages, and payment options available at LiviaCore Hospital.',
  },
  'app/login/page.tsx': {
    title: 'Admin Login — LiviaCore Hospital',
    description: 'Secure admin access to the LiviaCore Hospital dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/page.tsx': {
    title: 'LiviaCore Admin Dashboard',
    description: 'Manage hospital operations, patients, appointments, and staff from the LiviaCore admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/appointments/page.tsx': {
    title: 'Appointment Management — LiviaCore Admin',
    description: 'Manage hospital appointments, status updates, and patient bookings from the admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/departments/page.tsx': {
    title: 'Department Management — LiviaCore Admin',
    description: 'Admin tools for managing hospital departments and department overview data.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/doctors/page.tsx': {
    title: 'Doctor Management — LiviaCore Admin',
    description: 'Review doctor profiles, approve applications, and manage medical staff from the admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/nurses/page.tsx': {
    title: 'Nurse Management — LiviaCore Admin',
    description: 'Manage nursing staff, pending applications, and nurse records from the admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/patients/page.tsx': {
    title: 'Patient Management — LiviaCore Admin',
    description: 'View, manage, and update patient records from the LiviaCore admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/patients/add/page.tsx': {
    title: 'Add Patient — LiviaCore Admin',
    description: 'Add new patient records and manage patient admissions through the admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/patients/[id]/page.tsx': {
    title: 'Patient Details — LiviaCore Admin',
    description: 'Review individual patient details and medical history in the admin dashboard.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/settings/page.tsx': {
    title: 'Admin Settings — LiviaCore Hospital',
    description: 'Manage admin settings, profile controls, and application preferences for LiviaCore Hospital.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/staffs/page.tsx': {
    title: 'Staff Management — LiviaCore Admin',
    description: 'Manage hospital staff applications, approve team members, and oversee staff records.',
    robots: { index: false, follow: false },
  },
  'app/dashboard/notifications/page.tsx': {
    title: 'Notifications — LiviaCore Admin',
    description: 'View admin notifications for new applications, appointments, and system alerts.',
    robots: { index: false, follow: false },
  },
};

function createMetadataCode(data) {
  const lines = [];
  lines.push('export const metadata: Metadata = {');
  lines.push(`  title: ${JSON.stringify(data.title)},`);
  lines.push(`  description: ${JSON.stringify(data.description)},`);
  if (data.robots) {
    lines.push('  robots: {');
    Object.entries(data.robots).forEach(([key, value]) => {
      lines.push(`    ${key}: ${value},`);
    });
    lines.push('  },');
  } else {
    lines.push('  robots: { index: true, follow: true },');
  }
  lines.push('};\n');
  return lines.join('\n');
}

for (const [relative, meta] of Object.entries(metadataMap)) {
  const filePath = path.join(process.cwd(), relative);
  if (!fs.existsSync(filePath)) {
    console.error('Missing file', filePath);
    continue;
  }
  const text = fs.readFileSync(filePath, 'utf8');
  if (text.includes('export const metadata')) {
    console.log('Skipping already has metadata:', relative);
    continue;
  }
  const importType = 'import type { Metadata } from "next";';
  const lines = text.split('\n');
  let insertIndex = 0;
  let hasUseClient = false;
  if (lines[0].trim() === '"use client";' || lines[0].trim() === "'use client';") {
    hasUseClient = true;
    insertIndex = 1;
  }
  // find end of initial import block
  let lastImport = insertIndex - 1;
  for (let i = insertIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ')) {
      lastImport = i;
    } else if (line === '' || line.startsWith('//')) {
      continue;
    } else {
      break;
    }
  }
  const metadataCode = createMetadataCode(meta);
  const newLines = [...lines];
  // Insert import type if not present
  const hasMetadataImport = text.includes('import type { Metadata } from "next"') || text.includes("import type { Metadata } from 'next'");
  if (!hasMetadataImport) {
    newLines.splice(lastImport + 1, 0, importType);
    lastImport += 1;
  }
  // Insert metadata after import block
  const metadataInsertPos = lastImport + 1;
  newLines.splice(metadataInsertPos, 0, '', metadataCode);
  fs.writeFileSync(filePath, newLines.join('\n'));
  console.log('Updated metadata for', relative);
}
