import axios from "axios";

interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: string | Date;
  account: string;
  password: string;
  role: {
    userType: string;
  };

  contact: {
    phone: string;
    email: string;
  };
  address: {
    houseNumber: string;
    street: string;
    suburb: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

const postBulkUsers = async (formData: {}) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/upload";
    console.log("Uploading to:", url);
    console.log("formData:", formData);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("response from receiving:", response.data.data);
    return response.data.data;
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export default postBulkUsers;
