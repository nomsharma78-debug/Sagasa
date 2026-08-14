"use client";

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

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
    <div className="mt-12">
      {/* Tabs */}
      <div className="flex bg-[var(--color-surface)] rounded-lg p-1 mb-6">
        <button 
          className="flex-1 bg-[var(--color-background)] border-none py-3 px-4 text-sm font-semibold text-[var(--color-foreground)] cursor-pointer rounded-md transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
        >
          Product Reviews
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm mb-6">
        <ThumbsUp size={16} color="#16a34a" />
        <span style={{color: '#16a34a', fontWeight: 600}}>91%</span>
        <span> of verified buyers recommend this product</span>
      </div>

      {/* Ratings Breakdown */}
      <div className="flex items-center gap-8 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="text-[3rem] font-bold leading-none mb-1">4.8</div>
          <div className="text-xs text-[var(--color-text-muted)] mb-2">33 ratings</div>
          <div className="flex gap-[0.15rem] mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" color="currentColor" />)}
          </div>
          <button className="bg-transparent border border-[var(--color-border)] py-1 px-4 rounded text-xs font-semibold text-[var(--color-foreground)] cursor-pointer">RATE</button>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[
            { stars: 5, percent: 80, count: 22 },
            { stars: 4, percent: 15, count: 14 },
            { stars: 3, percent: 5, count: 3 },
            { stars: 2, percent: 0, count: 0 },
            { stars: 1, percent: 0, count: 0 }
          ].map(row => (
            <div className="flex items-center gap-2 text-xs" key={row.stars}>
              <span className="w-[12px] font-semibold">{row.stars}</span>
              <div className="flex-1 h-[6px] bg-[var(--color-border)] rounded-full overflow-hidden">
                <div className="h-full bg-[#16a34a] rounded-full" style={{width: `${row.percent}%`}}></div>
              </div>
              <span className="w-[25px] text-[var(--color-text-muted)] text-right">({row.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Images */}
      <div>
        <h3 className="text-base font-semibold mb-4">Customer Images ({customerImages.length})</h3>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {customerImages.map((src, idx) => (
            <div className="aspect-square overflow-hidden rounded" key={idx}>
              <img src={src} alt={`Customer pic ${idx+1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Comments */}
      <div>
        <h3 className="text-base font-semibold mb-4">Hear what our customers say (33)</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {filterChips.map(chip => (
            <button className="bg-transparent border border-[var(--color-border)] py-[0.35rem] px-3 rounded text-xs text-[var(--color-text-muted)] cursor-pointer transition-all duration-200 hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]" key={chip}>{chip}</button>
          ))}
        </div>

        <div className="flex flex-col gap-6 mb-6">
          {reviews.map(review => (
            <div className="flex flex-col gap-2 pb-6 border-b border-[var(--color-border)] last:border-b-0" key={review.id}>
              <div className="flex gap-[0.15rem]">
                {[1,2,3,4,5].map(i => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i <= review.rating ? "#111" : "none"} 
                    color="#111" 
                  />
                ))}
              </div>
              <p className="text-sm font-medium">{review.text}</p>
              {review.image && (
                <div className="w-[100px] h-[100px] overflow-hidden rounded">
                  <img src={review.image} alt="Review" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex justify-between items-end mt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{review.user}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">{review.date}</span>
                </div>
                <div className="flex flex-col items-end gap-1 text-[var(--color-text-muted)]">
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                    <span className="text-xs font-semibold">({review.likes})</span>
                    <ThumbsUp size={14} />
                  </div>
                  <span className="text-[0.65rem]">People found this helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full p-3 bg-transparent border border-[var(--color-border)] rounded font-semibold text-sm text-[#0284c7] cursor-pointer transition-colors duration-200 hover:bg-[var(--color-surface)]">View all Reviews</button>
      </div>
    </div>
  );
};

export default ProductReviews;
