import ConditionCard from './ConditionCard';

const conditions = [
  {
    bgImage: '/images/conditions/diabetes.jpg',
    title: 'Diabetes Management',
  },
  {
    bgImage: '/images/conditions/hypertension.jpg',
    title: 'Hypertension',
  },
  {
    bgImage: '/images/conditions/thyroid.jpg',
    title: 'Thyroid Disorders',
  },
  {
    bgImage: '/images/conditions/skinissues.jpg',
    title: 'Skin issues',
  },
  {
    bgImage: '/images/conditions/heart.jpg',
    title: 'Heart & Cardiology',
  },
  {
    bgImage: '/images/conditions/kidney.jpg',
    title: 'Kidney Health',
  },
  {
    bgImage: '/images/conditions/womenhealth.jpg',
    title: 'Female health concerns',
  },
  {
    bgImage: '/images/conditions/childhealth.jpg',
    title: 'Child health issues',
  },
  // Add more as needed — 6–8 is usually good for home page
];

export default function ConditionsTreated() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Conditions We Treat
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Expert care and personalized treatment plans for a wide range of chronic and acute conditions
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {conditions.map((condition, index) => (
            <ConditionCard
              key={index}
              bgImage={condition.bgImage}
              title={condition.title}
            />
          ))}
        </div>

        {/* Optional CTA below cards */}
        <div className="text-center mt-12">
          <a
            href="/contact-us"
            className="inline-flex items-center px-6 py-3 bg-[hsl(var(--color-primary))] text-white font-medium rounded-lg hover:bg-[hsl(var(--color-primary-dark))] transition-colors"
          >
            Consult Now
          </a>
        </div>
      </div>
    </section>
  );
}