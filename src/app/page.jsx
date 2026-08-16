"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowRight, CheckCircle, RefreshCcw, Globe } from 'lucide-react';
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
      <section className="w-full h-[100vh] min-h-[600px] max-h-[900px] flex flex-col md:flex-row relative overflow-hidden">
        {/* Left Side: White Background & Text */}
        <div className="w-full md:w-1/2 h-full bg-[#FCFBF8] flex flex-col justify-center px-8 md:px-20 relative z-10">
          <motion.div 
            className="flex flex-col gap-5 max-w-[500px] -mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-[3.5rem] md:text-[4rem] leading-[1.05] font-medium font-[family-name:var(--font-display)] text-[#222]">
              Modern Clothing<br/>for Women and Men
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[1rem] text-[#666] leading-relaxed max-w-[85%] mt-1">
              Timeless style. Thoughtful design. Unmatched comfort. Discover pieces that are made for you.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-4">
              <Link href="/shop?category=women" className="px-8 py-3.5 bg-[#222] text-white font-medium text-[0.85rem] border border-[#222] transition-colors hover:bg-[#444] hover:border-[#444]">
                Shop Women
              </Link>
              <Link href="/shop?category=men" className="px-8 py-3.5 bg-transparent text-[#222] font-medium text-[0.85rem] border border-[#CCC] transition-all hover:border-[#222]">
                Shop Men
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom Features */}
          <motion.div 
            className="absolute bottom-8 left-8 md:left-20 flex items-center gap-8 text-[#888]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { icon: CheckCircle, label: "Premium Quality" },
              { icon: RefreshCcw, label: "Easy Returns" },
              { icon: Globe, label: "Worldwide Shipping" }
            ].map((ft, i) => (
              <div key={i} className="flex items-center gap-2">
                <ft.icon size={18} strokeWidth={1.5} />
                <span className="text-[0.8rem] font-medium">{ft.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Image Full Bleed */}
        <div className="w-full md:w-1/2 h-full relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#FCFBF8_0%,transparent_15%,transparent_85%,#FCFBF8_100%)] z-10 pointer-events-none"></div>
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Sagasa Collection" 
            className="w-full h-full object-cover object-center relative z-0"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section section">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.5fr_1fr] md:h-[600px]">
            {[{ n: 'Women', c: 'women', i: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', main: true },
              { n: 'Men', c: 'men', i: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { n: 'Accessories', c: 'accessories', i: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
            ].reduce((acc, cat) => {
              const el = (
                <Link key={cat.c} href={`/shop?category=${cat.c}`} className="relative rounded-lg overflow-hidden block flex-1 min-h-[300px] group">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <img src={cat.i} alt={cat.n} className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 to-40% flex flex-col justify-end p-8 text-white">
                    <h2 className="text-[2rem] mb-2">{cat.n}</h2>
                    <span className="flex items-center gap-2 text-sm font-medium opacity-0 translate-y-[10px] transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">Shop Now <ArrowRight size={16} /></span>
                  </div>
                </Link>
              );
              if (cat.main) acc.push(el);
              else {
                if (acc.length === 1) acc.push(<div key="col" className="flex flex-col gap-4">{[el]}</div>);
                else acc[1].props.children.push(el);
              }
              return acc;
            }, [])}
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
