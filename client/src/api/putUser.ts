import axios from "axios";

interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: string | Date;
  account: string;
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

const putUser = async (id: string, newUser: User) => {
  console.log("newUser:", newUser);
  console.log("id:", id);
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + `/users/${id}`;
    const response = await axios.put(url, newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("response3:", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default putUser;
