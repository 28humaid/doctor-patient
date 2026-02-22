'use client';

import Image from 'next/image';

export default function FeatureCard({ iconSrc, heading, description }) {
  return (
    <div className="flex-1 min-w-[260px] flex flex-col items-center gap-3 border border-gray-300 p-6 text-center">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[hsl(var(--color-primary-light))] mb-2">
        <Image
          src={iconSrc}
          alt={`${heading} icon`}
          width={32}
          height={32}
        //   className="invert"
        />
      </div>

      <h3 className="text-xl font-semibold">{heading}</h3>

      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  );
}