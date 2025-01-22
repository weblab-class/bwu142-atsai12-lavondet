/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Post = require("./models/post");
const Profile = require("./models/profile");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/name-major", (req, res) => {
  Profile.findOne({id: req.query.id}).then((profile) => {
    if (profile && profile.name) {
      res.send({name: profile.name, major: profile.major});
    } else {
      console.log('not found')
      res.send("name");
    }
  });
});



router.post("/change-name", (req, res) => {
  const newName = req.body.name;
  Profile.findOne({id: req.body.id}).then((profile) => {
    profile.name = newName;
    profile.save();
  }).then(res.send({name:newName}));
});

router.post("/change-major", (req, res) => {
  const newMajor = req.body.major;
  Profile.findOne({id: req.body.id}).then((profile) => {
    profile.major = newMajor;
    profile.save();
  }).then(res.send({major:newMajor}));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
