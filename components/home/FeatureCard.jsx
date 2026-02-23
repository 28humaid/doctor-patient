'use client';

import Image from 'next/image';

export default function FeatureCard({ Icon, heading, description }) {
  return (
    <div className="flex-1 min-w-[260px] flex flex-col items-center gap-3 border border-gray-300 p-6 text-center">
      <div>
        <Icon size={28} className="h-12 w-12 text-[hsl(var(--color-primary))] mb-6" />
      </div>

      <h3 className="text-xl font-semibold">{heading}</h3>

      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}