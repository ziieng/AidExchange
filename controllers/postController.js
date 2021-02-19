const db = require("../models");

// Defining methods for the booksController
module.exports = {
  //calls for populating the Dashboard
  findPostByUser: function (req, res) {
    db.Post.find({ userId: req.query.uid })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findReplyByUser: function (req, res) {
    db.Post.aggregate([
      { $unwind: "$replies" },
      { $match: { "replies.userId": req.query.uid } },
    ])
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  //search page
  findAllPost: function (req, res) {
    db.Post.find({})
      .populate("postBy")
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findPostById: function (req, res) {
    db.Post.find({ _id: req.params.id })
      .populate("postBy")
      .then((dbModel) => res.json(dbModel[0]))
      .catch((err) => res.status(422).json(err));
  },
  reservePost: function (req, res) {
    db.Post.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  createPost: function (req, res) {
    db.Post.create(req.body)
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
