"use client";
import { User, Camera, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/lib/cropImage';
import Toast from '@/components/Toast';
import manAvatar from '@/assets/man.png';
import womanAvatar from '@/assets/woman.png';

export default function ProfileDetailsTab({ profile, setProfile }) {
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [gender, setGender] = useState(profile?.gender || 'Prefer not to say');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setGender(profile.gender || 'Prefer not to say');
    }
  }, [profile]);

  const getDefaultAvatar = (gender) => {
    if (gender === 'Female') return womanAvatar.src;
    if (gender === 'Male') return manAvatar.src;
    return manAvatar.src;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (isNameEmpty || !isFormChanged) return;
    
    // Validate email if provided
    const emailVal = email.trim().toLowerCase();
    if (emailVal && (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailVal))) {
      setToast({ message: 'Only Gmail addresses are accepted (e.g., name@gmail.com)', type: 'error' });
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: emailVal || email, gender })
      });
      if (res.ok) {
        setProfile(prev => ({ ...prev, name, email: emailVal || email, gender }));
        setToast({ message: 'Profile updated successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to update profile', type: 'error' });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAvatar = async () => {
    setIsUploading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: null })
      });
      if (res.ok) {
        setProfile(prev => ({ ...prev, avatarUrl: null }));
        setToast({ message: 'Avatar removed successfully', type: 'success' });
      } else {
        setToast({ message: 'Failed to remove avatar', type: 'error' });
      }
    } catch (e) {
      setToast({ message: 'Error removing avatar', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setToast({ message: 'File size exceeds 2MB limit', type: 'error' });
        return;
      }
      
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
        setIsCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const uploadCroppedImage = async () => {
    try {
      setIsUploading(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append('file', croppedImageBlob, 'avatar.jpg');
      
      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const { avatarUrl } = await res.json();
        await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarUrl })
        });
        setProfile(prev => ({ ...prev, avatarUrl }));
        setIsCropModalOpen(false);
      } else {
        const err = await res.json();
        setToast({ message: err.error || 'Failed to upload image', type: 'error' });
      }
    } catch (e) {
      setToast({ message: 'Error cropping/uploading image', type: 'error' });
    } finally {
      setIsUploading(false);
      setImageSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!profile) {
    return <div className="p-8 text-[#888]">Loading profile details...</div>;
  }

  const isFormChanged = name.trim() !== (profile.name?.trim() || '') || email.trim() !== (profile.email?.trim() || '') || gender !== (profile.gender || 'Prefer not to say');
  const isNameEmpty = !name.trim();

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Profile Details</h2>
        <p className="text-[#888] text-[0.95rem]">Manage your personal information and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-[#EAEAEA] p-6 lg:p-8">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 mb-8 border-b border-[#EAEAEA]">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-24 h-24 rounded-full bg-[#F4F4F4] border border-[#EAEAEA] overflow-hidden">
              <img 
                src={profile.avatarUrl || getDefaultAvatar(profile?.gender)} 
                alt="Avatar" 
                className={`w-full h-full ${profile.avatarUrl ? 'object-cover' : 'object-contain p-2'}`}
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} className="text-white" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg font-medium text-[#222]">Profile Photo</h3>
            <p className="text-xs text-[#888] mt-1 mb-3">Upload a new avatar. Max 2MB (JPG, PNG, WEBP).</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <input 
                type="file" 
                accept="image/jpeg, image/png, image/webp" 
                ref={fileInputRef} 
                onChange={handleFileChange}
                className="hidden" 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-white border border-[#EAEAEA] text-[#222] px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#F9F9F9] transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Change Photo'}
              </button>
              {profile.avatarUrl && (
                <button 
                  type="button"
                  onClick={handleDeleteAvatar}
                  disabled={isUploading}
                  className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#222]">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => {
                let val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                val = val.replace(/\b\w/g, c => c.toUpperCase());
                setName(val);
              }}
              className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors" 
              placeholder="Enter your full name"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#222]">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[a-zA-Z0-9._%+\-]+@gmail\.com$"
              title="Please enter a valid Gmail address (e.g., name@gmail.com)"
              className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors" 
              placeholder="Enter your email address"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#222]">Gender</label>
            <select 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#333] text-sm bg-white focus:outline-none focus:border-[#D0D0D0] transition-colors appearance-none"
            >
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#222]">Phone Number</label>
            <input 
              type="tel" 
              value={profile.phone} 
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-[#EAEAEA] text-[#888] text-sm bg-[#F9F9F9] focus:outline-none cursor-not-allowed" 
              title="Phone number cannot be changed"
            />
            <p className="text-xs text-[#888]">Phone number is used for login and cannot be modified.</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 flex justify-end">
          <button 
            type="submit"
            disabled={isSaving || !isFormChanged || isNameEmpty}
            className={`px-8 py-3.5 rounded-lg font-medium text-[0.95rem] transition-all flex items-center justify-center min-w-[160px] ${
              isFormChanged && !isNameEmpty
                ? 'bg-[#222] text-white hover:bg-[#333] shadow-md shadow-black/5 hover:-translate-y-0.5' 
                : 'bg-[#F4F4F4] text-[#A0A0A0] cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>

      {/* Crop Modal */}
      {isCropModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-[#EAEAEA] flex justify-between items-center bg-white relative z-10">
              <h3 className="font-[family-name:var(--font-display)] font-medium text-lg">Crop Profile Photo</h3>
              <button onClick={() => { setIsCropModalOpen(false); setImageSrc(null); if(fileInputRef.current) fileInputRef.current.value=''; }} className="text-[#888] hover:text-[#222] transition-colors">
                ✕
              </button>
            </div>
            
            <div className="relative w-full h-[350px] sm:h-[400px] bg-[#FAFAFA]">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{
                    containerStyle: { background: '#FAFAFA' }
                  }}
                />
              )}
            </div>
            
            <div className="p-6 bg-white relative z-10 border-t border-[#EAEAEA]">
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-center text-sm font-medium text-[#666]">
                  <span>Zoom</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  value={zoom} 
                  min={1} 
                  max={3} 
                  step={0.1} 
                  onChange={(e) => setZoom(Number(e.target.value))} 
                  className="w-full h-1 bg-[#EAEAEA] rounded-lg appearance-none cursor-pointer accent-[#222]"
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => { setIsCropModalOpen(false); setImageSrc(null); if(fileInputRef.current) fileInputRef.current.value=''; }}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium border border-[#EAEAEA] hover:bg-[#F9F9F9] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={uploadCroppedImage}
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#222] text-white hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Saving...' : 'Confirm Crop'}
                </button>
              </div>
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
