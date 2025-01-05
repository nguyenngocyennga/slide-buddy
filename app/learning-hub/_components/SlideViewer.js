// ------------------------ Slide Viewer Component ----------------------------------------
// This component renders a slide viewer using an iframe.
// It displays the provided slide URL, allowing users to view slides directly within the application.

import React from 'react';

/**
 * SlideViewer Component
 * Displays a slide using an iframe for seamless viewing.
 * 
 * Props:
 * @param {string} slideUrl - The URL of the slide to be displayed.
 * 
 * @returns {JSX.Element} - A full-height iframe displaying the slide content.
 */
const SlideViewer = ({ slideUrl }) => {
    // console.log('slideUrl', slideUrl);

    return (
        <div>
            <iframe 
                src={slideUrl} 
                height="100vh" 
                width="100%"
                className='h-[100vh]'
                />
        </div>
    );
};

export default SlideViewer;