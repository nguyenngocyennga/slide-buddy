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
        <div className="flex flex-col h-screen">
            <div className="flex-shrink-0">
                <LearningHubHeader slideName={slideInfo?.slideName} />
            </div>

            <div className="flex flex-grow overflow-hidden">
                <div className="flex-1 h-full overflow-hidden bg-gray-100">
                    <SlideViewer slideUrl={slideInfo?.slideUrl} />
                </div>

                <div className="flex-1 h-full overflow-hidden bg-white border-l">
                    <NoteEditor slideId={slideId} />
                </div>
            </div>
        </div>
    );
}

export default LearningHub;