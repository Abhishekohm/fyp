import React from "react";

const CurriculumLoader = () => {
  return (
    <div className="p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1 mb-5">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="">
            <div className="grid grid-cols-6 gap-4">
              <div className="invisible h-2 bg-slate-100 rounded col-span-1"></div>
              <div className="h-2 bg-slate-100 rounded col-span-5"></div>
            </div>
            {/* <div className="h-2 bg-slate-700 rounded"></div> */}
          </div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="">
            <div className="grid grid-cols-6 gap-4">
              <div className="invisible h-2 bg-slate-100 rounded col-span-1"></div>
              <div className="h-2 bg-slate-100 rounded col-span-5"></div>
            </div>
            {/* <div className="h-2 bg-slate-700 rounded"></div> */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CurriculumLoader;
