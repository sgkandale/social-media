let express = require('express');
let bodyParser = require("body-parser");


const { authenticate } = require('./controller/authenticate');
const { followUser, unfollowUser } = require('./controller/follow');
const { validateToken } = require('./controller/validateToken');
const { createPost, getPostById, getPostByUserId, deletePostById } = require('./controller/posts');
const { getUserDetails } = require('./controller/user');
const { likePostById, unlikePostById } = require('./controller/like');
const { commentPostById } = require('./controller/comments');

let app = express();
app.use(bodyParser.json());

// user authentication
app.post("/api/authenticate", authenticate)

// follow user with {id}
app.post("/api/follow/:userid", validateToken, followUser)

// unfollow user with {id}
app.post("/api/unfollow/:userid", validateToken, unfollowUser)

// user profile
app.get("/api/user", validateToken, getUserDetails)

// add a new post
app.post("/api/posts", validateToken, createPost)

// return a single post with {id} 
app.get("/api/posts/:id", validateToken, getPostById)

// return all posts created by authenticated user sorted by post time
app.get("/api/all_posts", validateToken, getPostByUserId)

// delete post with {id} 
app.delete("/api/posts/:id", validateToken, deletePostById)

// like the post with {id} 
app.post("/api/like/:id", validateToken, likePostById)

// unlike the post with {id} 
app.post("/api/unlike/:id", validateToken, unlikePostById)

// comment the post with {id} 
app.post("/api/comment/:id", validateToken, commentPostById)

const port = process.env.PORT || 8000;

// start the server listening for requests
app.listen(port, (err) => {
  if (err) {
    return console.log(`cannot listen on port : ${port}`);
  }
  console.log(`Server is running on port : ${port}`)
});