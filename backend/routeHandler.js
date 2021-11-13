const express = require("express");
const router = express.Router();
const blogGet = require("./Routes/Blogs/BlogGet");
const blogPost = require("./Routes/Blogs/BlogPost");
const userPost = require("./Routes/User/UserPost");
const userGet = require("./Routes/User/UserGet");
const autoLogin = require("./Routes/User/AutoLogin");

console.log("IN route handler");

//Login
router.use("/autoLogin", autoLogin);

// Blogs
router.use("/blog/", blogGet);
router.use("/blog/", blogPost);

// User
router.use("/user/", userPost);
router.use("/user/", userGet);

module.exports = router;
