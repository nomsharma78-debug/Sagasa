import Image from 'next/image';
import { Package, ArrowRight, Download } from 'lucide-react';
import { products } from '@/data/products';

export default function OrdersTab() {
  const orders = [
    { id: '#SGS-2024-0008', date: 'May 18, 2024', items: 3, total: 189.00, status: 'Delivered', images: [products[0].image1, products[1].image1, products[2].image1], trackable: false },
    { id: '#SGS-2024-0007', date: 'May 10, 2024', items: 2, total: 129.00, status: 'Shipped', images: [products[3].image1, products[4].image1], trackable: true },
    { id: '#SGS-2024-0006', date: 'Apr 28, 2024', items: 4, total: 259.00, status: 'Processing', images: [products[5].image1, products[6].image1], trackable: false },
    { id: '#SGS-2024-0004', date: 'Feb 14, 2024', items: 1, total: 89.00, status: 'Delivered', images: [products[7].image1], trackable: false },
    { id: '#SGS-2023-0102', date: 'Nov 24, 2023', items: 2, total: 145.00, status: 'Returned', images: [products[8].image1, products[9].image1], trackable: false }
  ];

  const renderStatusBadge = (status) => {
    const styles = {
      'Delivered': 'bg-green-50 text-green-700',
      'Shipped': 'bg-blue-50 text-blue-700',
      'Processing': 'bg-orange-50 text-orange-700',
      'Returned': 'bg-red-50 text-red-700'
    };
    return (
      <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-display)] font-medium text-[#222]">Order History</h2>
          <p className="text-sm text-[#666] mt-1">View and manage all your past orders and returns.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-4 py-2 bg-white border border-[#EAEAEA] rounded-lg text-sm text-[#222] outline-none w-full sm:w-auto">
            <option>Last 6 months</option>
            <option>2024</option>
            <option>2023</option>
            <option>All Orders</option>
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] p-12 text-center flex flex-col items-center">
          <Package size={48} className="text-[#CCC] mb-4" strokeWidth={1} />
          <h3 className="text-lg font-medium text-[#222] mb-2">No orders yet</h3>
          <p className="text-[#666] text-sm mb-6 max-w-md">Looks like you haven't made your first purchase with Sagasa. Discover our latest arrivals and find something you'll love.</p>
          <button className="bg-[#222] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#EAEAEA] flex flex-col overflow-hidden">
          {orders.map((order, i) => (
            <div key={order.id} className={`p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-[#FAF9F6] transition-colors ${i !== orders.length - 1 ? 'border-b border-[#EAEAEA]' : ''}`}>
              <div className="flex items-start gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-[#EAEAEA] shrink-0">
                  <Package size={20} className="text-[#666]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#222]">{order.id}</span>
                  <span className="text-xs text-[#888] mt-0.5">{order.date}</span>
                  <span className="text-xs text-[#888] mt-1">{order.items} items</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-1 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <div className="flex gap-2">
                  {order.images.map((img, idx) => (
                    <div key={idx} className="w-12 h-16 bg-gray-100 rounded-md border border-[#EAEAEA] overflow-hidden relative shrink-0">
                      <Image src={img} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-6 lg:gap-8 border-t lg:border-none border-[#EAEAEA] pt-4 lg:pt-0">
                <div className="flex flex-col lg:items-end">
                  <span className="text-sm font-semibold">₹{order.total.toFixed(2)}</span>
                  <div className="mt-1">{renderStatusBadge(order.status)}</div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button className="bg-white border border-[#EAEAEA] text-[#222] px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#F9F9F9] transition-colors whitespace-nowrap">
                    View Details
                  </button>
                  {order.trackable && <button className="text-xs text-[#666] underline hover:text-[#222] flex items-center gap-1">Track package <ArrowRight size={12}/></button>}
                  {order.status === 'Delivered' && <button className="text-xs text-[#666] hover:text-[#222] flex items-center gap-1"><Download size={12}/> Invoice</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
