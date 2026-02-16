import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper"
import AdminNavbar from "@/components/nav/AdminNavbar";
// import {useAuth,AuthProvider} from "@/contexts/AuthContext";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminAuthWrapper>
        <AdminNavbar />
        <main>
          {children}
        </main>
      </AdminAuthWrapper>
    </>
  );
}