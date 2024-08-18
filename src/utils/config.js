// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.result.token : ""
//     }`,
//     Accept: "application/json",
//   },
// };


const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).result.token
  : "";

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage}`,
    Accept: "application/json",
  },
};
