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
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#F3F4F6] bg-white px-8 z-30 dark:border-[#1F2937] dark:bg-[#111827]">
      <div className="flex w-[320px] items-center rounded-xl border border-[#E5E7EB] px-[0.8rem] py-2 dark:border-[#374151]">
        <Search size={16} color="#9CA3AF" />
        <input 
          ref={searchInputRef}
          type="text" 
          placeholder="Search anything..." 
          className="ml-2 w-full border-none bg-transparent font-[inherit] text-[0.85rem] outline-none dark:text-[#F9FAFB]"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex cursor-pointer items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] dark:hover:text-[#F9FAFB]" onClick={toggleTheme} title="Toggle Theme">
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </div>
        
        <div className="relative flex cursor-pointer items-center justify-center text-[#6B7280] dark:text-[#9CA3AF] dark:hover:text-[#F9FAFB]" ref={notifRef} onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={20} />
          <span className="absolute -right-0.5 -top-0.5 flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-white bg-[#5D5FEF] text-[0.6rem] font-bold text-white">3</span>
          
          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[320px] cursor-default rounded-xl border border-[#E5E7EB] bg-white shadow-lg dark:border-[#1F2937] dark:bg-[#111827]">
              <div className="flex items-center justify-between border-b border-[#F3F4F6] p-4 dark:border-[#1F2937]">
                <h4 className="m-0 text-[0.85rem] text-[#111827] dark:text-[#F9FAFB]">Notifications</h4>
                <button className="cursor-pointer border-none bg-transparent p-0 text-[0.7rem] font-medium text-[#5D5FEF]">Mark all as read</button>
              </div>
              <div className="flex max-h-[300px] flex-col overflow-y-auto">
                <div className="flex cursor-pointer gap-3 border-b border-[#F9FAFB] p-4 transition-colors duration-200 hover:bg-[#F9FAFB] bg-[#F8F7FF] dark:border-[#1F2937] dark:bg-[rgba(93,95,239,0.1)] dark:hover:bg-[#1F2937]">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#5D5FEF]"></div>
                  <div>
                    <p className="m-0 mb-1 text-[0.8rem] leading-[1.4] text-[#374151] dark:text-[#F9FAFB]"><strong>New Order #SG2548</strong> placed by Rohit Sharma.</p>
                    <span className="text-[0.65rem] text-[#9CA3AF] dark:text-[#6B7280]">2 minutes ago</span>
                  </div>
                </div>
                <div className="flex cursor-pointer gap-3 border-b border-[#F9FAFB] p-4 transition-colors duration-200 hover:bg-[#F9FAFB] bg-[#F8F7FF] dark:border-[#1F2937] dark:bg-[rgba(93,95,239,0.1)] dark:hover:bg-[#1F2937]">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#5D5FEF]"></div>
                  <div>
                    <p className="m-0 mb-1 text-[0.8rem] leading-[1.4] text-[#374151] dark:text-[#F9FAFB]"><strong>Low Stock Alert:</strong> SAGASA Cargo Pants (Black/32)</p>
                    <span className="text-[0.65rem] text-[#9CA3AF] dark:text-[#6B7280]">1 hour ago</span>
                  </div>
                </div>
                <div className="flex cursor-pointer gap-3 border-b border-[#F9FAFB] p-4 transition-colors duration-200 hover:bg-[#F9FAFB] dark:border-[#1F2937] dark:hover:bg-[#1F2937]">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-transparent"></div>
                  <div>
                    <p className="m-0 mb-1 text-[0.8rem] leading-[1.4] text-[#374151] dark:text-[#F9FAFB]"><strong>System Update:</strong> Dashboard successfully rebuilt.</p>
                    <span className="text-[0.65rem] text-[#9CA3AF] dark:text-[#6B7280]">5 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#F3F4F6] px-4 py-3 text-center dark:border-[#1F2937]">
                <Link href="/admin/notifications" className="text-[0.75rem] font-medium text-[#5D5FEF] no-underline">View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex cursor-pointer items-center gap-3" ref={profileRef} onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src="https://ui-avatars.com/api/?name=Admin&background=111827&color=fff" alt="Admin" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[0.85rem] font-semibold leading-[1.2] text-[#111827] dark:text-[#F9FAFB]">Admin</span>
            <span className="text-[0.7rem] text-[#9CA3AF] dark:text-[#6B7280]">Super Admin</span>
          </div>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[240px] cursor-default rounded-xl border border-[#E5E7EB] bg-white shadow-lg dark:border-[#1F2937] dark:bg-[#111827]">
              <div className="flex flex-col items-start gap-3 border-b border-[#F3F4F6] px-4 py-5 dark:border-[#1F2937]">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=111827&color=fff" alt="Admin" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.85rem] font-semibold leading-[1.2] text-[#111827] dark:text-[#F9FAFB]">Admin User</span>
                  <span className="text-[0.7rem] text-[#9CA3AF] dark:text-[#6B7280]">admin@sagasa.com</span>
                </div>
              </div>
              <div className="flex flex-col">
                <Link href="/admin/settings/profile" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#4B5563] no-underline transition-all duration-200 hover:bg-[#F3F4F6] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] dark:hover:text-[#F9FAFB]">
                  <User size={16} /> My Profile
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#4B5563] no-underline transition-all duration-200 hover:bg-[#F3F4F6] hover:text-[#111827] dark:text-[#9CA3AF] dark:hover:bg-[#1F2937] dark:hover:text-[#F9FAFB]">
                  <Settings size={16} /> Account Settings
                </Link>
                <div className="my-1 h-px bg-[#F3F4F6] dark:bg-[#1F2937]"></div>
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-[0.8rem] text-[#EF4444] no-underline transition-all duration-200 hover:bg-[#FEF2F2] dark:hover:bg-[#1F2937]">
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
