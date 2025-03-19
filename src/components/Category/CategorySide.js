"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategoriesService } from "@/services/categoryService";
import { useParams } from "next/navigation";

export default function CategorySide({ categories, slug }) {
  return (
    <div className="w-[340px] pr-8 pt-6">
      <Input placeholder="Search lessons..." icon />
      <div className="mt-10 flex flex-col gap-3">
        {categories?.map((item) => (
          <Link
            key={item?.id}
            href={`/category/${item?.slug}`}
            className={cn({
              "h-12 p-2 rounded-xl flex items-center gap-2.5 text-gray-400 hover:text-white hover:bg-[#313030] transition duration-300": true,
              "bg-[#312f2f] text-white": item?.slug === slug,
            })}
          >
            <img src={item?.courseImg} className="w-[30px] h-[30px] rounded" alt="" />
            <p>{item?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
