'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login by default
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-bgAlabaster flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-textMuted">جاري التحويل...</p>
      </div>
    </div>
  );
}
