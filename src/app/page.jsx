"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { products } from '@/data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
    >
      {/* Hero Section */}
      <section className="pt-[var(--spacing-md)] pb-[var(--spacing-xl)]">
        <div className="container flex flex-col gap-[var(--spacing-md)] lg:flex-row lg:items-center lg:min-h-[calc(100vh-var(--header-height)-100px)]">
          <motion.div 
            className="flex-1 flex flex-col gap-6 max-w-[600px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-[3.5rem] leading-none md:text-[5vw]">
              Modern Clothing for Women and Men
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-[var(--color-text-muted)] max-w-[90%]">
              Sagasa offers timeless clothing collections for everyday wear. 
              Minimalist design, comfort, and quality fabrics.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
              <Button to="/shop" variant="primary">Shop Collection</Button>
              <Button to="/shop" variant="outline">Explore New Arrivals</Button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex-1 w-full aspect-[4/5] rounded-lg overflow-hidden lg:aspect-[3/4] lg:h-[80vh] lg:max-h-[800px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Sagasa Fashion" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-[var(--color-accent)] text-[var(--color-accent-foreground)] py-4 overflow-hidden">
        <div className="flex w-fit [animation:infiniteScroll_20s_linear_infinite]">
          <div className="flex shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="font-[family-name:var(--font-display)] text-base font-medium uppercase tracking-[0.05em] whitespace-nowrap flex items-center">
                Free shipping on orders over $149 <span className="mx-8 text-[0.5rem]">•</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`dup-${i}`} className="font-[family-name:var(--font-display)] text-base font-medium uppercase tracking-[0.05em] whitespace-nowrap flex items-center">
                Free shipping on orders over $149 <span className="mx-8 text-[0.5rem]">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr] md:h-[600px]">
            <Link href="/shop?category=women" className="relative rounded-lg overflow-hidden block flex-1 min-h-[300px] group">
              <div className="absolute top-0 left-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Women" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 to-40% flex flex-col justify-end p-8 text-white">
                <h2 className="text-[2rem] mb-2">Women</h2>
                <span className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-[10px] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">Shop Now <ArrowRight size={16} /></span>
              </div>
            </Link>
            <div className="flex flex-col gap-4">
              <Link href="/shop?category=men" className="relative rounded-lg overflow-hidden block flex-1 min-h-[300px] group">
                <div className="absolute top-0 left-0 w-full h-full">
                  <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Men" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 to-40% flex flex-col justify-end p-8 text-white">
                  <h2 className="text-[2rem] mb-2">Men</h2>
                  <span className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-[10px] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">Shop Now <ArrowRight size={16} /></span>
                </div>
              </Link>
              <Link href="/shop?category=accessories" className="relative rounded-lg overflow-hidden block flex-1 min-h-[300px] group">
                <div className="absolute top-0 left-0 w-full h-full">
                  <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Accessories" className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 to-40% flex flex-col justify-end p-8 text-white">
                  <h2 className="text-[2rem] mb-2">Accessories</h2>
                  <span className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-[10px] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">Shop Now <ArrowRight size={16} /></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="featured-section section">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-[2.5rem]">Featured Collection</h2>
            <Link href="/shop" className="flex items-center gap-2 font-medium border-b border-[var(--color-foreground)] pb-1 transition-opacity duration-200 hover:opacity-70">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="story-section section">
        <div className="container flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
          <motion.div 
            className="flex-1 rounded-lg overflow-hidden aspect-[4/3] lg:aspect-square"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Sagasa Studio" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            className="flex-1 flex flex-col items-start gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-[3rem]">The Sagasa Philosophy</h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-4">
              We believe that clothing should be an extension of yourself—effortless, comfortable, and beautifully designed. Our collections are crafted with the utmost attention to detail, using sustainable fabrics that stand the test of time.
            </p>
            <Button to="/about" variant="outline">Read Our Story</Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
