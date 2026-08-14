"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  Plus, 
  Search, 
  ChevronDown,
  Filter,
  ArrowUpDown,
  Edit2,
  Copy,
  Trash2
} from 'lucide-react';

const dummyProducts = [
  { id: 1, name: 'SAGASA Oversized Hoodie', sku: 'SG-HOD-BLK-001', category: 'Hoodies', price: '₹1,899', stock: 45, status: 'Active', image: '/product/2.png' },
  { id: 2, name: 'SAGASA Minimal T-Shirt', sku: 'SG-TSH-WHT-002', category: 'T-Shirts', price: '₹799', stock: 120, status: 'Active', image: '/product/3.png' },
  { id: 3, name: 'SAGASA Cargo Pants', sku: 'SG-CRG-BLK-003', category: 'Pants', price: '₹2,299', stock: 32, status: 'Active', image: '/product/1.png' },
  { id: 4, name: 'SAGASA Denim Jacket', sku: 'SG-DNJ-BLU-004', category: 'Jackets', price: '₹2,999', stock: 15, status: 'Low Stock', image: '/product/Street Style Review by the Door.png' },
  { id: 5, name: 'SAGASA Relaxed Shorts', sku: 'SG-SRT-BGE-005', category: 'Shorts', price: '₹1,299', stock: 0, status: 'Out of Stock', image: '/product/Mountain Traveler Beneath Open Skies.png' },
];

const categoryClasses = {
  'hoodies': 'text-[#5D5FEF] bg-[#F4F0FF]',
  't-shirts': 'text-[#3B82F6] bg-[#EFF6FF]',
  'pants': 'text-[#F59E0B] bg-[#FEF3C7]',
  'jackets': 'text-[#F59E0B] bg-[#FEF3C7]',
  'shorts': 'text-[#10B981] bg-[#D1FAE5]',
};

const statusClasses = {
  'active': 'text-[#16A34A]',
  'low-stock': 'text-[#F59E0B]',
  'out-of-stock': 'text-[#DC2626]',
};
const statusDotClasses = {
  'active': 'bg-[#16A34A]',
  'low-stock': 'bg-[#F59E0B]',
  'out-of-stock': 'bg-[#DC2626]',
};

export default function ProductsListPage() {
  return (
    <div className="admin-container pb-8">
      {/* Header Area */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827] mb-1">Products</h1>
          <div className="text-[0.85rem] text-[#6B7280] flex items-center gap-2">
            <span>Dashboard</span>
            <span className="text-[#D1D5DB]">{'>'}</span>
            <span>Products</span>
            <span className="text-[#D1D5DB]">{'>'}</span>
            <span className="text-[#111827] font-medium">All Products</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#111827] rounded-md text-sm px-4 py-2 cursor-pointer">
            <Download size={16} /> Export
          </button>
          <Link href="/admin/catalog" className="flex items-center gap-2 bg-[#5D5FEF] text-white border-none rounded-md text-sm px-4 py-2 cursor-pointer no-underline">
            <Plus size={16} /> Add New Product
          </Link>
        </div>
      </div>



      {/* Toolbar */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 w-[300px]">
          <Search size={16} color="#9CA3AF" />
          <input className="border-none outline-none ml-2 text-sm w-full" type="text" placeholder="Search products..." />
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[0.85rem] text-[#4B5563] cursor-pointer">
            <span>All Categories</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[0.85rem] text-[#4B5563] cursor-pointer">
            <span>All Collections</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[0.85rem] text-[#4B5563] cursor-pointer">
            <span>Status: All</span>
            <ChevronDown size={14} />
          </div>
          
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[0.85rem] text-[#111827] cursor-pointer font-medium">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[0.85rem] text-[#111827] cursor-pointer font-medium">
            <ArrowUpDown size={16} /> Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden mb-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Product</th>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Category</th>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Price</th>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Stock</th>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Status</th>
              <th className="bg-[#F9FAFB] text-left px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase border-b border-[#E5E7EB]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyProducts.map(product => (
              <tr key={product.id} className="[&>td]:last:border-b-0">
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle">
                  <div className="flex items-center gap-4">
                    <img className="w-10 h-10 rounded-lg object-cover bg-[#F3F4F6]" src={product.image} alt={product.name} />
                    <div>
                      <div className="font-semibold text-[#111827] text-[0.85rem] mb-[0.15rem]">{product.name}</div>
                      <div className="text-[0.7rem] text-[#9CA3AF]">SKU: {product.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle">
                  <span className={`px-[0.6rem] py-1 rounded-md text-[0.7rem] font-semibold ${categoryClasses[product.category.toLowerCase().replace(/\s+/g, '-')] || 'text-[#5D5FEF] bg-[#F4F0FF]'}`}>{product.category}</span>
                </td>
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle font-medium text-[#111827] text-[0.85rem]">{product.price}</td>
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle">{product.stock}</td>
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle">
                  <span className={`inline-flex items-center gap-[0.4rem] text-[0.7rem] font-semibold ${statusClasses[product.status.toLowerCase().replace(/\s+/g, '-')] || ''}`}>
                    <span className={`w-[6px] h-[6px] rounded-full ${statusDotClasses[product.status.toLowerCase().replace(/\s+/g, '-')] || ''}`}></span>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b border-[#E5E7EB] align-middle">
                  <div className="flex gap-2">
                    <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] cursor-pointer transition-all duration-200 hover:bg-[#F3F4F6] hover:text-[#111827]" title="Edit"><Edit2 size={14} /></button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] cursor-pointer transition-all duration-200 hover:bg-[#F3F4F6] hover:text-[#111827]" title="Duplicate"><Copy size={14} /></button>
                    <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#6B7280] cursor-pointer transition-all duration-200 hover:bg-[#F3F4F6] hover:text-[#111827]" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-[0.8rem] text-[#6B7280]">
        <span className="pagination-info">Showing 1 to 5 of 128 products</span>
        <div className="flex items-center gap-[0.35rem]">
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#4B5563] cursor-pointer text-[0.8rem] opacity-50 cursor-not-allowed">{'<'}</button>
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-[#5D5FEF] border border-[#5D5FEF] rounded-md text-white cursor-pointer text-[0.8rem]">1</button>
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#4B5563] cursor-pointer text-[0.8rem]">2</button>
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#4B5563] cursor-pointer text-[0.8rem]">3</button>
          <span className="px-1">...</span>
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#4B5563] cursor-pointer text-[0.8rem]">26</button>
          <button className="w-[28px] h-[28px] flex items-center justify-center bg-white border border-[#E5E7EB] rounded-md text-[#4B5563] cursor-pointer text-[0.8rem]">{'>'}</button>
          
          <div className="flex items-center bg-white border border-[#E5E7EB] rounded-md px-3 h-[28px] ml-4 cursor-pointer text-[0.8rem]">
            5 / page <ChevronDown size={14} style={{ marginLeft: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
