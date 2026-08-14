import './AdminLayout.css';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <div className="admin-page-content hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}
