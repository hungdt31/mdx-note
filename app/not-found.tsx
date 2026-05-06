import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-xl">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold text-cyan-700 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-1">Page Not Found</h2>
        <p className="text-gray-500 mb-4">The page you are looking for does not exist or has been moved.</p>
      </div>
      <Link href="/" className="inline-block px-6 py-2 rounded-md bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}