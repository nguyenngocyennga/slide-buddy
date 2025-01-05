// ------------------------ Global Error Component ----------------------------------------
// This component handles uncaught errors in the application globally.
// It captures errors using Sentry for error tracking and displays a fallback error page.

"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

/**
 * GlobalError Component
 * Catches and reports application-level errors using Sentry.
 * Displays a generic error message to the user via the Next.js default error component.
 * 
 * Props:
 * @param {object} error - The error object thrown in the application.
 * 
 * @returns {JSX.Element} - A generic error page.
 */
export default function GlobalError({ error }) {
  // Capture the error using Sentry whenever the component is mounted or the error changes
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
