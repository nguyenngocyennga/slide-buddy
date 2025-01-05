// ------------------------ Learning Hub Component ----------------------------------------
// This component serves as the main page for the Learning Hub.
// It integrates the header, slide viewer, and note editor into a cohesive layout.
// The component fetches slide information dynamically based on the slide ID.

"use client";

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import LearningHubHeader from '../_components/LearningHubHeader';
import SlideViewer from '../_components/SlideViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NoteEditor from '../_components/NoteEditor';

/**
 * LearningHub Component
 * A page layout for the Learning Hub, which combines:
 * - A header displaying the slide name.
 * - A slide viewer to display lecture slides.
 * - A note editor for rich-text note-taking.
 * 
 * Props:
 * - Fetches `slideId` from the URL to dynamically load slide information.
 * 
 * @returns {JSX.Element} - A fully integrated Learning Hub layout.
 */
function LearningHub() {
    // Extract the slide ID from the URL
    const { slideId } = useParams();

    // Query to fetch slide information (name, URL) based on the slide ID
    const slideInfo = useQuery(api.slideStorage.getSlideRecord, { 
        slideId: slideId 
    });

    // Debugging log for slide information (remove in production)
    // useEffect(() => {
    //     console.log(slideInfo);
    // }, [slideInfo]);

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