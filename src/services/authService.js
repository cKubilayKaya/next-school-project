import axiosInstance from "@/lib/axiosInstance";

export const loginService = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfileService = async (id, data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axiosInstance.put(`/auth/${id}`, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileService = async (id) => {
  try {
    const response = await axiosInstance.get(`/auth/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
