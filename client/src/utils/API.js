import axios from "axios";

export default {
  // Get all listings
  getUserListing: function (params) {
    return axios.get("/api/search/post", params);
    // return axios.get("/api/post")
  },
  getUserReplies: function (params) {
    return axios.get("/api/search/reply", params);
    // return axios.get("/api/post")
  },
  getListing: function (id) {
    return axios.get("/api/post/" + id);
  },
  getUser: function (id) {
    return axios.get("/api/user/" + id);
  },
  addUser: function (userData) {
    return axios.post("/api/user", userData);
  },
  updateUser: function (userData) {
    return axios.put("/api/user/" + userData.userId, userData);
  },
  // Saves a NewListing to the database
  updateListing: function (id, editData) {
    let fixedLocation = editData.location;
    if (fixedLocation.lat) {
      fixedLocation = [fixedLocation.lng, fixedLocation.lat]
    }
    editData.location = { type: "Point", coordinates: fixedLocation };
    return axios.put("/api/put/" + id, editData);
  },
  // Saves a NewListing to the database
  addNewListing: function (newListData) {
    let fixedLocation = newListData.location;
    newListData.location = { type: "Point", coordinates: fixedLocation };
    return axios.post("/api/addPost", newListData);
  },
};
