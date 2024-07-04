import axios from "axios";

const getCourses = async (input: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/courses?courseName=${input}`;
  console.log("url in getCourses:", url);

  try {
    const response = await axios.get(url);
    console.log("response in getCourses:", response.data.message);
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
};

export default getCourses;
