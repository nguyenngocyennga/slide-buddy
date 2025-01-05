// -------------------------- Provider Component --------------------------------
// This file defines a custom provider for the Convex backend.
// It initializes the Convex client with the URL from the environment variables
// and wraps the application (or its children) in the ConvexProvider context.

"use client";

import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";

/**
 * Provider Component
 * Initializes the Convex client and wraps the application in the ConvexProvider context.
 *
 * @param {Object} children - The child components to be wrapped in the ConvexProvider.
 * @returns {JSX.Element} - The application wrapped in the ConvexProvider.
 */
function Provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

    return (
    <ConvexProvider client={convex}>{children}</ConvexProvider>
    );
}

export default Provider;