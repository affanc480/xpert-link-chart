// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/lib/auth-context';
// import { LoadingSpinner } from '@/components/auth';

// export function RequireAuth({ children }) {
//   const { ready, authed } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (ready && !authed) {
//       router.replace('/login');
//     }
//   }, [ready, authed, router]);

//   if (!ready || !authed) {
//     return (
//       <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black">
//         <LoadingSpinner size={28} className="border-blue-600/30 border-t-blue-600 dark:border-white/20 dark:border-t-white" />
//       </div>
//     );
//   }

//   return children;
// }


'use client';

export function RequireAuth({ children }) {
  return children;
}