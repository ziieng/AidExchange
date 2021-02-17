import axios from "axios"; 

export default {
  // Get all listings
  getListing: function (uid) {
    // return (uid ? axios.get("/api/post", { params: { uid: uid } }) : axios.get("/api/post"));
    return axios.get("/api/post")
  },
  // // Gets the book with the given id
  // getBook: function (id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function (id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // Saves a book to the database
  addUser: function (userData) {
    return axios.post("/api/user", userData);
  }
};
