"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Sun, Moon, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function AdminTopbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const searchInputRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle a class on the document body/html
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-search">
        <Search size={16} color="#9CA3AF" />
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search anything..." 
        />
      </div>

      <div className="topbar-actions">
        <div className="topbar-notification" onClick={toggleTheme} title="Toggle Theme">
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </div>
        
        <div className="topbar-notification" ref={notifRef} onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} />
          <span className="topbar-notification-badge">3</span>
          
          {showNotifications && (
            <div className="topbar-dropdown notifications-dropdown">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <button className="text-btn">Mark all as read</button>
              </div>
              <div className="dropdown-list">
                <div className="dropdown-item unread">
                  <div className="notif-dot"></div>
                  <div className="notif-content">
                    <p><strong>New Order #SG2548</strong> placed by Rohit Sharma.</p>
                    <span>2 minutes ago</span>
                  </div>
                </div>
                <div className="dropdown-item unread">
                  <div className="notif-dot"></div>
                  <div className="notif-content">
                    <p><strong>Low Stock Alert:</strong> SAGASA Cargo Pants (Black/32)</p>
                    <span>1 hour ago</span>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="notif-dot hidden"></div>
                  <div className="notif-content">
                    <p><strong>System Update:</strong> Dashboard successfully rebuilt.</p>
                    <span>5 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-footer">
                <Link href="/admin/notifications">View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className="topbar-profile" ref={profileRef} onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="profile-avatar">
            <img src="https://ui-avatars.com/api/?name=Admin&background=111827&color=fff" alt="Admin" />
          </div>
          <div className="profile-info">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Super Admin</span>
          </div>
          
          {showProfileMenu && (
            <div className="topbar-dropdown profile-dropdown">
              <div className="dropdown-header profile-dropdown-header">
                <div className="profile-avatar large">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=111827&color=fff" alt="Admin" />
                </div>
                <div className="profile-info">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-role">admin@sagasa.com</span>
                </div>
              </div>
              <div className="dropdown-list">
                <Link href="/admin/settings/profile" className="dropdown-menu-item">
                  <User size={16} /> My Profile
                </Link>
                <Link href="/admin/settings" className="dropdown-menu-item">
                  <Settings size={16} /> Account Settings
                </Link>
                <div className="dropdown-divider"></div>
                <Link href="/" className="dropdown-menu-item text-danger">
                  <LogOut size={16} /> Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
