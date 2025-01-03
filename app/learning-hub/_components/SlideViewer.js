import React from 'react';

const SlideViewer = ({ slideUrl }) => {
    console.log('slideUrl', slideUrl);

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