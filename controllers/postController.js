const db = require("../models");
// const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  findAllPost: function (req, res) {
    db.Post.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findPostById: function (req, res) {
    db.Post.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  reservePost: function (req, res) {
    db.Post.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  createPost: function (req, res) {
    console.log("AddNewListing", req.body)
    db.Post.create({
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      account: req.body.acctType,
      postType: req.body.postType,
      location: req.body.location,
    })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  updatePost: function (req, res) {
    db.Post.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  removePost: function (req, res) {
    db.Post.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  //GENERATE PDF FOR RESERVED ITEMS
};
