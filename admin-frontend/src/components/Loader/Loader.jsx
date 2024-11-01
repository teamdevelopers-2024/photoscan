import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="border-b-4 border-t-1 border-blue-500 rounded-full w-14 h-14 animate-spin"></div>
        </div>
    );
};

export default Loader;
