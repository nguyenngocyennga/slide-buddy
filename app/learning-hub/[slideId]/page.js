"use client";

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import LearningHubHeader from '../_components/LearningHubHeader';
import SlideViewer from '../_components/SlideViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoteEditor from '../_components/NoteEditor';

function LearningHub() {
    const { slideId } = useParams();
    const slideInfo = useQuery(api.slideStorage.getSlideRecord, { 
        slideId: slideId 
    });

    useEffect(() => {
        console.log(slideInfo);
    }, [slideInfo]);

    return (
        <div>
            <LearningHubHeader />
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    {/* Slide Viewer */}
                    <SlideViewer slideUrl={slideInfo?.slideUrl}/>
                </div>
                <div>
                    {/* Note Editor */}
                    <NoteEditor />
                </div>
            </div>
        </div>
    );
}

export default LearningHub;