import React from "react";

export default function CategoryLevel({ level }) {
  return (
    <div className="z-40 relative flex items-center gap-2 bottom-4 left-6">
      {level === "beginner" && (
        <>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-20"></div>
        </>
      )}
      {level === "intermediate" && (
        <>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-20"></div>
        </>
      )}
      {level === "advanced" && (
        <>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
        </>
      )}
      <p className="text-sm font-bold pl-2 text-yellow-400">{level?.charAt(0).toUpperCase() + level?.slice(1)}</p>
    </div>
  );
}
