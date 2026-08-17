import Image from 'next/image';

export const metadata = {
  title: 'About Us | Sagasa',
  description: 'Learn about Sagasa, our commitment to sustainable practices, and timeless design.',
};

const About = () => {
  return (
    <div className="page-container container section animate-in fade-in duration-500">
      <div className="page-header text-center">
        <h1 className="animate-in slide-in-from-bottom-4 duration-700">
          Our Story
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-12 mt-12">
        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
          <Image 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="About Sagasa" 
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        <div className="max-w-[800px] mx-auto text-lg text-[var(--color-text-muted)] leading-relaxed space-y-6">
          <p>
            Founded with a vision to redefine modern minimalism, Sagasa is more than just a clothing brand. We are a lifestyle dedicated to the pursuit of effortless elegance, sustainable practices, and timeless design.
          </p>
          <p>
            Every piece in our collection is meticulously crafted to ensure the highest quality. We source our materials from ethical suppliers who share our commitment to environmental responsibility. Our garments are designed to transcend seasons, becoming trusted staples in your wardrobe for years to come.
          </p>
          <p>
            We believe that true luxury lies in simplicity and the quiet confidence that comes from wearing clothes that feel as good as they look. Welcome to Sagasa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
