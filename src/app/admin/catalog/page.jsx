"use client";

import { useState, useRef } from 'react';
import './AdminCatalog.css';

export default function AdminCatalog() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Men',
    subCategory: 'T-Shirts',
    price: '',
    discountPrice: '',
    sku: '',
    stock: '',
    sizes: { XS: false, S: false, M: false, L: false, XL: false, XXL: false },
    color: '',
    material: '',
    care: ''
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (images.length + newFiles.length > 7) {
      alert("You can only upload up to 7 images per product.");
      return;
    }

    const newImages = newFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      role: 'Gallery' // Default role
    }));

    // Auto-assign Primary and Hover if they don't exist yet
    setImages(prev => {
      let updated = [...prev, ...newImages];
      if (!updated.find(img => img.role === 'Primary') && updated.length > 0) {
        updated[0].role = 'Primary';
      }
      if (!updated.find(img => img.role === 'Hover Animation') && updated.length > 1) {
        updated[1].role = 'Hover Animation';
      }
      return updated;
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const changeImageRole = (index, newRole) => {
    setImages(prev => {
      const updated = [...prev];
      
      // If setting Primary or Hover, ensure no other image has that role
      if (newRole === 'Primary' || newRole === 'Hover Animation') {
        updated.forEach(img => {
          if (img.role === newRole) img.role = 'Gallery';
        });
      }
      
      updated[index].role = newRole;
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: !prev.sizes[size] }
    }));
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Sagasa Admin - Catalog Upload</h1>
        <div>Admin User</div>
      </header>

      <main className="admin-container">
        
        {/* Basic Info */}
        <section className="admin-card">
          <h2 className="admin-card-title">Basic Information</h2>
          <div className="form-group">
            <label className="admin-label">Product Title</label>
            <input 
              type="text" 
              name="title"
              className="admin-input" 
              placeholder="e.g. Classic Oversized Tee" 
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label className="admin-label">Description</label>
            <textarea 
              name="description"
              className="admin-textarea" 
              placeholder="Detailed description of the product..."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Media */}
        <section className="admin-card">
          <h2 className="admin-card-title">Media (Up to 7 Images)</h2>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
            Upload images. Select which image is the "Primary" (shown first) and which is the "Hover Animation" (shown when user hovers over the product card).
          </p>
          
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleChange} 
              style={{ display: "none" }} 
            />
            <div className="upload-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="upload-text">Click to upload or drag and drop</div>
            <div className="upload-hint">PNG, JPG up to 10MB</div>
          </div>

          {images.length > 0 && (
            <div className="image-preview-grid">
              {images.map((img, index) => (
                <div key={index} className="image-preview-card">
                  <img src={img.url} alt={`Preview ${index}`} />
                  
                  {img.role !== 'Gallery' && (
                    <div className="image-badge">{img.role}</div>
                  )}

                  <div className="image-actions">
                    <select 
                      className="set-role-select"
                      value={img.role}
                      onChange={(e) => changeImageRole(index, e.target.value)}
                    >
                      <option value="Gallery">Gallery Image</option>
                      <option value="Primary">Set as Primary</option>
                      <option value="Hover Animation">Set as Hover</option>
                    </select>
                    <button 
                      className="remove-image-btn"
                      onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Categorization */}
        <section className="admin-card">
          <h2 className="admin-card-title">Categorization</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-select" value={formData.category} onChange={handleInputChange}>
                <option>Men</option>
                <option>Women</option>
                <option>Unisex</option>
                <option>Accessories</option>
              </select>
            </div>
            <div className="form-group">
              <label className="admin-label">Sub-Category</label>
              <select name="subCategory" className="admin-select" value={formData.subCategory} onChange={handleInputChange}>
                <option>T-Shirts</option>
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Hoodies</option>
              </select>
            </div>
          </div>
        </section>

        {/* Pricing & Inventory */}
        <section className="admin-card">
          <h2 className="admin-card-title">Pricing & Inventory</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="admin-label">Regular Price (₹)</label>
              <input type="number" name="price" className="admin-input" placeholder="0.00" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="admin-label">Discount Price (₹)</label>
              <input type="number" name="discountPrice" className="admin-input" placeholder="0.00 (Optional)" value={formData.discountPrice} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="admin-label">SKU</label>
              <input type="text" name="sku" className="admin-input" placeholder="e.g. SAG-TEE-001" value={formData.sku} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="admin-label">Stock Quantity</label>
              <input type="number" name="stock" className="admin-input" placeholder="0" value={formData.stock} onChange={handleInputChange} />
            </div>
          </div>
        </section>

        {/* Variants */}
        <section className="admin-card">
          <h2 className="admin-card-title">Variants & Details</h2>
          
          <div className="form-group">
            <label className="admin-label">Available Sizes</label>
            <div className="checkbox-grid">
              {Object.keys(formData.sizes).map(size => (
                <label key={size} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={formData.sizes[size]}
                    onChange={() => handleSizeToggle(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="admin-label">Color</label>
              <input type="text" name="color" className="admin-input" placeholder="e.g. Vintage Black" value={formData.color} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label className="admin-label">Material Composition</label>
              <input type="text" name="material" className="admin-input" placeholder="e.g. 100% Premium Cotton" value={formData.material} onChange={handleInputChange} />
            </div>
          </div>
        </section>

      </main>

      {/* Save Bar */}
      <div className="admin-save-bar">
        <button className="btn-secondary">Discard</button>
        <button className="btn-primary" onClick={() => alert("Product saved to database! (UI Demonstration)")}>Save Product</button>
      </div>
    </div>
  );
}
