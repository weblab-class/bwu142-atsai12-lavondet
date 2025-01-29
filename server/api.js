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

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

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

router.get("/profile", (req, res) => {
  Profile.findOne({ id: req.query.id }).then((profile) => {
    if (profile && profile.name) {
      res.send({ name: profile.name, major: profile.major, kerb: profile.kerb, pfp: profile.pfp });
    } else {
      res.send({ name: "name", major: "major" });
    }
  });
});

router.get("/find-post", (req, res) => {
  Post.findOne({ id: req.query.id }).then((post) => {
    if (post) {
      res.send({ exist: true });
    } else {
      res.send({ exist: false });
    }
  });
});

router.get("/posts", (req, res) => {
  Post.find({}).then((postData) => {
    res.send({ posts: postData });
  });
});

router.post("/post", (req, res) => {
  console.log("post endpoint");
  const post = {
    id: req.body.id,
    lat: req.body.lat,
    lng: req.body.lng,
    name: req.body.name,
    major: req.body.major,
    kerb: req.body.kerb,
    info: req.body.info,
    pfp: req.body.pfp
  };
  const postDb = new Post(post);
  postDb.save();
  socketManager.getIo().emit("new post", post);
  res.send(post);
});

router.post("/remove-post", (req, res) => {
  Post.deleteOne({ id: req.body.id }).then((marker) => {
    socketManager.getIo().emit("change post");
    res.send(marker);
  });
});

router.post("/change-name", (req, res) => {
  const newName = req.body.name;
  Profile.findOne({ id: req.body.id })
    .then((profile) => {
      profile.name = newName;
      profile.save();
    })
    .then(res.send({ name: newName }));
  Post.findOne({ id: req.body.id }).then((post) => {
    if (post) {
      post.name = newName;
      post.save();
    }
  });
  socketManager.getIo.emit("change post");
});

router.post("/change-major", (req, res) => {
  const newMajor = req.body.major;
  Profile.findOne({ id: req.body.id })
    .then((profile) => {
      profile.major = newMajor;
      profile.save();
    })
    .then(res.send({ major: newMajor }));
  Post.findOne({ id: req.body.id }).then((post) => {
    if (post) {
      post.major = newMajor;
      post.save();
      socketManager.getIo().emit("change post");
    }
  });
  socketManager.getIo.emit("change post");
});

router.post("/change-kerb", (req, res) => {
  const newKerb = req.body.kerb;
  Profile.findOne({ id: req.body.id })
    .then((profile) => {
      profile.kerb = newKerb;
      profile.save();
    })
    .then(res.send({ kerb: newKerb }));
  Post.findOne({ id: req.body.id }).then((post) => {
    if (post) {
      post.kerb = newKerb;
      post.save();
      socketManager.getIo().emit("change post");
    }
  });
});

router.get("/friends", (req, res) => {
  Profile.findOne({ id: req.query.id }).then((profile) => {
    if (Array.isArray(profile.friends) && profile.friends.length > 0) {
      res.send({ friends: profile.friends });
    } else {
      res.send({ friends: [] });
    }
  });
});

router.get("/friend", (req, res) => {
  const friend_id = req.query.id;
  Profile.findOne({ id: friend_id }).then((profile) => {
    Post.findOne({ id: friend_id }).then((post) => {
      if (post) {
        const friend = {
          id: profile.id,
          name: profile.name,
          major: profile.major,
          pfp: profile.pfp,
          kerb: profile.kerb,
          info: post.info,
        };
      } else {
        const friend = {
          name: profile.name,
          major: profile.major,
          pfp: profile.pfp,
          kerb: profile.kerb,
        };
      }
      res.send(friend);
    });
  });
});

router.get("/profiles", (req, res) => {
  Profile.find({})
    .select("id name major kerb pfp")
    .then((profiles) => {
      res.send({ users: profiles });
    });
});

router.get("/incoming", (req, res) => {
  Profile.findOne({ id: req.query.id }).then((profile) => {
    if (Array.isArray(profile.incoming) && profile.incoming.length > 0) {
      res.send({ incoming: profile.incoming });
    } else {
      res.send({ incoming: [] });
    }
  });
});

router.get("/sent", (req, res) => {
  Profile.findOne({ id: req.query.id }).then((profile) => {
    if (Array.isArray(profile.sent) && profile.sent.length > 0) {
      res.send({ sent: profile.sent });
    } else {
      res.send({ sent: [] });
    }
  });
});

router.post("/send-request", (req, res) => {
  Profile.findOne({ id: req.body.from_id}).then((profile) => {
    if (!Array.isArray(profile.sent)) {
      profile.sent = [];
    }
    if (!profile.sent.includes(req.body.to_id)) {
      profile.sent.push(req.body.to_id);
    }
    profile.save();
  })
  Profile.findOne({ id: req.body.to_id}).then((profile) => {
    if (!Array.isArray(profile.incoming)) {
      profile.incoming = [];
    }
    profile.incoming.push(req.body.from_id);
    profile.save();
  })
  res.send(req.body);
})

router.post("/accept-request", (req, res) => {
  Profile.findOne({ id: req.body.from_id}).then((profile) => {
    if (!Array.isArray(profile.friends)) {
      profile.friends = [];
    }
    profile.friends.push(req.body.to_id);
    profile.sent = profile.sent.filter(id => id !== req.body.to_id);
    profile.save();
  })
  Profile.findOne({ id: req.body.to_id}).then((profile) => {
    if (!Array.isArray(profile.friends)) {
      profile.friends = [];
    }
    profile.friends.push(req.body.from_id);
    profile.incoming = profile.incoming.filter(id => id !== req.body.to_id);
    profile.save();
  })
  res.send(req.body);
})

router.post("/reject-request", (req, res) => {
  Profile.findOne({ id: req.body.from_id}).then((profile) => {
    profile.sent = profile.sent.filter(id => id !== req.body.to_id);
    profile.save();
  })
  Profile.findOne({ id: req.body.to_id}).then((profile) => {
    profile.incoming = profile.incoming.filter(id => id !== req.body.to_id);
    profile.save();
  })
  res.send(req.body);
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
