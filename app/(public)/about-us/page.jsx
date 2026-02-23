// app/about-us/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { UserCheck, ShieldCheck, HeartPulse, Clock, Award, Stethoscope } from 'lucide-react';

export const metadata = {
  title: 'About Us - MedPortal | Trusted Healthcare Partner',
  description: 'Learn about MedPortal – your trusted partner in personalized, confidential, and accessible healthcare in India.',
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)]">
      {/* 1. Hero – no buttons here now */}

      {/* 2. Our Story */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            <div className="prose prose-lg text-[var(--text-secondary)] max-w-none">
              <p>
                Founded in 1998 with a simple belief: <strong>quality healthcare should be accessible, personal, and completely private</strong>.
              </p>
              <p>
                MedPortal was born out of frustration with long waiting times, lack of continuity in care, and concerns around privacy. Our mission is to bridge the gap between patients and experienced doctors using secure, modern technology — without ever compromising on empathy or medical excellence.
              </p>
              <p className="font-medium text-lg mt-6">
                Today, we help hundreds of patients across India manage chronic conditions, get second opinions, and receive timely medical guidance — all from the comfort of home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values */}
      <section className="py-16 md:py-20 bg-[var(--color-gray-50)]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Complete Confidentiality", desc: "Your health data is encrypted and never shared without consent." },
              { icon: HeartPulse, title: "Patient-First Care", desc: "Every decision is made with your well-being at the center." },
              { icon: UserCheck, title: "Personalized Attention", desc: "No one-size-fits-all. Your treatment plan is built for you." },
              { icon: Clock, title: "Timely Support", desc: "Quick responses and reduced waiting time for consultations." },
              { icon: Award, title: "Evidence-Based Medicine", desc: "Modern guidelines and latest medical knowledge." },
              { icon: Stethoscope, title: "Empathetic Listening", desc: "We truly hear and understand your concerns." },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow"
              >
                <value.icon className="h-12 w-12 text-[hsl(var(--color-primary))] mb-6" />
                <h3 className="text-xl text-[hsl(var(--color-primary))] font-semibold mb-4">{value.title}</h3>
                <p className="text-[var(--text-secondary)]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Doctor / Founder */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Your Doctor</h2>

            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/doctor-placeholder.jpg" // ← replace with real photo
                  alt="Dr. [Your Name] - Founder & Chief Medical Officer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">Dr. Farhaan</h3>
                <p className="text-xl text-[hsl(var(--color-primary))] font-medium mb-6">
                  MBBS, MD ([Specialty]) • Founder & Chief Consultant
                </p>

                <div className="prose prose-lg text-[var(--text-secondary)] max-w-none">
                  <p>
                    With over [X] years of clinical experience in [your main specialty], Dr. [Name] has helped thousands of patients manage chronic illnesses and improve quality of life.
                  </p>
                  <p>
                    Passionate about combining clinical expertise with digital convenience, he founded MedPortal to make high-quality, compassionate care available to everyone — regardless of location.
                  </p>
                  <p className="mt-6 font-medium">
                    "True healing begins when a patient feels heard, respected, and safe."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Single Final CTA – only one on the whole page */}
      <section className="py-20 bg-[hsl(var(--color-primary))] text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
            Take the first step towards better health with personalized, confidential care.
          </p>

          <Link
            href="/contact-us"
            className="inline-flex items-center px-10 py-5 bg-white text-[hsl(var(--color-primary))] font-bold text-lg rounded-lg hover:bg-gray-100 hover:text-white transition-colors shadow-lg"
          >
            Get in Touch Today
          </Link>
        </div>
      </section>
    </div>
  );
}