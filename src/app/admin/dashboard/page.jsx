"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  Shirt,
  Calendar,
  Info,
  TrendingUp,
  TrendingDown,
  RotateCcw
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

// Mock Data for Charts
const salesData = [
  { name: 'May 14', value: 20000 },
  { name: 'May 15', value: 45000 },
  { name: 'May 16', value: 35000 },
  { name: 'May 17', value: 85000 },
  { name: 'May 18', value: 45000 },
  { name: 'May 19', value: 65000 },
  { name: 'May 20', value: 95000 },
];

const sparklineRev = [{v:0},{v:10},{v:5},{v:15},{v:10},{v:20},{v:15},{v:25}];
const sparklineOrd = [{v:10},{v:5},{v:15},{v:10},{v:20},{v:15},{v:25},{v:20}];
const sparklineCus = [{v:5},{v:15},{v:10},{v:20},{v:15},{v:25},{v:20},{v:30}];
const sparklinePro = [{v:15},{v:10},{v:20},{v:15},{v:25},{v:20},{v:30},{v:25}];

const orderData = [
  { name: 'Delivered', value: 152, color: '#10B981' },
  { name: 'Processing', value: 56, color: '#5D5FEF' },
  { name: 'Pending', value: 32, color: '#F59E0B' },
  { name: 'Cancelled', value: 16, color: '#EF4444' },
];

const truncateWords = (str, num = 3) => {
  if (!str) return '';
  const words = str.split(' ');
  return words.length > num ? words.slice(0, num).join(' ') + '...' : str;
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] pb-8 font-[family-name:var(--font-body)]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
          <h1 className="text-[1.5rem] font-bold text-[#111827] dark:text-[#F9FAFB] mb-1">Welcome back, Admin 👋</h1>
          <p className="text-[0.85rem] text-[#6B7280] dark:text-[#9CA3AF]">Here's what's happening with your store today.</p>
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] py-2 px-4 rounded-lg text-[0.85rem] text-[#4B5563] dark:text-[#D1D5DB] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none">
          <Calendar size={16} />
          May 14 — May 20, 2025
          <span style={{ marginLeft: '0.25rem', fontSize: '10px' }}>▼</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-5 flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#5D5FEF] text-white"><ShoppingBag size={20} /></div>
            <div className="flex flex-col">
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-[0.15rem]">Total Revenue</span>
              <span className="text-[1.4rem] font-bold text-[#111827] dark:text-[#F9FAFB] leading-[1.1] mb-1">₹2,45,680</span>
              <span className="text-[0.7rem] font-semibold text-[#10B981]">↑ 15.6% from last week</span>
            </div>
          </div>
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineRev}>
                <Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-5 flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#10B981] text-white"><Package size={20} /></div>
            <div className="flex flex-col">
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-[0.15rem]">Total Orders</span>
              <span className="text-[1.4rem] font-bold text-[#111827] dark:text-[#F9FAFB] leading-[1.1] mb-1">256</span>
              <span className="text-[0.7rem] font-semibold text-[#10B981]">↑ 12.4% from last week</span>
            </div>
          </div>
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineOrd}>
                <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-5 flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#F59E0B] text-white"><Users size={20} /></div>
            <div className="flex flex-col">
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-[0.15rem]">Total Customers</span>
              <span className="text-[1.4rem] font-bold text-[#111827] dark:text-[#F9FAFB] leading-[1.1] mb-1">1,289</span>
              <span className="text-[0.7rem] font-semibold text-[#10B981]">↑ 8.7% from last week</span>
            </div>
          </div>
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineCus}>
                <Line type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-5 flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 bg-[#5D5FEF] text-white"><Shirt size={20} /></div>
            <div className="flex flex-col">
              <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-[0.15rem]">Total Products</span>
              <span className="text-[1.4rem] font-bold text-[#111827] dark:text-[#F9FAFB] leading-[1.1] mb-1">128</span>
              <span className="text-[0.7rem] font-semibold text-[#10B981]">↑ 5.3% from last week</span>
            </div>
          </div>
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklinePro}>
                <Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Middle Grid */}
      <div className="grid grid-cols-[1.8fr_1.1fr_1.1fr] gap-6 mb-6">
        {/* Sales Overview Chart */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Sales Overview <Info size={14} color="#9CA3AF" /></div>
            <select className="border border-[#E5E7EB] dark:border-[#374151] rounded-md py-1 px-2 text-xs text-[#4B5563] dark:text-[#D1D5DB] bg-white dark:bg-[#1F2937] outline-none">
              <option>This Week</option>
            </select>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} tickFormatter={(val) => `₹${val/1000}K`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="value" stroke="#5D5FEF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Top Selling Products</div>
            <Link href="/admin/products" className="text-xs text-[#5D5FEF] font-semibold no-underline">View All</Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/1.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Oversized Hoodie')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Black / L</span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹48,560</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">152 Sold</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/2.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Minimal T-Shirt')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">White / M</span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹32,450</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">108 Sold</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/3.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Cargo Pants')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Olive / 32</span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹28,990</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">76 Sold</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/1.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Denim Jacket')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Blue / M</span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹25,670</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">64 Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Recent Orders</div>
            <Link href="/admin/orders" className="text-xs text-[#5D5FEF] font-semibold no-underline">View All</Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F4F0FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center text-[0.8rem] font-semibold shrink-0">RS</div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">#SG2548</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Rohit Sharma</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 bg-[#D1FAE5] text-[#059669] dark:bg-[rgba(16,185,129,0.15)] dark:text-[#6EE7B7]">Paid</span>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹2,299</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">2m ago</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F4F0FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center text-[0.8rem] font-semibold shrink-0" style={{backgroundColor: '#EFF6FF', color: '#3B82F6'}}>AS</div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">#SG2547</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Ananya Singh</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 bg-[#D1FAE5] text-[#059669] dark:bg-[rgba(16,185,129,0.15)] dark:text-[#6EE7B7]">Paid</span>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹1,299</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">10m ago</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F4F0FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center text-[0.8rem] font-semibold shrink-0" style={{backgroundColor: '#FEF2F2', color: '#EF4444'}}>KV</div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">#SG2546</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Karan Verma</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 bg-[#FEF3C7] text-[#D97706] dark:bg-[rgba(245,158,11,0.15)] dark:text-[#FCD34D]">Pending</span>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹1,899</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">25m ago</span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#F4F0FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center text-[0.8rem] font-semibold shrink-0" style={{backgroundColor: '#F0FDF4', color: '#10B981'}}>NP</div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">#SG2545</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Neha Patel</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 bg-[#D1FAE5] text-[#059669] dark:bg-[rgba(16,185,129,0.15)] dark:text-[#6EE7B7]">Paid</span>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹2,999</span>
                <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-[1.5fr_1.5fr_1fr] gap-6">
        {/* Orders Overview */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Orders Overview</div>
            <select className="border border-[#E5E7EB] dark:border-[#374151] rounded-md py-1 px-2 text-xs text-[#4B5563] dark:text-[#D1D5DB] bg-white dark:bg-[#1F2937] outline-none">
              <option>This Week</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '200px' }}>
            <div style={{ width: '60%', height: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">256</div>
                <div className="text-[0.65rem] text-[#6B7280] dark:text-[#9CA3AF]">Total Orders</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 -mt-8" style={{ width: '40%' }}>
              {orderData.map((item, idx) => (
                <div className="flex items-center justify-between text-xs" key={idx}>
                  <div className="flex items-center gap-2 text-[#4B5563] dark:text-[#9CA3AF] w-[80px]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                  <div className="font-bold text-[#111827] dark:text-[#F9FAFB]">{item.value}</div>
                  <div className="text-[#9CA3AF]">({Math.round((item.value/256)*100)}%)</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Performance */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Store Performance</div>
            <select className="border border-[#E5E7EB] dark:border-[#374151] rounded-md py-1 px-2 text-xs text-[#4B5563] dark:text-[#D1D5DB] bg-white dark:bg-[#1F2937] outline-none">
              <option>This Week</option>
            </select>
          </div>
          <div className="flex flex-col gap-5" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
            <div className="grid grid-cols-[1fr_1fr_60px] items-center gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#F8F7FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center"><TrendingUp size={16} /></div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">Conversion Rate</span>
                  <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">2.43%</span>
                </div>
              </div>
              <div className="h-10 w-full" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineRev}><Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[0.7rem] font-semibold text-[#10B981]" style={{ textAlign: 'right' }}>↑ 6.4%</div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_60px] items-center gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#F8F7FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center" style={{backgroundColor: '#F0FDF4', color: '#10B981'}}><ShoppingBag size={16} /></div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">Avg Order Value</span>
                  <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">₹1,897</span>
                </div>
              </div>
              <div className="h-10 w-full" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineOrd}><Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[0.7rem] font-semibold text-[#10B981]" style={{ textAlign: 'right' }}>↑ 8.1%</div>
            </div>

            <div className="grid grid-cols-[1fr_1fr_60px] items-center gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#F8F7FF] dark:bg-[rgba(93,95,239,0.15)] text-[#5D5FEF] flex items-center justify-center" style={{backgroundColor: '#FEF2F2', color: '#EF4444'}}><RotateCcw size={16} /></div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">Return Rate</span>
                  <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">1.32%</span>
                </div>
              </div>
              <div className="h-10 w-full" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineOrd}><Line type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[0.7rem] font-semibold text-[#DC2626]" style={{ textAlign: 'right' }}>↓ 1.1%</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">Low Stock Alerts</div>
            <Link href="/admin/inventory" className="text-xs text-[#5D5FEF] font-semibold no-underline">View All</Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/3.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Cargo Pants')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Black / 32</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 text-[#DC2626] font-medium">5 in stock</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/1.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Oversized Hoodie')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Grey / L</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 text-[#DC2626] font-medium">7 in stock</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/2.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Denim Jacket')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Blue / M</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 text-[#DC2626] font-medium">6 in stock</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img src="/product/3.png" className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords('SAGASA Relaxed Shorts')}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">Beige / 30</span>
                </div>
              </div>
              <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 text-[#DC2626] font-medium">4 in stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
