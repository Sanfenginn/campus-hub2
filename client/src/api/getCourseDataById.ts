import axios from "axios";
const getCourseDataById = async (id: string) => {
  try {
    console.log("id:", id);
    console.log("id:", typeof id);
    const isValidObjectId = (id: string) => {
      return /^[0-9a-fA-F]{24}$/.test(id);
    };

    if (!isValidObjectId(id)) {
      console.log("Invalid id");
      return;
    }

    const url = process.env.NEXT_PUBLIC_API_URL + "/courses";
    const response = await axios.get(`${url}/${id}`);
    console.log("response in getCourseDataById:", response);
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
};

export default getCourseDataById;
