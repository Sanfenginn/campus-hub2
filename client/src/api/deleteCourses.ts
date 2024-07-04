import axios from "axios";

const bulkDeleteCourses = async (ids: string[]) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;

    if (!url) {
      throw new Error("REACT_APP_API_URL is not defined");
    }

    const response = await axios.delete(`${url}/courses`, {
      data: { ids },
    });
    console.log("response:", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default bulkDeleteCourses;
