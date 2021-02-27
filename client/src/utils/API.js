import axios from "axios";

function fixLocation(coords) {
  //re-format location to fit DB schema
  let fixedLocation = coords;
  if (fixedLocation.lat) {
    //format the {lat:x,lng:x} point used by Google's API into the [lng, lat] used by GeoJSON
    fixedLocation = [fixedLocation.lng, fixedLocation.lat]
  }
  coords = { type: "Point", coordinates: fixedLocation };
  return coords
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
    userData.location = fixLocation(userData.location)
    return axios.put("/api/user/" + userData.userId, userData);
  },
  // Updates existing post
  updateListing: function (id, editData) {
    editData.location = fixLocation(editData.location)
    return axios.put("/api/post/" + id, editData);
  },
  // Saves a new post
  addNewListing: function (newListData) {
    newListData.location = fixLocation(newListData.location)
    return axios.post("/api/addPost", newListData);
  },
  // Updates existing reply
  updateReply: function (id, editData) {
    editData.location = fixLocation(editData.location)
    return axios.put("/api/reply/" + id, editData);
  },
  // Saves a new reply
  addNewReply: function (id, newListData) {
    newListData.location = fixLocation(newListData.location)
    return axios.post("/api/reply/" + id, newListData);
  },
  searchNear: function (coords) {
    coords = fixLocation(coords)
    return axios.post("/api/post", { location: coords });
    // return axios.get("/api/post")
  },
};
