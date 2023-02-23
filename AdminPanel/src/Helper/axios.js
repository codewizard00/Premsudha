// import axios from "axios";
// import navigation from 'react-router-dom';


// export default ()=> {
//     const headers = {};
//     const baseURL = process.env.REACT_APP_PROD_URL;
//     if (localStorage.getItem("adminInfo")) {
//         headers.authorization = `Bearer ${localStorage.getItem("adminInfo")}`;
//     }

//     const axiosInstance = axios.create({
//         baseURL,
//         headers
//     })

//     axiosInstance.interceptors.use(
//         (response) => {
//             new Promise((resolve, reject) => {
//                 resolve(response)
//             }),
//                 (error) => {
//                     if (!error.response) {
//                         new Promise((resolve, reject) => {
//                             reject(error)
//                         })
//                     }
//                     if (error.response.status === 403) {
//                         localStorage.removeItem("adminInfo");
//                         navigation("/login")
//                     } else {
//                         new Promise((resolve, reject) => {
//                             reject(error)
//                         })
//                     }
//                 }
//         })
//     return axiosInstance;
// }