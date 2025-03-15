"use client";
import CategoryContent from "@/components/Category/CategoryContent";
import CategorySide from "@/components/Category/CategorySide";
import { getCategoriesService, getCategoryByIdService } from "@/services/categoryService";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryDetail() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const [page, setPage] = useState({ activePage: Number(searchParams?.get("page")) || 1, totalPage: 1, totalCourses: 0 });

  useEffect(() => {
    const getCategoryById = async (id, query) => {
      const res = await getCategoryByIdService(id, query);
      setPage((prev) => ({
        ...prev,
        totalPage: Math.ceil(res?.data?.totalCourses / query.limit),
        totalCourses: res?.data?.totalCourses,
      }));

      return res;
    };

    const getCategories = async () => {
      const res = await getCategoriesService();
      if (res?.success) {
        setCategories(
          res?.data.map((item) => {
            return { ...item, courseImg: "https://framerusercontent.com/images/clqaKZERNdsrT3X8DVDz2nmBBs.jpg?scale-down-to=1024" };
          })
        );
        const findCategory = res?.data?.find((item) => item?.slug === slug);
        setCurrentCategory(findCategory);
        const params = { page: page?.activePage || 1, limit: 2 };
        const categoryDetailData = await getCategoryById(findCategory?.id, params);
        if (categoryDetailData?.success) {
          setCourses(categoryDetailData?.data?.courses);
        }
      }
    };
    getCategories();
  }, [slug, searchParams]);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <CategorySide categories={categories} slug={slug} />
        <CategoryContent courses={courses} currentCategory={currentCategory} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
