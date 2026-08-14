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
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/">
          <Logo width="110px" height="auto" />
        </Link>
      </div>

      <div className="admin-sidebar-content hide-scrollbar">
        {sidebarSections.map((section, idx) => (
          <div key={idx} className="sidebar-section">
            {section.title && <h3 className="sidebar-section-title">{section.title}</h3>}
            <div className="sidebar-nav-group">
              {section.items.map((item) => {
                const isActive = pathname === item.path || (pathname.startsWith('/admin/catalog') && item.name === 'Products');

                return (
                  <Link key={item.name} href={item.path} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
                    <div className="sidebar-nav-item-left">
                      <item.icon size={16} className="sidebar-icon" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Promo Banner */}
        <div className="sidebar-promo-banner">
          <div className="promo-content">
            <Logo width="70px" height="auto" />
            <p>Premium Streetwear For Every Move.</p>
            <Link href="/" className="promo-btn">
              View Store <ExternalLink size={12} />
            </Link>
          </div>
          <div className="promo-image">
            {/* The actual product image is rendered using an img tag */}
            <img src="/product/1.png" alt="Hoodie" />
          </div>
        </div>
      </div>

      <div className="admin-sidebar-collapse">
        <button className="collapse-btn">
          <ArrowLeftToLine size={16} />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
}
