import axiosInstance from "@/lib/axiosInstance";

export const createCourseService = async (data) => {
  try {
    const response = await axiosInstance.post("/course", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
