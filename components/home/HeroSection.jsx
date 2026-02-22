"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const images = [
    "/images/heroimage.jpg",
    "/images/heroimage2.jpg",
    "/images/heroimage3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[85vh] overflow-hidden">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt=""
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-white container py-12 h-full flex items-center">
        <div className="flex flex-col gap-6 w-full lg:w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold shadow-lg">
            Natural Healing, Trusted Care
          </h1>

          <p className="shadow-lg">
            Dedicated homeopathic consultation and treatment for chronic and everyday health concerns, addressing the root cause of illness to restore balance and promote lasting health naturally.
          </p>

          <button className="px-6 py-3 bg-[#111827] hover:bg-green-700 rounded-md text-white flex items-center gap-2 w-fit">
            Get started
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}