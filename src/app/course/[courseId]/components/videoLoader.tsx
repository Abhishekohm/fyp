import React from "react";

const VideoLoader = () => {
    return (
        <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1 mb-5">
                    <div className="h-64 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoLoader;
