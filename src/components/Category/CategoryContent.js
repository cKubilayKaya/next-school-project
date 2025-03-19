"use client";
import React, { useState } from "react";
import CategoryContentPagination from "./CategoryContentPagination";
import CategoryContentHeader from "./CategoryContentHeader";
import CategoryContentCourses from "./CategoryContentCourses";
import CategoryModal from "./CategoryModal";

export default function CategoryContent({ currentCategory, courses, page, setPage, getCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="pl-8 bl border-l border-l-[#282e3b] w-full flex flex-col gap-8 pt-6">
      <CategoryContentHeader name={currentCategory?.name} description={currentCategory?.description} />
      <div className="flex items-center justify-between">
        <h3 className="font-quando text-2xl">Lessons</h3>
        <button className="bg-[#3b3b3b] px-5 py-2 rounded-full cursor-pointer text-sm" onClick={openModal}>
          Create Lesson
        </button>
        <CategoryModal isModalOpen={isModalOpen} closeModal={closeModal} currentCategory={currentCategory} getCategories={getCategories} />
      </div>
      <>
        <CategoryContentCourses courses={courses} />
        <CategoryContentPagination courses={courses} page={page} setPage={setPage} currentCategory={currentCategory} />
      </>
    </div>
  );
}
