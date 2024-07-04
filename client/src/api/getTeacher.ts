import axios from "axios";

const getTeacher = async (input: string) => {
  console.log("开始搜索老师");
  console.log("input: ", input);
  const url =
    process.env.NEXT_PUBLIC_API_URL + `/teachers?teacherName=${input}`;
  console.log("url: ", url);
  const response = await axios.get(url);
  console.log("response.data: ", response.data.message);
  return response?.data?.message || [];
};

export default getTeacher;
