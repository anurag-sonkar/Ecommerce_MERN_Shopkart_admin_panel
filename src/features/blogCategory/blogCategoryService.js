import axios from "axios";
import { blog_category_base_url } from "../../utils/base_url";
import { getConfig } from "../../utils/config";
// import { config } from "../../utils/config";

const getAllBlogsCategory = async () => {
  const response = await axios.get(`${blog_category_base_url}/`);
  return response.data;
};

const createBlogsCategory = async (blogCategory) => {
    const response = await axios.post(`${blog_category_base_url}/`, { title: blogCategory }, getConfig());
    console.log(response)
    return response.data;
};

const deleteBlogsCategory = async (id) => {
    const response = await axios.delete(`${blog_category_base_url}/${id}`, getConfig());
    return response.data;
};

const updateBlogsCategory = async (updateBlogCategory, id) => {
    const response = await axios.put(
      `${blog_category_base_url}/${id}`,
      { title: updateBlogCategory },
      getConfig()
    );
    // console.log(response)
    return response.data;
};

const blogCategoryService = {
  getAllBlogsCategory,
  createBlogsCategory,
  deleteBlogsCategory,
  updateBlogsCategory,
};

export default blogCategoryService;
