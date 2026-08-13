"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LogOut, Package, User, Settings } from 'lucide-react';
import Button from '@/components/Button';

const UserProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    // Basic auth check simulation
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const tabs = [
    { id: 'orders', label: 'Order History', icon: <Package size={18} /> },
    { id: 'profile', label: 'Profile Details', icon: <User size={18} /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings size={18} /> }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container container section"
    >
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>My Account</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, Alex.</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Mobile Tab Navigation */}
        <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: '500',
                color: activeTab === tab.id ? 'var(--color-foreground)' : 'var(--color-text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-foreground)' : '2px solid transparent',
                marginBottom: '-1rem'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ minHeight: '300px' }}
        >
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Orders</h2>
              <div style={{ background: 'var(--color-surface)', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>You haven't placed any orders yet.</p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Button to="/shop">Start Shopping</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Profile Details</h2>
              <div style={{ background: 'var(--color-surface)', borderRadius: '8px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-border)', overflow: 'hidden' }}>
                  <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=random" alt="Avatar" style={{ width: '100%', height: '100%' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Alex Doe</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>alex.doe@example.com</p>
                  <Button variant="outline">Change Avatar</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Account Settings</h2>
              <div style={{ background: 'var(--color-surface)', borderRadius: '8px', padding: '2rem' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>Settings form would go here (Change password, email preferences, address book).</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
