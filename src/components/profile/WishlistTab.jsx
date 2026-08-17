import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';

export default function WishlistTab() {
  const wishlistProducts = [
    { ...products[0], availability: 'In Stock', priceDropped: false },
    { ...products[1], availability: 'In Stock', priceDropped: true, oldPrice: 159.00, price: 149.00 },
    { ...products[2], availability: 'In Stock', priceDropped: false },
    { ...products[3], availability: 'Low Stock', priceDropped: false },
    { ...products[7], availability: 'In Stock', priceDropped: false },
    { ...products[9], availability: 'Out of Stock', priceDropped: false }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Wishlist</h2>
          <p className="text-sm text-[#666] mt-1">Items you've saved for later. ({wishlistProducts.length})</p>
        </div>
        <button className="bg-[#222] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
          Add All to Bag
        </button>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-12 text-center flex flex-col items-center">
          <Heart size={48} className="text-[#CCC] mb-4" strokeWidth={1} />
          <h3 className="text-lg font-medium text-[#222] mb-2">Your wishlist is empty</h3>
          <p className="text-[#666] text-sm mb-6 max-w-md">Save your favorite items here so you can easily find them later.</p>
          <button className="bg-[#222] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
            Discover Styles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlistProducts.map((product, i) => (
            <div key={i} className="flex flex-col group relative bg-white p-3 rounded-2xl border border-[#EAEAEA]">
              <Link href={`/product/${product.id}`} className="relative aspect-[3/4] bg-[#F4F4F4] rounded-xl overflow-hidden mb-3 block">
                <Image src={product.image1} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.priceDropped && <span className="absolute top-3 left-3 bg-[#E7E2D8] text-[#8C7654] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Price dropped</span>}
                {product.availability === 'Out of Stock' && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-[#222]">Sold Out</span>
                  </div>
                )}
              </Link>
              
              <button className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10">
                <Heart size={14} fill="#222" strokeWidth={0} />
              </button>

              <div className="flex flex-col flex-1 px-1 pb-1">
                <Link href={`/product/${product.id}`} className="text-sm font-medium mb-1 truncate hover:text-[#666] transition-colors">
                  {product.title}
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-sm font-semibold ${product.priceDropped ? 'text-[#D32F2F]' : ''}`}>₹{product.price.toFixed(2)}</span>
                  {product.oldPrice && <span className="text-xs text-[#888] line-through">₹{product.oldPrice.toFixed(2)}</span>}
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-[11px] font-semibold ${
                    product.availability === 'Low Stock' ? 'text-orange-600' : 
                    product.availability === 'Out of Stock' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {product.availability}
                  </span>
                  
                  <button 
                    disabled={product.availability === 'Out of Stock'}
                    className="w-full max-w-[120px] ml-auto py-2 rounded-lg border border-[#EAEAEA] flex items-center justify-center gap-2 hover:bg-[#F9F9F9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                  >
                    <ShoppingBag size={14} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
