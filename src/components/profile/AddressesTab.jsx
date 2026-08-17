import { useState, useEffect } from 'react';
import { MapPin, Edit2, MoreVertical } from 'lucide-react';
import Toast from '@/components/Toast';

export default function AddressesTab({ profile, setProfile }) {
  const [address, setAddress] = useState(profile?.address || null);
  const [mainPhone, setMainPhone] = useState(profile?.phone || '');
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({ 
    name: profile?.name || '', phone: profile?.phone || '', street: '', city: '', state: '', pincode: '', zone: '', gender: profile?.gender || '', type: 'Home', customType: '' 
  });
  const [isFetchingZone, setIsFetchingZone] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (profile) {
      if (profile.phone) setMainPhone(profile.phone);
      if (profile.address) setAddress(profile.address);
    }
  }, [profile]);

  const handlePincodeChange = async (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCurrentAddress(prev => ({ ...prev, pincode: val }));
    
    if (val.length === 6) {
      setIsFetchingZone(true);
      try {
        const res = await fetch(`/api/pincode?pincode=${val}`);
        if (res.ok) {
          const data = await res.json();
          setCurrentAddress(prev => ({
            ...prev,
            city: prev.city || data.city || '',
            state: prev.state || data.state || '',
            zone: data.zone
          }));
        } else {
          setCurrentAddress(prev => ({ ...prev, zone: 'Invalid PIN Code' }));
        }
      } catch (err) {
        console.error("Failed to fetch pincode details:", err);
        setCurrentAddress(prev => ({ ...prev, zone: 'Error fetching' }));
      } finally {
        setIsFetchingZone(false);
      }
    } else if (val.length === 0) {
      setCurrentAddress(prev => ({ ...prev, zone: '' }));
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: currentAddress })
      });
      
      if (res.ok) {
        const data = await res.json();
        setAddress(data.user.address);
        if (setProfile) {
          setProfile(prev => ({ ...prev, address: data.user.address }));
        }
        setIsEditing(false);
        setToast({ message: 'Address saved successfully', type: 'success' });
      } else {
        const err = await res.json();
        setToast({ message: err.error || 'Failed to save address', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'Network error while saving address', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setCurrentAddress(address || { name: '', phone: mainPhone, street: '', city: '', state: '', pincode: '', zone: '', gender: '', type: 'Home', customType: '' });
    if (address && !address.phone) {
      setCurrentAddress(prev => ({ ...prev, phone: mainPhone }));
    }
    setIsEditing(true);
    setShowMenu(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Saved Addresses</h2>
          <p className="text-sm text-[#666] mt-1">Manage your shipping and billing addresses.</p>
        </div>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 lg:p-8">
          <h3 className="text-lg font-medium text-[#222] mb-6">{address ? 'Edit Address' : 'Add New Address'}</h3>
          <form onSubmit={handleSaveAddress} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Full Name</label>
                <input 
                  type="text" 
                  value={currentAddress.name || ''} 
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    val = val.replace(/\b\w/g, c => c.toUpperCase());
                    setCurrentAddress({...currentAddress, name: val});
                  }} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  placeholder="Himanshu Jindal"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Mobile Number</label>
                <input 
                  type="tel" 
                  value={currentAddress.phone || ''} 
                  onChange={(e) => setCurrentAddress({...currentAddress, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Street Address / House No.</label>
                <input 
                  type="text" 
                  value={currentAddress.street} 
                  onChange={(e) => setCurrentAddress({...currentAddress, street: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  placeholder="Wz-283/41 maddi wali gali..."
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Gender</label>
                <select 
                  value={currentAddress.gender || ''} 
                  onChange={(e) => setCurrentAddress({...currentAddress, gender: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors cursor-pointer appearance-none"
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">PIN Code</label>
                <input 
                  type="text" 
                  value={currentAddress.pincode} 
                  onChange={handlePincodeChange} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  placeholder="110001"
                  maxLength="6"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222] flex justify-between">
                  Area / Zone
                  {isFetchingZone && <span className="text-xs text-[#888] font-normal">Loading...</span>}
                </label>
                <input 
                  type="text" 
                  value={currentAddress.zone} 
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#666] text-sm bg-[#F9F9F9] cursor-not-allowed"
                  placeholder="Auto-filled via pincode"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">City</label>
                <input 
                  type="text" 
                  value={currentAddress.city} 
                  onChange={(e) => setCurrentAddress({...currentAddress, city: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">State</label>
                <input 
                  type="text" 
                  value={currentAddress.state} 
                  onChange={(e) => setCurrentAddress({...currentAddress, state: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#EAEAEA]">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#222]">Address Type</label>
                <select 
                  value={currentAddress.type || 'Home'} 
                  onChange={(e) => setCurrentAddress({...currentAddress, type: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors cursor-pointer appearance-none"
                  required
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {currentAddress.type === 'Other' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#222]">Save address as (Optional)</label>
                  <input 
                    type="text" 
                    value={currentAddress.customType || ''} 
                    onChange={(e) => setCurrentAddress({...currentAddress, customType: e.target.value})} 
                    className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors"
                    placeholder="e.g. Dad's House"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-2 pt-4">
              <button type="submit" disabled={isSaving} className="bg-[#222] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? 'Saving...' : 'Save Address'}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-white border border-[#EAEAEA] text-[#222] px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#F9F9F9] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {address && address.street ? (
            <div className="bg-white rounded-sm border border-[#EAEAEA] p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#F0F0F0] text-[#666] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {address.type === 'Other' && address.customType ? address.customType : (address.type || 'HOME')}
                </div>
                
                <div className="relative">
                  <button onClick={() => setShowMenu(!showMenu)} className="text-[#888] hover:text-[#222] p-1">
                    <MoreVertical size={20} />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 top-8 w-32 bg-white rounded-lg shadow-lg border border-[#EAEAEA] overflow-hidden z-10">
                      <button onClick={handleEdit} className="w-full text-left px-4 py-2 text-sm text-[#222] hover:bg-[#FAF9F6] transition-colors">
                        Edit
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-2">
                <span className="text-base font-semibold text-[#222]">{address.name || 'Himanshu Jindal'}</span>
                <span className="text-base font-semibold text-[#222]">{address.phone || mainPhone}</span>
              </div>
              
              <div className="text-[15px] text-[#444] leading-relaxed max-w-2xl">
                {address.street}, {address.zone ? `${address.zone}, ` : ''}{address.city}, {address.state} - <span className="font-semibold">{address.pincode}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#EAEAEA] p-8 text-center text-[#888]">
              <MapPin size={32} className="mx-auto mb-4 opacity-50" />
              <p className="mb-4">You haven't set up your primary address yet.</p>
              <button 
                onClick={handleEdit}
                className="bg-[#222] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors mx-auto"
              >
                Add Address
              </button>
            </div>
          )}
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
