import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

/**
 * Custom App component that wraps every page with the AuthProvider. This
 * ensures that authentication state is available throughout the app.
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}