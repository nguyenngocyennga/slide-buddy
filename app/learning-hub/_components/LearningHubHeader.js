import React from 'react';
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { addNotes } from './NoteExtension';
import Link from 'next/link';

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