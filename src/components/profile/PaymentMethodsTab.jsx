import { CreditCard, Plus, Trash2 } from 'lucide-react';

export default function PaymentMethodsTab() {
  const cards = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', name: 'Alex Martin', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8821', expiry: '08/25', name: 'Alex Martin', isDefault: false }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Payment Methods</h2>
          <p className="text-sm text-[#666] mt-1">Securely manage your saved payment methods.</p>
        </div>
        <button className="bg-[#222] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors flex items-center gap-2">
          <Plus size={16} /> Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl border border-[#EAEAEA] p-6 relative flex flex-col h-full">
            {card.isDefault && <span className="absolute top-4 right-4 bg-gray-100 text-[#222] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Default</span>}
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-8 bg-[#F9F9F9] border border-[#EAEAEA] rounded flex items-center justify-center">
                <CreditCard size={20} className="text-[#666]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#222]">{card.type} ending in {card.last4}</span>
                <span className="text-xs text-[#888]">Expires {card.expiry}</span>
              </div>
            </div>

            <div className="text-sm text-[#666] mb-6">
              Name on card: <span className="text-[#222] font-medium">{card.name}</span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#EAEAEA] mt-auto">
              <button className="text-sm font-medium text-red-600 flex items-center gap-1.5 hover:text-red-700 transition-colors">
                <Trash2 size={14} /> Remove
              </button>
              {!card.isDefault && (
                <>
                  <span className="text-[#EAEAEA]">|</span>
                  <button className="text-sm font-medium text-[#666] hover:text-[#222] transition-colors ml-auto">
                    Set as Default
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
