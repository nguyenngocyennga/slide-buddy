// ------------------------ Learning Hub Header Component -------------------------------------
// This component renders the header for the Learning Hub page.
// It displays the application logo, the current slide name, and a user button for profile actions.

import React from 'react';
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { addNotes } from './NoteExtension';
import Link from 'next/link';

/**
 * LearningHubHeader Component
 * Renders the header section of the Learning Hub page.
 * - Includes the application logo with a link back to the dashboard.
 * - Displays the name of the current slide.
 * - Provides a user button for profile management using Clerk.
 */
function LearningHubHeader({ slideName }) {

    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Link href='/dashboard'>
                <Image src="/logo.png" width={120} height={120} alt="logo"/>
            </Link>
            <h2 className='font-bold'>
                {slideName}
            </h2>
            <div className='flex gap-2 items-center'>
            <UserButton />
            </div>
        </div>
    );
}

export default LearningHubHeader;