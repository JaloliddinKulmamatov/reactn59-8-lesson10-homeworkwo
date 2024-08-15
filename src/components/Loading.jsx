import React from "react";

function Loading() {
  return (
    <div className="w-full h-[700px] bg-black flex items-center justify-center">
      <div
        role="status"
        className="w-full max-w-md p-4 space-y-4 border border-gray-700 divide-y divide-gray-700 rounded-lg shadow-lg animate-pulse bg-gray-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 bg-white rounded-full w-24 mb-3"></div>
            <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-3 bg-white rounded-full w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-3 bg-white rounded-full w-24 mb-3"></div>
            <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-3 bg-white rounded-full w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-3 bg-white rounded-full w-24 mb-3"></div>
            <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-3 bg-white rounded-full w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-3 bg-white rounded-full w-24 mb-3"></div>
            <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-3 bg-white rounded-full w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-3 bg-white rounded-full w-24 mb-3"></div>
            <div className="w-32 h-2 bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-3 bg-white rounded-full w-12"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
