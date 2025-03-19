import React from "react";
import { LeftArrowIcon, RightArrowIcon } from "../Icons/Icons";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CategoryContentPagination({ courses, page, setPage, currentCategory }) {
  const router = useRouter();

  return (
    courses?.length >= 1 && (
      <div className="flex items-center justify-center mt-8">
        <button
          className="flex items-center justify-center w-10 h-10 border border-gray-700 rounded-bl-[8px] rounded-tl-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-no-drop "
          disabled={page?.activePage === 1}
          onClick={() => {
            let goToPage = page?.activePage !== 1 ? page?.activePage - 1 : 1;
            setPage((prev) => ({ ...prev, activePage: goToPage }));
            router?.push(`/category/${currentCategory?.slug}?page=${goToPage}`);
          }}
        >
          <LeftArrowIcon color="#fff" size="28px" />
        </button>
        {Array.from({ length: page?.totalPage }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              setPage({ ...page, activePage: index + 1 });
              router?.push(`/category/${currentCategory?.slug}?page=${index + 1}`);
            }}
            className={cn({
              "flex items-center justify-center w-10 h-10 border border-gray-700 cursor-pointer": true,
              "bg-gray-600 border-gray-600": index + 1 === page?.activePage,
            })}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="flex items-center justify-center w-10 h-10 border border-gray-700 rounded-br-[8px] rounded-tr-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-no-drop "
          disabled={page?.totalCourses === page?.activePage + page?.totalPage}
          onClick={() => {
            let goToPage = page?.totalCourses !== page?.activePage + page?.totalPage ? page?.activePage + 1 : page?.totalPage;
            setPage((prev) => ({ ...prev, activePage: goToPage }));
            router?.push(`/category/${currentCategory?.slug}?page=${goToPage}`);
          }}
        >
          <RightArrowIcon color="#fff" size="28px" />
        </button>
      </div>
    )
  );
}
