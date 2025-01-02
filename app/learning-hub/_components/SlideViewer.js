import React from 'react';

const SlideViewer = ({ slideUrl }) => {
    console.log('slideUrl', slideUrl);

    return (
        <div>
            <iframe 
                src={slideUrl} 
                height="90vh" 
                width="100%"
                className='h-[90vh]'
                />
        </div>
    );
};

export default SlideViewer;