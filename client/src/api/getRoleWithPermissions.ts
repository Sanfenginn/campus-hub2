import axios from "axios";

const getRoleWithPermissions = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/permissions";
    const response = await axios.get(url);
    // console.log("response", response.data.message);
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
};

export default getRoleWithPermissions;
