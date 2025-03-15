"use client";
import React from "react";
import CategoryContentPagination from "./CategoryContentPagination";
import CategoryContentHeader from "./CategoryContentHeader";
import CategoryContentCourses from "./CategoryContentCourses";

export default function CategoryContent({ currentCategory, courses, page, setPage }) {
  return (
    <div className="pl-8 bl border-l border-l-[#282e3b] w-full flex flex-col gap-8 pt-6">
      <CategoryContentHeader name={currentCategory?.name} description={currentCategory?.description} />
      <h3 className="font-quando text-2xl">Lessons</h3>
      {courses?.length >= 1 ? (
        <>
          <CategoryContentCourses courses={courses} />
          <CategoryContentPagination page={page} setPage={setPage} currentCategory={currentCategory} />
        </>
      ) : (
        <p>There are no courses in this category.</p>
      )}
    </div>
  );
}
