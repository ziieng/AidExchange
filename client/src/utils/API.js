import axios from "axios";

export default {
  // Gets all listing
  getAllListing: function () {
    return axios.get("/api/");
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
  },

  addListing: function (listData) {
    return axios.post("/api/NewListing", listData);
  },
};
