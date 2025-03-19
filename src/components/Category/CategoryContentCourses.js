import React from "react";
import CategoryLevel from "./CategoryLevel";
import Link from "next/link";
import { format } from "date-fns";
import { BookMarkIcon } from "../Icons/Icons";
import { cn } from "@/lib/utils";

export default function CategoryContentCourses({ courses, cols = 2 }) {
  return courses?.length >= 1 ? (
    <div className={cn({ "grid gap-14": true, "grid-cols-2": cols === 2, "grid-cols-3": cols === 3 })}>
      {courses?.map(({ id, slug, name, level, startDate, createdBy }) => (
        <div key={id} className="flex flex-col gap-3.5 transition-transform duration-300 hover:-translate-y-1 border border-[#282e3b] rounded-2xl pb-3.5">
          <div className="relative rounded-2xl">
            <img
              src="https://framerusercontent.com/images/izki5OpIVTjX1zEIGeo2FK12nI.jpg?scale-down-to=4096"
              className="rounded-2xl h-76 object-cover w-full"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-banner rounded-2xl"></div>
            <CategoryLevel level={level} />
            <div className="z-40 absolute flex items-center gap-2 bottom-4 right-6">
              <p className="text-sm font-bold text-yellow-400">{format(new Date(startDate), "PP")}</p>
            </div>
          </div>
          <Link href={`/lessons/${slug}`} className="z-40 relative flex items-start justify-between mx-6">
            <h3 className="text-[18px] hover:underline hover:text-yellow-400 transition duration-300">{name}</h3>
            <BookMarkIcon size={24} />
          </Link>
          <Link
            href={`/u/${createdBy?.userName}`}
            className="z-40 relative flex items-start gap-2.5 transition duration-300 text-gray-400 hover:underline hover:text-yellow-400 mx-6"
          >
            <img
              src="https://framerusercontent.com/images/GTBUVh6Ry60z2j6McecmFOZZrb4.jpg?scale-down-to=512"
              className="w-[30px] h-[30px] object-cover rounded-full"
              alt=""
            />
            <span>{createdBy?.fullName}</span>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <p>There are no courses in this category.</p>
  );
}
