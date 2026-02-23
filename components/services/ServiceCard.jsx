// app/services/components/ServiceCard.jsx
import Image from 'next/image';

export default function ServiceCard({ icon: Icon, title, description, imageSrc }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Visual header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[hsl(var(--color-primary)/0.1)] rounded-lg">
            <Icon className="h-7 w-7 text-[hsl(var(--color-primary))]" />
          </div>
          <h3 className="text-xl font-semibold text-[hsl(var(--color-primary))]">{title}</h3>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
}