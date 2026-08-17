import { useState } from 'react';

export default function NotificationsTab() {
  const [settings, setSettings] = useState({
    orderUpdatesEmail: true,
    orderUpdatesSms: false,
    promotionsEmail: true,
    promotionsSms: false,
    newsletter: true,
    restockAlerts: true
  });

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const ToggleSwitch = ({ checked, onChange }) => (
    <button 
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#222]' : 'bg-[#D0D0D0]'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Notifications</h2>
        <p className="text-sm text-[#666] mt-1">Control how and when you want to be contacted.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
        
        <div className="p-6 lg:p-8 border-b border-[#EAEAEA]">
          <h3 className="text-sm font-bold text-[#222] tracking-wider uppercase mb-6">Orders & Shipping</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222]">Email Updates</span>
                <span className="text-xs text-[#666]">Receive order confirmations, tracking details, and delivery updates via email.</span>
              </div>
              <ToggleSwitch checked={settings.orderUpdatesEmail} onChange={() => toggle('orderUpdatesEmail')} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222]">SMS Updates</span>
                <span className="text-xs text-[#666]">Receive real-time text messages about your delivery status.</span>
              </div>
              <ToggleSwitch checked={settings.orderUpdatesSms} onChange={() => toggle('orderUpdatesSms')} />
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <h3 className="text-sm font-bold text-[#222] tracking-wider uppercase mb-6">Marketing & Offers</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222]">Exclusive Promotions (Email)</span>
                <span className="text-xs text-[#666]">Get early access to sales and exclusive offers.</span>
              </div>
              <ToggleSwitch checked={settings.promotionsEmail} onChange={() => toggle('promotionsEmail')} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222]">Sagasa Newsletter</span>
                <span className="text-xs text-[#666]">Weekly edits, style guides, and brand updates.</span>
              </div>
              <ToggleSwitch checked={settings.newsletter} onChange={() => toggle('newsletter')} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#222]">Restock Alerts</span>
                <span className="text-xs text-[#666]">Get notified when your favorite out-of-stock items return.</span>
              </div>
              <ToggleSwitch checked={settings.restockAlerts} onChange={() => toggle('restockAlerts')} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
