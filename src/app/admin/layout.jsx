import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAFBFC] font-[var(--font-body)] dark:bg-[#0B0F19]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar />
        <div className="flex-1 overflow-y-auto px-[25px] py-8 hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
