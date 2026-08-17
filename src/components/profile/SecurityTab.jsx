"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';

export default function SecurityTab() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleDeleteAccount = async () => {
    if (deleteInput !== 'DELETE') return;
    setIsDeleting(true);
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: deleteReason })
      });
      
      if (res.ok) {
        // Redirect to login page after successful deletion
        router.push('/login');
      } else {
        const data = await res.json();
        setToast({ message: data.error || 'Failed to delete account.', type: 'error' });
        setIsDeleting(false);
      }
    } catch (err) {
      setToast({ message: 'Network error while deleting account.', type: 'error' });
      setIsDeleting(false);
    }
  };
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Security</h2>
        <p className="text-sm text-[#666] mt-1">Manage your password and account security.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 lg:p-8 mb-8">
        <h3 className="text-sm font-bold text-[#222] tracking-wider uppercase mb-6">Change Password</h3>
        
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#222]">Current Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-[#F9F9F9] focus:outline-none focus:border-[#D0D0D0] focus:bg-white transition-colors" 
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#222]">New Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-[#F9F9F9] focus:outline-none focus:border-[#D0D0D0] focus:bg-white transition-colors" 
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#222]">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-[#F9F9F9] focus:outline-none focus:border-[#D0D0D0] focus:bg-white transition-colors" 
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-[#888] mb-4">Password must be at least 8 characters long and contain a mix of letters and numbers.</p>
            <button type="submit" className="bg-[#222] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#FAF9F6] rounded-2xl border border-red-100 p-6 lg:p-8">
        <h3 className="text-sm font-bold text-red-600 tracking-wider uppercase mb-2">Danger Zone</h3>
        <p className="text-sm text-[#666] mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl relative">
            <div className="p-6 border-b border-[#EAEAEA]">
              <h3 className="font-[family-name:var(--font-display)] font-medium text-xl text-red-600">Delete Account</h3>
              <p className="text-sm text-[#666] mt-2">
                This action is permanent and cannot be undone. All your data, orders, and preferences will be permanently erased.
              </p>
            </div>
            
            <div className="p-6 bg-[#FAFAFA] flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Reason for leaving (Optional)</label>
                <textarea 
                  rows={2}
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors resize-none"
                  placeholder="Help us improve by sharing your feedback..."
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-sm font-semibold text-[#222]">To confirm, type <span className="text-red-600 select-all tracking-wider font-bold">DELETE</span> below</label>
                <input 
                  type="text" 
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 rounded-lg border border-red-200 text-[#333] text-sm bg-white focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all font-mono tracking-widest placeholder:normal-case placeholder:tracking-normal placeholder:font-sans"
                  placeholder="Type DELETE"
                />
              </div>
            </div>
            
            <div className="p-6 bg-white flex gap-4 justify-end border-t border-[#EAEAEA]">
              <button 
                onClick={() => { setIsModalOpen(false); setDeleteInput(''); setDeleteReason(''); }}
                disabled={isDeleting}
                className="px-6 py-2.5 rounded-lg text-sm font-medium border border-[#EAEAEA] text-[#222] hover:bg-[#F9F9F9] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                disabled={deleteInput !== 'DELETE' || isDeleting}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
