import axios from "axios";

interface Course {
  name: string;
  description: string;
}

const putCourse = async (newCourse: Course[]) => {
  console.log("newCourse:", newCourse);
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/courses";
    const response = await axios.put(url, newCourse, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response3:", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default putCourse;
