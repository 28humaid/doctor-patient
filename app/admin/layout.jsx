import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper"
import Navbar from "@/components/nav/Navbar";
// import {useAuth,AuthProvider} from "@/contexts/AuthContext";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
export default function AdminLayout({ children }) {
  return (
    <>
      <AdminAuthWrapper>
        <Navbar />
        <main>
          {children}
        </main>
      </AdminAuthWrapper>
    </>
  );
}