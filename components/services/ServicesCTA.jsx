// app/services/components/ServicesCTA.jsx
import Link from 'next/link';

export default function ServicesCTA() {
  return (
    <section className="py-20 bg-[hsl(var(--color-primary))] text-white text-center">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for Personalized Care?
        </h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
          Take the first step toward better health — secure, convenient, and completely confidential.
        </p>

        <Link
          href="/contact-us"
          className="inline-flex items-center px-10 py-5 bg-white text-[hsl(var(--color-primary))] font-bold text-lg rounded-lg hover:bg-gray-100 hover:text-white transition-colors shadow-lg"
        >
          Get in Touch Today
        </Link>
      </div>
    </section>
  );
}