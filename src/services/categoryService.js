import axiosInstance from "@/lib/axiosInstance";

export const getCategoriesService = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryByIdService = async (id, params) => {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await axiosInstance.get(`/category/${id}?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name) => {
  try {
    const response = await axiosInstance.post("/categories", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
