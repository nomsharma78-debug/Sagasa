"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Package, Heart, MapPin, CreditCard, User, Settings, Bell, ShieldCheck, LogOut, Menu, X } from 'lucide-react';

import OverviewTab from '@/components/profile/OverviewTab';
import OrdersTab from '@/components/profile/OrdersTab';
import WishlistTab from '@/components/profile/WishlistTab';
import AddressesTab from '@/components/profile/AddressesTab';
import PaymentMethodsTab from '@/components/profile/PaymentMethodsTab';
import ProfileDetailsTab from '@/components/profile/ProfileDetailsTab';
import PreferencesTab from '@/components/profile/PreferencesTab';
import NotificationsTab from '@/components/profile/NotificationsTab';
import SecurityTab from '@/components/profile/SecurityTab';
import SagasaLoader from '@/components/SagasaLoader';

const TABS = {
  Overview: OverviewTab,
  Orders: OrdersTab,
  Wishlist: WishlistTab,
  Addresses: AddressesTab,
  'Payment Methods': PaymentMethodsTab,
  'Profile Details': ProfileDetailsTab,
  Preferences: PreferencesTab,
  Notifications: NotificationsTab,
  Security: SecurityTab
};

const NAV = {
  ACCOUNT: [{ id: 'Overview', icon: User }, { id: 'Orders', icon: Package }, { id: 'Wishlist', icon: Heart }, { id: 'Addresses', icon: MapPin }, { id: 'Payment Methods', icon: CreditCard }],
  PERSONAL: [{ id: 'Profile Details', icon: User }, { id: 'Preferences', icon: Settings }, { id: 'Notifications', icon: Bell }, { id: 'Security', icon: ShieldCheck }]
};

function ProfileContent({ profile, setProfile }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(() => (tabParam && TABS[tabParam] ? tabParam : 'Overview'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tabParam && TABS[tabParam] ? tabParam : 'Overview');
  }, [tabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      tabId === 'Overview' ? url.searchParams.delete('tab') : url.searchParams.set('tab', tabId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.ok ? res.json() : router.push('/login'))
      .then(data => data && !data.error && setProfile(data))
      .catch(() => router.push('/login'));
  }, [router, setProfile]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') localStorage.removeItem('sagasa_auth');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/login');
  };

  const ActiveComponent = TABS[activeTab] || OverviewTab;

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#222] font-[family-name:var(--font-body)]">
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
      <div className="container mx-auto px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h1 className="text-2xl font-[family-name:var(--font-display)] font-medium">My Account</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white rounded-lg border border-[#EAEAEA]">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <aside className={`fixed lg:static inset-y-0 left-0 w-[260px] bg-[#FAF9F6] lg:bg-transparent z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0 border-r border-[#EAEAEA] shadow-2xl p-6 lg:p-0' : '-translate-x-full lg:translate-x-0'
        } lg:flex lg:flex-col shrink-0`}>
          <div className="lg:hidden flex justify-between items-center mb-8">
            <span className="font-[family-name:var(--font-display)] font-medium text-xl">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
          </div>

          <div className="space-y-8">
            {Object.entries(NAV).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-[10px] font-bold text-[#888] tracking-widest uppercase mb-3 pl-4">{category}</h3>
                <nav className="flex flex-col gap-1">
                  {items.map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => handleTabChange(id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                        activeTab === id ? 'bg-white shadow-sm text-[#222]' : 'text-[#666] hover:bg-[#F0EFEA] hover:text-[#222]'
                      }`}
                    >
                      <Icon size={18} strokeWidth={activeTab === id ? 2 : 1.5} className={activeTab === id ? 'text-[#222]' : 'text-[#888]'} />
                      {id}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 mt-8 text-sm font-medium text-[#666] hover:text-[#222] transition-colors w-full text-left">
            <LogOut size={18} strokeWidth={1.5} className="text-[#888]" />
            Sign Out
          </button>
        </aside>

        <main className="flex-1 max-w-[1000px] pb-12">
          {profile && <ActiveComponent setActiveTab={handleTabChange} profile={profile} setProfile={setProfile} />}
        </main>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [profile, setProfile] = useState(null);

  return (
    <>
      {!profile && <SagasaLoader />}
      <div className={!profile ? "invisible h-0 overflow-hidden" : ""}>
        <Suspense fallback={null}>
          <ProfileContent profile={profile} setProfile={setProfile} />
        </Suspense>
      </div>
    </>
  );
}
