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
import './Dashboard.css';

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
    <div className="admin-container dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h1>Welcome back, Admin 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <button className="date-picker-btn">
          <Calendar size={16} />
          May 14 — May 20, 2025
          <span style={{ marginLeft: '0.25rem', fontSize: '10px' }}>▼</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-kpi-grid">
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <div className="dash-kpi-icon purple"><ShoppingBag size={20} /></div>
            <div className="dash-kpi-info">
              <span className="dash-kpi-label">Total Revenue</span>
              <span className="dash-kpi-value">₹2,45,680</span>
              <span className="dash-kpi-trend up">↑ 15.6% from last week</span>
            </div>
          </div>
          <div className="dash-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineRev}>
                <Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <div className="dash-kpi-icon green"><Package size={20} /></div>
            <div className="dash-kpi-info">
              <span className="dash-kpi-label">Total Orders</span>
              <span className="dash-kpi-value">256</span>
              <span className="dash-kpi-trend up">↑ 12.4% from last week</span>
            </div>
          </div>
          <div className="dash-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineOrd}>
                <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <div className="dash-kpi-icon orange"><Users size={20} /></div>
            <div className="dash-kpi-info">
              <span className="dash-kpi-label">Total Customers</span>
              <span className="dash-kpi-value">1,289</span>
              <span className="dash-kpi-trend up">↑ 8.7% from last week</span>
            </div>
          </div>
          <div className="dash-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineCus}>
                <Line type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <div className="dash-kpi-icon purple"><Shirt size={20} /></div>
            <div className="dash-kpi-info">
              <span className="dash-kpi-label">Total Products</span>
              <span className="dash-kpi-value">128</span>
              <span className="dash-kpi-trend up">↑ 5.3% from last week</span>
            </div>
          </div>
          <div className="dash-kpi-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklinePro}>
                <Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Middle Grid */}
      <div className="dashboard-main-grid">
        {/* Sales Overview Chart */}
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Sales Overview <Info size={14} color="#9CA3AF" /></div>
            <select className="widget-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="chart-container">
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
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Top Selling Products</div>
            <Link href="/admin/products" className="widget-action">View All</Link>
          </div>
          <div className="widget-list">
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/1.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Oversized Hoodie')}</span>
                  <span className="list-item-subtitle">Black / L</span>
                </div>
              </div>
              <div className="list-item-right">
                <span className="list-item-value">₹48,560</span>
                <span className="list-item-subvalue">152 Sold</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/2.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Minimal T-Shirt')}</span>
                  <span className="list-item-subtitle">White / M</span>
                </div>
              </div>
              <div className="list-item-right">
                <span className="list-item-value">₹32,450</span>
                <span className="list-item-subvalue">108 Sold</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/3.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Cargo Pants')}</span>
                  <span className="list-item-subtitle">Olive / 32</span>
                </div>
              </div>
              <div className="list-item-right">
                <span className="list-item-value">₹28,990</span>
                <span className="list-item-subvalue">76 Sold</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/1.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Denim Jacket')}</span>
                  <span className="list-item-subtitle">Blue / M</span>
                </div>
              </div>
              <div className="list-item-right">
                <span className="list-item-value">₹25,670</span>
                <span className="list-item-subvalue">64 Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Recent Orders</div>
            <Link href="/admin/orders" className="widget-action">View All</Link>
          </div>
          <div className="widget-list">
            <div className="list-item">
              <div className="list-item-left">
                <div className="list-item-avatar">RS</div>
                <div className="list-item-info">
                  <span className="list-item-title">#SG2548</span>
                  <span className="list-item-subtitle">Rohit Sharma</span>
                </div>
              </div>
              <span className="status-pill paid">Paid</span>
              <div className="list-item-right">
                <span className="list-item-value">₹2,299</span>
                <span className="list-item-subvalue">2m ago</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <div className="list-item-avatar" style={{backgroundColor: '#EFF6FF', color: '#3B82F6'}}>AS</div>
                <div className="list-item-info">
                  <span className="list-item-title">#SG2547</span>
                  <span className="list-item-subtitle">Ananya Singh</span>
                </div>
              </div>
              <span className="status-pill paid">Paid</span>
              <div className="list-item-right">
                <span className="list-item-value">₹1,299</span>
                <span className="list-item-subvalue">10m ago</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <div className="list-item-avatar" style={{backgroundColor: '#FEF2F2', color: '#EF4444'}}>KV</div>
                <div className="list-item-info">
                  <span className="list-item-title">#SG2546</span>
                  <span className="list-item-subtitle">Karan Verma</span>
                </div>
              </div>
              <span className="status-pill pending">Pending</span>
              <div className="list-item-right">
                <span className="list-item-value">₹1,899</span>
                <span className="list-item-subvalue">25m ago</span>
              </div>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <div className="list-item-avatar" style={{backgroundColor: '#F0FDF4', color: '#10B981'}}>NP</div>
                <div className="list-item-info">
                  <span className="list-item-title">#SG2545</span>
                  <span className="list-item-subtitle">Neha Patel</span>
                </div>
              </div>
              <span className="status-pill paid">Paid</span>
              <div className="list-item-right">
                <span className="list-item-value">₹2,999</span>
                <span className="list-item-subvalue">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">
        {/* Orders Overview */}
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Orders Overview</div>
            <select className="widget-select">
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
                <div className="donut-total-val">256</div>
                <div className="donut-total-label">Total Orders</div>
              </div>
            </div>
            
            <div className="donut-legend" style={{ width: '40%' }}>
              {orderData.map((item, idx) => (
                <div className="legend-item" key={idx}>
                  <div className="legend-label">
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                    {item.name}
                  </div>
                  <div className="legend-value">{item.value}</div>
                  <div className="legend-percent">({Math.round((item.value/256)*100)}%)</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Performance */}
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Store Performance</div>
            <select className="widget-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="widget-list" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
            <div className="perf-row">
              <div className="list-item-left">
                <div className="perf-icon"><TrendingUp size={16} /></div>
                <div className="list-item-info">
                  <span className="list-item-title">Conversion Rate</span>
                  <span className="list-item-value">2.43%</span>
                </div>
              </div>
              <div className="dash-kpi-sparkline" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineRev}><Line type="monotone" dataKey="v" stroke="#5D5FEF" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="dash-kpi-trend up" style={{ textAlign: 'right' }}>↑ 6.4%</div>
            </div>

            <div className="perf-row">
              <div className="list-item-left">
                <div className="perf-icon" style={{backgroundColor: '#F0FDF4', color: '#10B981'}}><ShoppingBag size={16} /></div>
                <div className="list-item-info">
                  <span className="list-item-title">Avg Order Value</span>
                  <span className="list-item-value">₹1,897</span>
                </div>
              </div>
              <div className="dash-kpi-sparkline" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineOrd}><Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="dash-kpi-trend up" style={{ textAlign: 'right' }}>↑ 8.1%</div>
            </div>

            <div className="perf-row">
              <div className="list-item-left">
                <div className="perf-icon" style={{backgroundColor: '#FEF2F2', color: '#EF4444'}}><RotateCcw size={16} /></div>
                <div className="list-item-info">
                  <span className="list-item-title">Return Rate</span>
                  <span className="list-item-value">1.32%</span>
                </div>
              </div>
              <div className="dash-kpi-sparkline" style={{ height: '30px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineOrd}><Line type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={2} dot={false} /></LineChart>
                </ResponsiveContainer>
              </div>
              <div className="dash-kpi-trend down" style={{ textAlign: 'right' }}>↓ 1.1%</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="dash-widget">
          <div className="widget-header">
            <div className="widget-title">Low Stock Alerts</div>
            <Link href="/admin/inventory" className="widget-action">View All</Link>
          </div>
          <div className="widget-list">
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/3.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Cargo Pants')}</span>
                  <span className="list-item-subtitle">Black / 32</span>
                </div>
              </div>
              <span className="status-pill alert">5 in stock</span>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/1.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Oversized Hoodie')}</span>
                  <span className="list-item-subtitle">Grey / L</span>
                </div>
              </div>
              <span className="status-pill alert">7 in stock</span>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/2.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Denim Jacket')}</span>
                  <span className="list-item-subtitle">Blue / M</span>
                </div>
              </div>
              <span className="status-pill alert">6 in stock</span>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <img src="/product/3.png" className="list-item-image" alt="Product" />
                <div className="list-item-info">
                  <span className="list-item-title">{truncateWords('SAGASA Relaxed Shorts')}</span>
                  <span className="list-item-subtitle">Beige / 30</span>
                </div>
              </div>
              <span className="status-pill alert">4 in stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
