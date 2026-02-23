"use client";
import FeatureCard from "./FeatureCard";
import { FlaskConical, Accessibility, Sparkles } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    heading: "Science-based Formulas",
    description: "No guesswork, only proven solutions",
  },
  {
    icon: Accessibility,
    heading: "Accessible & Convenient",
    description: "Your health delivered to your doorstep",
  },
  {
    icon: Sparkles,
    heading: "Personalized Recommendations",
    description: "Solutions tailored to your unique needs",
  },
];

export default function BelowHero() {
  return (
    <div className="flex flex-wrap">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          Icon={feature.icon}
          heading={feature.heading}
          description={feature.description}
        />
      ))}
    </div>
  );
}