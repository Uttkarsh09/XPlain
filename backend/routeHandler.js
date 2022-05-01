const express = require("express");
const router = express.Router();
const blogGet = require("./Routes/Blogs/BlogGet");
const blogPost = require("./Routes/Blogs/BlogPost");
const userPost = require("./Routes/User/UserPost");
const userGet = require("./Routes/User/UserGet");
const userPut = require("./Routes/User/UserPut");
const loginLogout = require("./Routes/User/LoginLogout");
const editorJSLink = require("./Routes/EditorJS/Link");

console.log("IN route handler");

//Login
router.use("/", loginLogout);

// Blogs
router.use("/blog/", blogGet);
router.use("/blog/", blogPost);

// User
router.use("/user/", userPost);
router.use("/user/", userGet);
router.use("/user/", userPut);

// EditorJS Plugins
router.use("/editorjs/link", editorJSLink);

module.exports = router;
