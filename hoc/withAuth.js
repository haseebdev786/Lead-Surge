import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Higher-order component to enforce authentication on pages. When applied
 * to a page component it checks if the user is authenticated and, if
 * necessary, redirects to the login page. It also supports optional
 * role‑based access control for admin pages.
 *
 * Usage:
 *   export default withAuth(MyPage); // for any authenticated user
 *   export default withAuth(MyAdminPage, { adminOnly: true });
 */
export default function withAuth(Component, { adminOnly = false } = {}) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          // User not logged in; redirect to login
          router.replace('/login');
        } else if (adminOnly && user.role !== 'admin') {
          // Logged in but not an admin; redirect to dashboard
          router.replace('/dashboard');
        }
      }
    }, [loading, user, adminOnly, router]);

    // Show nothing while verifying auth state or redirecting
    if (loading || !user || (adminOnly && user.role !== 'admin')) {
      return <div className="p-6">Loading...</div>;
    }
    return <Component {...props} />;
  };
}
