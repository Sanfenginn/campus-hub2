import axios from "axios";

interface Permission {
  _id: string;
  permission: string;
}

const postRole = async (finalPermissions: {
  roleId: string;
  permissions: Permission[];
}) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/permissions/update-roles";

  try {
    const response = await axios.post(url, finalPermissions);
    // console.log("response in", response.data.message);
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
};

export default postRole;
