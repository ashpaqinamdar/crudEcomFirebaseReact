const API_DOMAIN = "https://mern-node-api.onrender.com";
const API_DOMAIN_LOCALHOST = "http://localhost:3001";

let apiPath = "";
if (
  window.location.host === "localhost:3000" ||
  window.location.host === "localhost:3001"
) {
  apiPath = API_DOMAIN_LOCALHOST;
} else {
  apiPath = API_DOMAIN;
}

export const getAllBooks = `${apiPath}/get-books`;
export const deleteBooks = (id) => `${apiPath}/delete-book/${id}`;
export const editBook = `${apiPath}/edit-book`;
export const addBook = `${apiPath}/add-book`;
