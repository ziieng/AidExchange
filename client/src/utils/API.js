import axios from "axios";

export default {
  // Get all listings
  getUserListing: function (params) {
    return (axios.get("/api/search/post", params));
    // return axios.get("/api/post")
  },
  getUserReplies: function (params) {
    return (axios.get("/api/search/reply", params));
    // return axios.get("/api/post")
  },
  getListing: function (id) {
    return (axios.get("/api/post/" + id));
  },
  getUser: function (id) {
    return axios.get("/api/user/" + id);
  },
  addUser: function (userData) {
    return axios.post("/api/user", userData);
  },
  // Saves a NewListing to the database
  addNewListing: function (newListData) {
    return axios.post("/api/NewListing", newListData);
  }

};
