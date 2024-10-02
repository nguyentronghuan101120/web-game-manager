import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 bg-slate-400 bg-opacity-50 flex items-center justify-center z-10">
      <div className="rounded-full h-20 w-20 bg-blue-800 animate-ping"></div>
    </div>
  );
};

export default Loading;
