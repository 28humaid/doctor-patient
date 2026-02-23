// app/services/page.jsx

import ServiceGrid from "@/components/services/ServiceGrid";
import ServicesCTA from "@/components/services/ServicesCTA";


export const metadata = {
  title: 'Services - MedPortal | Personalized & Confidential Healthcare',
  description: 'Explore our range of secure telemedicine services including video consultations, digital prescriptions, chronic disease management, and more.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      <ServiceGrid />
      <ServicesCTA />
    </div>
  );
}