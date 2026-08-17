import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-[100] flex items-center gap-3 bg-white border border-[#EAEAEA] shadow-2xl rounded-xl px-5 py-4 min-w-[280px] transform transition-all duration-300">
      {type === 'success' ? (
        <CheckCircle2 size={20} className="text-green-600 shrink-0" />
      ) : (
        <AlertCircle size={20} className="text-red-600 shrink-0" />
      )}
      <span className="text-sm font-medium text-[#222] flex-1">{message}</span>
      <button onClick={onClose} className="text-[#888] hover:text-[#222] shrink-0 p-1">
        <X size={16} />
      </button>
    </div>
  );
}
