"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, Users, Shirt, Calendar, Info, TrendingUp, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'May 14', value: 20000 }, { name: 'May 15', value: 45000 }, { name: 'May 16', value: 35000 },
  { name: 'May 17', value: 85000 }, { name: 'May 18', value: 45000 }, { name: 'May 19', value: 65000 },
  { name: 'May 20', value: 95000 },
];

const sRev = [{v:0},{v:10},{v:5},{v:15},{v:10},{v:20},{v:15},{v:25}];
const sOrd = [{v:10},{v:5},{v:15},{v:10},{v:20},{v:15},{v:25},{v:20}];
const sCus = [{v:5},{v:15},{v:10},{v:20},{v:15},{v:25},{v:20},{v:30}];
const sPro = [{v:15},{v:10},{v:20},{v:15},{v:25},{v:20},{v:30},{v:25}];

const orderData = [
  { name: 'Delivered', value: 152, color: '#10B981' }, { name: 'Processing', value: 56, color: '#5D5FEF' },
  { name: 'Pending', value: 32, color: '#F59E0B' }, { name: 'Cancelled', value: 16, color: '#EF4444' },
];

const truncateWords = (str, num = 3) => {
  if (!str) return '';
  const words = str.split(' ');
  return words.length > num ? words.slice(0, num).join(' ') + '...' : str;
};

const kpiCards = [
  { title: 'Total Revenue', value: '₹2,45,680', trend: '↑ 15.6% from last week', trendColor: 'text-[#10B981]', icon: ShoppingBag, bg: 'bg-[#5D5FEF]', data: sRev, stroke: '#5D5FEF' },
  { title: 'Total Orders', value: '256', trend: '↑ 12.4% from last week', trendColor: 'text-[#10B981]', icon: Package, bg: 'bg-[#10B981]', data: sOrd, stroke: '#10B981' },
  { title: 'Total Customers', value: '1,289', trend: '↑ 8.7% from last week', trendColor: 'text-[#10B981]', icon: Users, bg: 'bg-[#F59E0B]', data: sCus, stroke: '#F59E0B' },
  { title: 'Total Products', value: '128', trend: '↑ 5.3% from last week', trendColor: 'text-[#10B981]', icon: Shirt, bg: 'bg-[#5D5FEF]', data: sPro, stroke: '#5D5FEF' },
];

const topProducts = [
  { name: 'SAGASA Oversized Hoodie', variant: 'Black / L', price: '₹48,560', sold: '152 Sold', img: '/product/1.png' },
  { name: 'SAGASA Minimal T-Shirt', variant: 'White / M', price: '₹32,450', sold: '108 Sold', img: '/product/2.png' },
  { name: 'SAGASA Cargo Pants', variant: 'Olive / 32', price: '₹28,990', sold: '76 Sold', img: '/product/3.png' },
  { name: 'SAGASA Denim Jacket', variant: 'Blue / M', price: '₹25,670', sold: '64 Sold', img: '/product/1.png' },
];

const recentOrders = [
  { initials: 'RS', name: 'Rohit Sharma', id: '#SG2548', status: 'Paid', price: '₹2,299', time: '2m ago', color: '#5D5FEF', bg: '#F4F0FF', statusColor: 'text-[#059669]', statusBg: 'bg-[#D1FAE5]', darkStatusBg: 'dark:bg-[rgba(16,185,129,0.15)]', darkStatusText: 'dark:text-[#6EE7B7]' },
  { initials: 'AS', name: 'Ananya Singh', id: '#SG2547', status: 'Paid', price: '₹1,299', time: '10m ago', color: '#3B82F6', bg: '#EFF6FF', statusColor: 'text-[#059669]', statusBg: 'bg-[#D1FAE5]', darkStatusBg: 'dark:bg-[rgba(16,185,129,0.15)]', darkStatusText: 'dark:text-[#6EE7B7]' },
  { initials: 'KV', name: 'Karan Verma', id: '#SG2546', status: 'Pending', price: '₹1,899', time: '25m ago', color: '#EF4444', bg: '#FEF2F2', statusColor: 'text-[#D97706]', statusBg: 'bg-[#FEF3C7]', darkStatusBg: 'dark:bg-[rgba(245,158,11,0.15)]', darkStatusText: 'dark:text-[#FCD34D]' },
  { initials: 'NP', name: 'Neha Patel', id: '#SG2545', status: 'Paid', price: '₹2,999', time: '1h ago', color: '#10B981', bg: '#F0FDF4', statusColor: 'text-[#059669]', statusBg: 'bg-[#D1FAE5]', darkStatusBg: 'dark:bg-[rgba(16,185,129,0.15)]', darkStatusText: 'dark:text-[#6EE7B7]' },
];

const storePerformance = [
  { title: 'Conversion Rate', value: '2.43%', trend: '↑ 6.4%', trendColor: 'text-[#10B981]', icon: TrendingUp, iconBg: '#F8F7FF', iconColor: '#5D5FEF', data: sRev, stroke: '#5D5FEF' },
  { title: 'Avg Order Value', value: '₹1,897', trend: '↑ 8.1%', trendColor: 'text-[#10B981]', icon: ShoppingBag, iconBg: '#F0FDF4', iconColor: '#10B981', data: sOrd, stroke: '#10B981' },
  { title: 'Return Rate', value: '1.32%', trend: '↓ 1.1%', trendColor: 'text-[#DC2626]', icon: RotateCcw, iconBg: '#FEF2F2', iconColor: '#EF4444', data: sOrd, stroke: '#EF4444' },
];

const lowStockAlerts = [
  { name: 'SAGASA Cargo Pants', variant: 'Black / 32', stock: '5 in stock', img: '/product/3.png' },
  { name: 'SAGASA Oversized Hoodie', variant: 'Grey / L', stock: '7 in stock', img: '/product/1.png' },
  { name: 'SAGASA Denim Jacket', variant: 'Blue / M', stock: '6 in stock', img: '/product/2.png' },
  { name: 'SAGASA Relaxed Shorts', variant: 'Beige / 30', stock: '4 in stock', img: '/product/3.png' },
];

const SectionHeader = ({ title, info, action, actionText = 'View All' }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="text-[0.95rem] font-bold text-[#111827] dark:text-[#F9FAFB] flex items-center gap-2">
      {title} {info && <Info size={14} color="#9CA3AF" />}
    </div>
    {action === 'select' ? (
      <select className="border border-[#E5E7EB] dark:border-[#374151] rounded-md py-1 px-2 text-xs text-[#4B5563] dark:text-[#D1D5DB] bg-white dark:bg-[#1F2937] outline-none"><option>This Week</option></select>
    ) : (
      <Link href={action} className="text-xs text-[#5D5FEF] font-semibold no-underline">{actionText}</Link>
    )}
  </div>
);

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
          <Calendar size={16} /> May 14 — May 20, 2025 <span className="ml-1 text-[10px]">▼</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {kpiCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-5 flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${card.bg} text-white`}><card.icon size={20} /></div>
              <div className="flex flex-col">
                <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-[0.15rem]">{card.title}</span>
                <span className="text-[1.4rem] font-bold text-[#111827] dark:text-[#F9FAFB] leading-[1.1] mb-1">{card.value}</span>
                <span className={`text-[0.7rem] font-semibold ${card.trendColor}`}>{card.trend}</span>
              </div>
            </div>
            <div className="h-10 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={card.data}><Line type="monotone" dataKey="v" stroke={card.stroke} strokeWidth={2} dot={false} isAnimationActive={false} /></LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.8fr_1.1fr_1.1fr] gap-6 mb-6">
        {/* Sales Overview Chart */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <SectionHeader title="Sales Overview" info action="select" />
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} tickFormatter={(val) => `₹${val/1000}K`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="value" stroke="#5D5FEF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <SectionHeader title="Top Selling Products" action="/admin/products" />
          <div className="flex flex-col gap-5">
            {topProducts.map((p, i) => (
              <div key={i} className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={p.img} className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords(p.name)}</span>
                    <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">{p.variant}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">{p.price}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">{p.sold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <SectionHeader title="Recent Orders" action="/admin/orders" />
          <div className="flex flex-col gap-5">
            {recentOrders.map((o, i) => (
              <div key={i} className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[0.8rem] font-semibold shrink-0" style={{backgroundColor: o.bg, color: o.color}}>{o.initials}</div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{o.id}</span>
                    <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">{o.name}</span>
                  </div>
                </div>
                <span className={`text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 ${o.statusBg} ${o.statusColor} ${o.darkStatusBg} ${o.darkStatusText}`}>{o.status}</span>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">{o.price}</span>
                  <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF]">{o.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.5fr_1.5fr_1fr] gap-6">
        {/* Orders Overview */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <SectionHeader title="Orders Overview" action="select" />
          <div className="flex items-center h-[200px]">
            <div className="w-[60%] h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                    {orderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">256</div>
                <div className="text-[0.65rem] text-[#6B7280] dark:text-[#9CA3AF]">Total Orders</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 -mt-8 w-[40%]">
              {orderData.map((item, idx) => (
                <div className="flex items-center justify-between text-xs" key={idx}>
                  <div className="flex items-center gap-2 text-[#4B5563] dark:text-[#9CA3AF] w-[80px]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span> {item.name}
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
          <SectionHeader title="Store Performance" action="select" />
          <div className="flex flex-col gap-6 mt-2">
            {storePerformance.map((p, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_60px] items-center gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: p.iconBg, color: p.iconColor}}><p.icon size={16} /></div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{p.title}</span>
                    <span className="text-[0.85rem] font-bold text-[#111827] dark:text-[#F9FAFB]">{p.value}</span>
                  </div>
                </div>
                <div className="h-[30px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={p.data}><Line type="monotone" dataKey="v" stroke={p.stroke} strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </div>
                <div className={`text-[0.7rem] font-semibold text-right ${p.trendColor}`}>{p.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none flex flex-col">
          <SectionHeader title="Low Stock Alerts" action="/admin/inventory" />
          <div className="flex flex-col gap-5">
            {lowStockAlerts.map((a, i) => (
              <div key={i} className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img src={a.img} className="w-9 h-9 rounded-lg object-cover bg-[#F3F4F6] dark:bg-[#1F2937] shrink-0" alt="Product" />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[0.8rem] font-semibold text-[#111827] dark:text-[#F9FAFB] mb-[0.1rem] whitespace-nowrap overflow-hidden text-ellipsis">{truncateWords(a.name)}</span>
                    <span className="text-[0.7rem] text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap overflow-hidden text-ellipsis">{a.variant}</span>
                  </div>
                </div>
                <span className="text-[0.65rem] py-[0.15rem] px-2 rounded-xl font-semibold shrink-0 text-[#DC2626] font-medium">{a.stock}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
