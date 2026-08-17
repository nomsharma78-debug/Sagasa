"use client";

import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';

export default function PreferencesTab({ profile, setProfile }) {
  const getCategory = (data) => {
    const prefs = data?.preferences || {};
    if (prefs.primaryCategory) return prefs.primaryCategory;
    if (data?.gender === 'Female') return "Women's";
    if (data?.gender === 'Male') return "Men's";
    return "Show Both";
  };

  const [language, setLanguage] = useState(profile?.preferences?.language || 'English (US)');
  const [currency, setCurrency] = useState(profile?.preferences?.currency || 'INR (₹)');
  const [primaryCategory, setPrimaryCategory] = useState(() => getCategory(profile));
  const [preferredSize, setPreferredSize] = useState(profile?.preferences?.preferredSize || 'M');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (profile) {
      const prefs = profile.preferences || {};
      setLanguage(prefs.language || 'English (US)');
      setCurrency(prefs.currency || 'INR (₹)');
      setPreferredSize(prefs.preferredSize || 'M');
      setPrimaryCategory(getCategory(profile));
    }
  }, [profile]);

  const isFormChanged = profile && (
    language !== (profile.preferences?.language || 'English (US)') ||
    currency !== (profile.preferences?.currency || 'INR (₹)') ||
    primaryCategory !== getCategory(profile) ||
    preferredSize !== (profile.preferences?.preferredSize || 'M')
  );

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isFormChanged) return;
    setIsSaving(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferences: { language, currency, primaryCategory, preferredSize }
        })
      });

      if (res.ok) {
        const result = await res.json();
        setProfile(result.user || { ...profile, preferences: { language, currency, primaryCategory, preferredSize } });
        setToast({ message: 'Shopping preferences updated successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to update preferences', type: 'error' });
      }
    } catch {
      setToast({ message: 'Network error updating preferences', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Shopping Preferences</h2>
        <p className="text-sm text-[#666] mt-1">Customize your shopping experience on Sagasa.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 lg:p-8">
        <form className="flex flex-col gap-8" onSubmit={handleSave}>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[#222] tracking-wider uppercase">Localization</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors cursor-pointer appearance-none"
                >
                  <option value="English (US)">English (US)</option>
                  <option value="English (UK)">English (UK)</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#666] text-sm bg-[#F9F9F9] focus:outline-none cursor-not-allowed appearance-none"
                  title="Sagasa exclusively transacts in Indian Rupees (INR)"
                >
                  <option value="INR (₹)">INR (₹)</option>
                </select>
                <span className="text-[11px] text-[#888]">Indian Rupees (₹) only</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#EAEAEA]" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#222] tracking-wider uppercase">Style Profile</h3>
              {profile?.gender && (
                <span className="text-xs text-[#888]">
                  Auto-selected from gender: <strong className="text-[#333]">{profile.gender}</strong>
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Primary Category</label>
                <select 
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors cursor-pointer appearance-none font-medium"
                >
                  <option value="Women's">Women's</option>
                  <option value="Men's">Men's</option>
                  <option value="Show Both">Show Both</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Preferred Top Size</label>
                <select 
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors cursor-pointer appearance-none"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving || !isFormChanged}
              className={`px-8 py-3.5 rounded-lg font-medium text-[0.95rem] transition-all flex items-center justify-center min-w-[160px] ${
                isFormChanged 
                  ? 'bg-[#222] text-white hover:bg-[#333] shadow-md shadow-black/5 hover:-translate-y-0.5' 
                  : 'bg-[#F4F4F4] text-[#A0A0A0] cursor-not-allowed'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>

      {toast.message && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ message: '', type: 'success' })} 
        />
      )}
    </div>
  );
}
