// import axios from "axios";
// import { loginSuccess } from "../redux/authSlice";
// import { useDispatch } from "react-redux";

// export const useLogin = () => {
//   const dispatch = useDispatch();

//   const login = async (account: string, password: string) => {
//     console.log("开始登录");
//     try {
//       const url = process.env.NEXT_PUBLIC_API_URL;

//       const response = await axios.post(`${url}/login`, {
//         account,
//         password,
//       });
//       console.log("登录成功");
//       // console.log("response:", response);
//       localStorage.setItem("token", response.data.data.token);
//       localStorage.setItem("useeRole", response.data.data.userId);
//       dispatch(loginSuccess(response.data.data.user));
//       return response.data;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return login;
// };
