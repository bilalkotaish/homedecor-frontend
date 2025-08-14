import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

export const postData = async (url, payload) => {
  try {
    const res = await fetch(apiurl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return { success: false, message: "Network error" };
  }
};
export const fetchData = async (url) => {
  try {
    const { data } = await axios.get(apiurl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};
export const uploadImage = async (url, updateData) => {
  try {
    const res = await axios.put(apiurl + url, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        // "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};

export const editData = async (url, updateData) => {
  try {
    const res = await axios.put(apiurl + url, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};

export const deleteData = async (url) => {
  try {
    const res = await axios.delete(apiurl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response?.data || error;
  }
};
