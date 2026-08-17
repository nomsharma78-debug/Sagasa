import Image from 'next/image';
import Link from 'next/link';
import manAvatar from '@/assets/man.png';
import womanAvatar from '@/assets/woman.png';
import { Package, Heart, Tag, ArrowRight, Mail, ShoppingBag, User } from 'lucide-react';
import { products } from '@/data/products';

export default function OverviewTab({ setActiveTab, profile }) {
  const getDefaultAvatar = (gender) => {
    if (gender === 'Female') return womanAvatar.src;
    if (gender === 'Male') return manAvatar.src;
    return manAvatar.src;
  };
  const orders = [
    { id: '#SGS-2024-0008', date: 'May 18, 2024', items: 3, total: 189.00, status: 'Delivered', images: [products[0].image1, products[1].image1, products[2].image1] },
    { id: '#SGS-2024-0007', date: 'May 10, 2024', items: 2, total: 129.00, status: 'Shipped', images: [products[3].image1, products[4].image1], trackable: true },
    { id: '#SGS-2024-0006', date: 'Apr 28, 2024', items: 4, total: 259.00, status: 'Processing', images: [products[5].image1, products[6].image1] }
  ];

  const wishlistProducts = [
    { ...products[0], availability: 'In Stock', priceDropped: false },
    { ...products[1], availability: 'In Stock', priceDropped: true, oldPrice: 159.00, price: 149.00 },
    { ...products[2], availability: 'In Stock', priceDropped: false },
    { ...products[3], availability: 'Low Stock', priceDropped: false }
  ];

  const renderStatusBadge = (status) => {
    const styles = {
      'Delivered': 'bg-green-50 text-green-700',
      'Shipped': 'bg-blue-50 text-blue-700',
      'Processing': 'bg-orange-50 text-orange-700'
    };
    return (
      <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <>
      {/* Profile Hero */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border border-[#EAEAEA]">
        <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-[#EAEAEA] shrink-0 overflow-hidden relative">
          {profile ? (
            <img 
              src={profile.avatarUrl || getDefaultAvatar(profile.gender)} 
              alt="Profile" 
              className={`w-full h-full ${profile.avatarUrl ? 'object-cover' : 'object-contain p-2'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#A0A0A0]"><User size={32} /></div>
          )}
        </div>
        <div className="flex-1 text-center sm:text-left flex flex-col sm:flex-row sm:justify-between w-full">
          <div>
            <h2 className="text-2xl lg:text-3xl font-[family-name:var(--font-display)] font-medium text-[#222] mb-1">
              Good afternoon, {profile?.name ? profile.name.split(' ')[0] : 'Guest'}
            </h2>
            <p className="text-[#666] text-sm mb-4">Welcome back! You have exclusive offers waiting for you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 text-[#888] text-sm">
              <span className="flex items-center gap-2">
                <Mail size={16} /> {profile?.phone || 'Loading...'} 
              </span>
              <span className="hidden sm:inline text-[#EAEAEA]">|</span>
              <span className="flex items-center gap-2"><ShoppingBag size={16} /> Member</span>
            </div>
          </div>
          <div className="mt-6 sm:mt-0">
            <button onClick={() => setActiveTab('Profile Details')} className="bg-[#222] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: ShoppingBag, val: '8', label: 'Orders', action: 'View orders', tab: 'Orders' },
          { icon: Heart, val: '14', label: 'Wishlist', action: 'View wishlist', tab: 'Wishlist' },
          { icon: Package, val: '1', label: 'Returns', action: 'View returns', tab: 'Orders' },
          { icon: Tag, val: '2', label: 'Active Offers', action: 'View offers', tab: 'Overview' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} onClick={() => setActiveTab(card.tab)} className="bg-white rounded-2xl p-5 border border-[#EAEAEA] flex flex-col justify-between group cursor-pointer hover:border-[#D0D0D0] transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Icon size={24} strokeWidth={1} className="text-[#222]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-[family-name:var(--font-display)] leading-none mb-1">{card.val}</span>
                  <span className="text-xs text-[#666] font-medium uppercase tracking-wide">{card.label}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-[#222]">
                {card.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-xl font-[family-name:var(--font-display)] font-medium">Recent Orders</h3>
          <button onClick={() => setActiveTab('Orders')} className="text-sm font-medium flex items-center gap-1 hover:text-[#666] transition-colors">View all orders <ArrowRight size={14} /></button>
        </div>
        <div className="bg-white rounded-2xl border border-[#EAEAEA] flex flex-col overflow-hidden">
          {orders.map((order, i) => (
            <div key={order.id} className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 hover:bg-[#FAF9F6] transition-colors ${i !== orders.length - 1 ? 'border-b border-[#EAEAEA]' : ''}`}>
              <div className="flex items-start gap-4 min-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-[#EAEAEA] shrink-0">
                  <Package size={18} className="text-[#666]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{order.id}</span>
                  <span className="text-xs text-[#888]">{order.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                <div className="flex -space-x-2 mr-2">
                  {order.images.map((img, idx) => (
                    <div key={idx} className="w-8 h-10 bg-gray-100 rounded-sm border border-[#EAEAEA] overflow-hidden relative">
                      <Image src={img} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-[#666]">{order.items} items</span>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8">
                <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                <div className="w-[80px] text-right">{renderStatusBadge(order.status)}</div>
                <div className="flex flex-col items-end gap-1">
                  <button className="text-sm font-medium flex items-center gap-1 hover:text-[#666]">View order <ArrowRight size={14} /></button>
                  {order.trackable && <button className="text-xs text-[#888] underline hover:text-[#222]">Track package</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-xl font-[family-name:var(--font-display)] font-medium">Wishlist</h3>
          <button onClick={() => setActiveTab('Wishlist')} className="text-sm font-medium flex items-center gap-1 hover:text-[#666] transition-colors">View all wishlist <ArrowRight size={14} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlistProducts.map((product, i) => (
            <Link href={`/product/${product.id}`} key={i} className="flex flex-col group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#F4F4F4] rounded-xl overflow-hidden mb-3">
                <Image src={product.image1} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Heart size={14} fill="#222" strokeWidth={0} />
                </button>
                {product.priceDropped && <span className="absolute top-3 left-3 bg-[#E7E2D8] text-[#8C7654] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Price dropped</span>}
              </div>
              <div className="flex flex-col flex-1">
                <h4 className="text-sm font-medium mb-1 truncate">{product.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-sm font-semibold ${product.priceDropped ? 'text-[#D32F2F]' : ''}`}>${product.price.toFixed(2)}</span>
                  {product.oldPrice && <span className="text-xs text-[#888] line-through">${product.oldPrice.toFixed(2)}</span>}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#EAEAEA]">
                  <span className={`text-[11px] font-semibold ${product.availability === 'Low Stock' ? 'text-orange-600' : 'text-green-600'}`}>{product.availability}</span>
                  <button className="w-8 h-8 rounded-full border border-[#EAEAEA] flex items-center justify-center hover:bg-[#F9F9F9] transition-colors">
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mb-12">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-xl font-[family-name:var(--font-display)] font-medium">Recently Viewed</h3>
          <button className="text-sm font-medium flex items-center gap-1 hover:text-[#666] transition-colors">View all <ArrowRight size={14} /></button>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          {products.slice(4, 10).map((product, i) => (
            <Link href={`/product/${product.id}`} key={i} className="flex flex-col shrink-0 w-[140px] group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#F4F4F4] rounded-lg overflow-hidden mb-2">
                <Image src={product.image1} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <Heart size={12} strokeWidth={1.5} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Picked for you */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-xl font-[family-name:var(--font-display)] font-medium">Picked for you</h3>
          <button className="text-sm font-medium flex items-center gap-1 hover:text-[#666] transition-colors">View all <ArrowRight size={14} /></button>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
          {products.slice(10, 16).map((product, i) => (
            <Link href={`/product/${product.id}`} key={i} className="flex flex-col shrink-0 w-[140px] group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#F4F4F4] rounded-lg overflow-hidden mb-2">
                <Image src={product.image1} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {i === 5 && <span className="absolute top-2 left-2 bg-white text-[#222] text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">New</span>}
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                  <Heart size={12} strokeWidth={1.5} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
