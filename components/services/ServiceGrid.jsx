// app/services/components/ServiceGrid.jsx
import { Video, FileText, CalendarCheck, HeartPulse, ShieldCheck, Clock } from 'lucide-react';
import ServiceCard from './ServiceCard';

export default function ServiceGrid() {
  const services = [
    {
      icon: Video,
      title: "Video Consultations",
      description: "Connect face-to-face with your doctor from anywhere via secure, high-quality video calls. Ideal for follow-ups, second opinions, and non-emergency concerns.",
      imageSrc: "/images/services/video-consult.jpg",
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Receive instant, paperless e-prescriptions directly in your account. View, download, or share securely — with dosage instructions and validity tracking.",
      imageSrc: "/images/services/eprescription.jpg",
    },
    {
      icon: CalendarCheck,
      title: "Follow-up & Monitoring",
      description: "Scheduled check-ins, progress tracking, and reminders for chronic conditions like diabetes, hypertension, thyroid, and more — keeping your health on track.",
      imageSrc: "/images/services/followup.jpg",
    },
    {
      icon: HeartPulse,
      title: "Chronic Disease Management",
      description: "Comprehensive, long-term care plans for diabetes, hypertension, thyroid disorders, heart health, and other chronic conditions with regular guidance.",
      imageSrc: "/images/services/chronic-care.jpg",
    },
    {
      icon: ShieldCheck,
      title: "100% Confidential Care",
      description: "Your medical history, consultations, and prescriptions are encrypted and protected. Full compliance with privacy standards — your data stays yours.",
      imageSrc: "/images/services/confidential.jpg",
    },
    {
      icon: Clock,
      title: "Timely & Accessible Support",
      description: "Quick appointment booking, reduced waiting times, and responsive doctor communication — healthcare that fits your schedule, not the other way around.",
      imageSrc: "/images/services/timely.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How We Help You Stay Healthy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}