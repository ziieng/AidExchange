import axios from "axios";

function fixLocation(data) {
  let fixedLocation = data.location;
  if (fixedLocation.lat) {
    fixedLocation = [fixedLocation.lng, fixedLocation.lat]
  }
  data.location = { type: "Point", coordinates: fixedLocation };
  return data
}

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
    fixLocation(userData)
    return axios.put("/api/user/" + userData.userId, userData);
  },
  // Saves a NewListing to the database
  updateListing: function (id, editData) {
    fixLocation(editData)
    return axios.put("/api/post/" + id, editData);
  },
  // Saves a NewListing to the database
  addNewListing: function (newListData) {
    fixLocation(newListData)
    return axios.post("/api/addPost", newListData);
  },
};
