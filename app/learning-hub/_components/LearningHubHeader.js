import React from 'react';
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';

function LearningHubHeader() {
    return (
        <div className='p-4 flex justify-between shadow-md'>
            <Image src="/logo.png" width={120} height={120} alt="logo"/>
            <UserButton />
        </div>
    );
}

export default LearningHubHeader;