"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console as requested
    console.error("[Global Error Boundary] Caught an unexpected error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#FFF] px-6 py-20 text-center">
      {/* Icon Section */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm ring-8 ring-red-50/50">
        <AlertTriangle className="h-10 w-10" />
      </div>

      {/* Title & Message */}
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#323441] md:text-5xl">
        Something went wrong
      </h2>
      <p className="mx-auto mb-10 max-w-lg text-lg text-gray-500">
        We apologize for the inconvenience. An unexpected error has occurred while trying to process your request.
      </p>

      {/* Action Buttons */}
      <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <button
          onClick={() => reset()}
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#5a80b9] px-6 py-3.5 text-base font-medium text-white transition-all hover:bg-[#4a6d9e] focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2 sm:w-auto"
        >
          <RefreshCcw className="h-4 w-4 transition-transform group-hover:-rotate-90" />
          Try Again
        </button>

        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-base font-medium text-[#323441] shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5a80b9] focus:ring-offset-2 sm:w-auto"
        >
          <Home className="h-4 w-4 text-gray-500" />
          Back to Home
        </Link>
      </div>

      {/* Optional Debug info for digest if exist (Next.js specific) */}
      {error.digest && (
        <p className="mt-8 text-sm text-gray-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
