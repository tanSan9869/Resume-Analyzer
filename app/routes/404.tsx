import { useLocation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

// Handle DevTools and well-known requests at the loader level
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Return empty response for DevTools and well-known requests
  if (url.pathname.startsWith("/.well-known/") || 
      url.pathname.includes("devtools") ||
      url.pathname.includes("chrome-extension")) {
    return new Response(null, { 
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  // For other requests, continue with normal 404 handling
  return null;
}

export default function NotFound() {
  const location = useLocation();
  
  // Don't render anything for DevTools requests
  if (location.pathname.startsWith("/.well-known/") || 
      location.pathname.includes("devtools") ||
      location.pathname.includes("chrome-extension")) {
    return null;
  }

  // For regular 404s, show a user-friendly page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}