import Link from 'next/link';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block rounded-full bg-black hover:bg-black/90 text-white py-2 px-6"
            >
              Return Home
            </Link>
            <div className="pt-2">
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-black underline underline-offset-4"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}