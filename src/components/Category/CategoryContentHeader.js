import React from "react";

export default function CategoryContentHeader({ name, description }) {
  return (
    <div className="h-[300px] w-full relative p-8">
      <img
        src="https://framerusercontent.com/images/clqaKZERNdsrT3X8DVDz2nmBBs.jpg?scale-down-to=1024"
        //db'den resim gelecek
        className="object-cover absolute top-0 left-0 w-full h-full rounded-2xl"
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-banner rounded-2xl"></div>
      <div className="z-40 relative flex flex-col gap-4 justify-end h-full">
        <h3 className="font-quando text-5xl">{name}</h3>
        <p className="w-1/2 text-gray-400 text-[18px]">{description}</p>
      </div>
    </div>
  );
}
