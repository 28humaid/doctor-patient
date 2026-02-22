'use client';

import Image from 'next/image';

export default function ConditionCard({ bgImage, title }) {
  return (
    <div className="group relative h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}                  
          placeholder="blur"     
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"               
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Title */}
      <div className="absolute inset-0 flex items-end justify-center pb-6 px-4">
        <h3 className="text-white text-xl md:text-2xl font-semibold text-center drop-shadow-xl">
          {title}
        </h3>
      </div>
    </div>
  );
}