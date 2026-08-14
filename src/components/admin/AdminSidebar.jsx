"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  Package, 
  Tag, 
  Star, 
  Image as ImageIcon, 
  BarChart2, 
  Settings, 
  UserCircle, 
  Activity,
  ArrowLeftToLine,
  ChevronRight,
  ExternalLink,
  Layers,
  Ruler,
  RefreshCcw,
  ShoppingCart as AbandonedCart,
  PieChart,
  Ticket,
  Truck,
  FileText
} from 'lucide-react';
import Logo from '../Logo';

const sidebarSections = [
  {
    title: null,
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
    ]
  },
  {
    title: 'PRODUCTS',
    items: [
      { name: 'Products', path: '/admin/products', icon: ShoppingBag },
      { name: 'Categories', path: '/admin/categories', icon: Layers },
      { name: 'Collections', path: '/admin/collections', icon: Package },
      { name: 'Attributes', path: '/admin/attributes', icon: ChevronRight }, // Placeholder icon
      { name: 'Size Guide', path: '/admin/size-guide', icon: Ruler },
    ]
  },
  {
    title: 'ORDERS',
    items: [
      { name: 'Orders', path: '/admin/orders', icon: ShoppingCart, badge: 24 },
      { name: 'Returns', path: '/admin/returns', icon: RefreshCcw },
      { name: 'Abandoned Carts', path: '/admin/abandoned', icon: AbandonedCart },
    ]
  },
  {
    title: 'CUSTOMERS',
    items: [
      { name: 'Customers', path: '/admin/customers', icon: Users },
      { name: 'Segments', path: '/admin/segments', icon: PieChart },
      { name: 'Reviews & Ratings', path: '/admin/reviews', icon: Star },
    ]
  },
  {
    title: 'MARKETING',
    items: [
      { name: 'Discounts', path: '/admin/discounts', icon: Tag },
      { name: 'Coupons', path: '/admin/coupons', icon: Ticket },
      { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
    ]
  },
  {
    title: 'STORE',
    items: [
      { name: 'Inventory', path: '/admin/inventory', icon: Package },
      { name: 'Shipping', path: '/admin/shipping', icon: Truck },
      { name: 'Taxes', path: '/admin/taxes', icon: FileText },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      { name: 'Settings', path: '/admin/settings', icon: Settings },
      { name: 'Users', path: '/admin/users', icon: UserCircle },
      { name: 'Activity Log', path: '/admin/activity', icon: Activity },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-[#F3F4F6] bg-white z-40 dark:border-[#1F2937] dark:bg-[#111827]">
      <div className="flex h-[70px] items-center px-6">
        <Link href="/">
          <Logo width="110px" height="auto" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-2 hide-scrollbar">
        {sidebarSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.title && <h3 className="mb-2 px-6 text-[0.65rem] font-semibold tracking-[0.05em] text-[#9CA3AF] dark:text-[#6B7280]">{section.title}</h3>}
            <div className="flex flex-col gap-[2px]">
              {section.items.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith('/admin/catalog') && item.name === 'Products');
                const baseClasses = "group flex cursor-pointer items-center justify-between border-l-[3px] py-[0.4rem] px-6 text-xs font-medium no-underline transition-all duration-200";
                const activeClasses = isActive 
                  ? "border-[#5D5FEF] bg-[#F8F7FF] text-[#5D5FEF] dark:bg-[rgba(93,95,239,0.15)] dark:text-[#5D5FEF]" 
                  : "border-transparent text-[#6B7280] hover:text-[#5D5FEF] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] dark:hover:text-[#F9FAFB]";

                return (
                  <Link key={item.name} href={item.path} className={`${baseClasses} ${activeClasses}`}>
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && <span className="rounded-[12px] bg-[#F8F7FF] px-[0.4rem] py-[0.1rem] text-[0.65rem] font-semibold text-[#5D5FEF]">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Promo Banner */}
        <div className="relative m-6 flex overflow-hidden rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] dark:border-[#374151] dark:bg-[#1F2937]">
          <div className="flex w-[65%] flex-col gap-2 p-4">
            <Logo width="70px" height="auto" />
            <p className="m-0 text-[0.65rem] leading-[1.4] text-[#6B7280] dark:text-[#9CA3AF]">Premium Streetwear For Every Move.</p>
            <Link href="/" className="flex items-center gap-1 text-[0.7rem] font-semibold text-[#5D5FEF] no-underline">
              View Store <ExternalLink size={12} />
            </Link>
          </div>
          <div className="absolute -right-2.5 bottom-0 h-[90px] w-[70px]">
            {/* The actual product image is rendered using an img tag */}
            <img src="/product/1.png" alt="Hoodie" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>

      <div className="border-t border-[#F3F4F6] px-6 py-4 dark:border-[#1F2937]">
        <button className="flex cursor-pointer items-center gap-3 border-none bg-transparent p-0 text-[0.75rem] font-medium text-[#6B7280] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:text-[#F9FAFB]">
          <ArrowLeftToLine size={16} />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}
