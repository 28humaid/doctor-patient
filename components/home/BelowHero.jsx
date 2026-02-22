import FeatureCard from "./FeatureCard";

const features = [
  {
    iconSrc: '/images/formula-icon.svg',
    heading: 'Science-based Formulas',
    description: 'No guesswork, only proven solutions',
  },
  {
    iconSrc: '/images/accessible-icon.svg',
    heading: 'Accessible & Convenient',
    description: 'Your health delivered to your doorstep',
  },
  {
    iconSrc: '/images/personalized-recommendation.svg',
    heading: 'Personalized Recommendations',
    description: 'Solutions tailored to your unique needs',
  },
];

export default function BelowHero() {
  return (
    <div className="flex flex-wrap">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          iconSrc={feature.iconSrc}
          heading={feature.heading}
          description={feature.description}
        />
      ))}
    </div>
  );
}