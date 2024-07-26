import axios from "axios";

let NEXT_PUBLIC_BASE_URL = "http://localhost:9000";
const intercepter = axios.create({
  baseURL: `${NEXT_PUBLIC_BASE_URL}`, // Update with your backend URL
  withCredentials: true,
});

//request interceptor
// intercepter.interceptors.request.use(async (req) => {
//   const accesstoken = req.headers["Authorization"];
//   if (accesstoken) {
//     return req;
//   }
//   return req;
// });

// response interceptor
intercepter.interceptors.response.use(async (res) => {
  console.log(res);
  if (!res.data.status && res.data.data === "token has expired") {
    const originalreq = res.config;
    // console.log(originalreq, "response interceptor");
    const response = await axios.get("http://localhost:9000/token", {
      withCredentials: true,
    });
    console.log(response);
    const result = response.data;
    localStorage.removeItem("token");
    localStorage.setItem("token", result.data);
    originalreq.headers["Authorization"] = `Bearer ${result.data}`;
    if (result.status) {
      return intercepter(originalreq);
    }
  } else if (!res.data.status && res.data.data === "Unauthorised access...") {
    localStorage.removeItem("token");
    alert("Unauthorised access...");
  } else {
    return res;
  }
});

export default intercepter;
