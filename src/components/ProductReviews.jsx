"use client";

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import './ProductReviews.css';

const ProductReviews = () => {
  const [activeTab, setActiveTab] = useState('Product Reviews');

  const customerImages = [
    '/product/Beachside Selfie in Golden Sunlight.png',
    '/product/Doorway Selfie in Soft Daylight.png',
    '/product/Mountain Traveler Beneath Open Skies.png',
    '/product/Street Style Review by the Door.png',
    '/product/ca1336e5-ac11-4f56-aa53-b8d053d74add.png'
  ];

  const filterChips = [
    'Most Helpful', 'Most Recent', 'Product Quality', 'Color', 'Material', 'Fit', 'Value For Money'
  ];

  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "Perfect fit & color. Loved it.",
      user: "Tanya",
      date: "11 May 2025",
      likes: 31,
      image: '/product/Beachside Selfie in Golden Sunlight.png'
    },
    {
      id: 2,
      rating: 5,
      text: "Quality is so good 😍",
      user: "Ishita",
      date: "8 October 2024",
      likes: 16,
      image: null
    }
  ];

  return (
    <div className="pdp-reviews-section">
      {/* Tabs */}
      <div className="reviews-tabs">
        <button 
          className={`reviews-tab active`}
        >
          Product Reviews
        </button>
      </div>

      <div className="reviews-recommendation">
        <ThumbsUp size={16} color="#16a34a" />
        <span style={{color: '#16a34a', fontWeight: 600}}>91%</span>
        <span> of verified buyers recommend this product</span>
      </div>

      {/* Ratings Breakdown */}
      <div className="reviews-breakdown-container">
        <div className="reviews-score-block">
          <div className="reviews-big-score">4.8</div>
          <div className="reviews-subtitle">33 ratings</div>
          <div className="reviews-stars">
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" color="currentColor" />)}
          </div>
          <button className="reviews-rate-btn">RATE</button>
        </div>
        <div className="reviews-bars-block">
          {[
            { stars: 5, percent: 80, count: 22 },
            { stars: 4, percent: 15, count: 14 },
            { stars: 3, percent: 5, count: 3 },
            { stars: 2, percent: 0, count: 0 },
            { stars: 1, percent: 0, count: 0 }
          ].map(row => (
            <div className="reviews-bar-row" key={row.stars}>
              <span className="reviews-bar-label">{row.stars}</span>
              <div className="reviews-bar-track">
                <div className="reviews-bar-fill" style={{width: `${row.percent}%`}}></div>
              </div>
              <span className="reviews-bar-count">({row.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Images */}
      <div className="reviews-images-section">
        <h3 className="reviews-section-title">Customer Images ({customerImages.length})</h3>
        <div className="reviews-images-grid">
          {customerImages.map((src, idx) => (
            <div className="reviews-image-wrapper" key={idx}>
              <img src={src} alt={`Customer pic ${idx+1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Comments */}
      <div className="reviews-comments-section">
        <h3 className="reviews-section-title">Hear what our customers say (33)</h3>
        <div className="reviews-filters">
          {filterChips.map(chip => (
            <button className="reviews-filter-chip" key={chip}>{chip}</button>
          ))}
        </div>

        <div className="reviews-list">
          {reviews.map(review => (
            <div className="review-card" key={review.id}>
              <div className="review-stars">
                {[1,2,3,4,5].map(i => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i <= review.rating ? "#111" : "none"} 
                    color="#111" 
                  />
                ))}
              </div>
              <p className="review-text">{review.text}</p>
              {review.image && (
                <div className="review-photo">
                  <img src={review.image} alt="Review" />
                </div>
              )}
              <div className="review-meta">
                <div className="review-author">
                  <span className="review-name">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-helpful">
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <span className="helpful-count">({review.likes})</span>
                    <ThumbsUp size={14} />
                  </div>
                  <span className="helpful-text">People found this helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="view-all-reviews-btn">View all Reviews</button>
      </div>
    </div>
  );
};

export default ProductReviews;
