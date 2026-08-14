"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Download, 
  Plus, 
  ShoppingBag, 
  Sun, 
  CreditCard, 
  TrendingUp, 
  Search, 
  ChevronDown,
  Filter,
  ArrowUpDown,
  Edit2,
  Copy,
  Trash2
} from 'lucide-react';
import './ProductsList.css';

const dummyProducts = [
  { id: 1, name: 'SAGASA Oversized Hoodie', sku: 'SG-HOD-BLK-001', category: 'Hoodies', price: '₹1,899', stock: 45, status: 'Active', image: '/product/2.png' },
  { id: 2, name: 'SAGASA Minimal T-Shirt', sku: 'SG-TSH-WHT-002', category: 'T-Shirts', price: '₹799', stock: 120, status: 'Active', image: '/product/3.png' },
  { id: 3, name: 'SAGASA Cargo Pants', sku: 'SG-CRG-BLK-003', category: 'Pants', price: '₹2,299', stock: 32, status: 'Active', image: '/product/1.png' },
  { id: 4, name: 'SAGASA Denim Jacket', sku: 'SG-DNJ-BLU-004', category: 'Jackets', price: '₹2,999', stock: 15, status: 'Low Stock', image: '/product/Street Style Review by the Door.png' },
  { id: 5, name: 'SAGASA Relaxed Shorts', sku: 'SG-SRT-BGE-005', category: 'Shorts', price: '₹1,299', stock: 0, status: 'Out of Stock', image: '/product/Mountain Traveler Beneath Open Skies.png' },
];

export default function ProductsListPage() {
  return (
    <div className="admin-container products-list-page">
      {/* Header Area */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Products</h1>
          <div className="breadcrumbs">
            <span>Dashboard</span>
            <span className="separator">{'>'}</span>
            <span>Products</span>
            <span className="separator">{'>'}</span>
            <span className="current">All Products</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Download size={16} /> Export
          </button>
          <Link href="/admin/catalog" className="btn-primary">
            <Plus size={16} /> Add New Product
          </Link>
        </div>
      </div>



      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-search">
          <Search size={16} color="#9CA3AF" />
          <input type="text" placeholder="Search products..." />
        </div>
        
        <div className="toolbar-filters">
          <div className="filter-dropdown">
            <span>All Categories</span>
            <ChevronDown size={14} />
          </div>
          <div className="filter-dropdown">
            <span>All Collections</span>
            <ChevronDown size={14} />
          </div>
          <div className="filter-dropdown">
            <span>Status: All</span>
            <ChevronDown size={14} />
          </div>
          
          <button className="toolbar-btn">
            <Filter size={16} /> Filter
          </button>
          <button className="toolbar-btn">
            <ArrowUpDown size={16} /> Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <div className="product-name">{product.name}</div>
                      <div className="product-sku">SKU: {product.sku}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`category-badge ${product.category.toLowerCase().replace(/\s+/g, '-')}`}>{product.category}</span>
                </td>
                <td className="price-cell">{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status-badge ${product.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="Edit"><Edit2 size={14} /></button>
                    <button className="action-btn" title="Duplicate"><Copy size={14} /></button>
                    <button className="action-btn" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-bar">
        <span className="pagination-info">Showing 1 to 5 of 128 products</span>
        <div className="pagination-controls">
          <button className="page-btn disabled">{'<'}</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">...</span>
          <button className="page-btn">26</button>
          <button className="page-btn">{'>'}</button>
          
          <div className="per-page-dropdown">
            5 / page <ChevronDown size={14} style={{ marginLeft: '4px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
