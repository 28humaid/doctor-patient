// app/admin/AdminAuthWrapper.jsx
'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function InnerContent({ children }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Verifying admin session..." />;
  }

  return <>{children}</>;
}

export default function AdminAuthWrapper({ children }) {
  return (
    <AuthProvider>
      <InnerContent>{children}</InnerContent>
    </AuthProvider>
  );
}