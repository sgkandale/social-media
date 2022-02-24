# social-media
Social networking site in NodeJS

<!-- link to demo -->
[Link to Heroku](https://sgkandale-social-media.herokuapp.com)

### Tech Stack
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Default Users
- john@doe.com  
  johndoekapassword
- jane@doe.com  
  janedoekapassword


### Endpoints:

- /api/authenticate  
  method: POST  
  required body: username, password  
    returns: token, format

All other endpoints require a valid token.

- /api/follow/:userid  
    method: POST  
    returns: status

- /api/unfollow/:userid  
    method: POST  
    returns: status

- /api/user  
    method: GET  
    returns: username, email, created_at, following count, followers count, posts  
      
  
- /api/posts  
    method: POST   
    returns: new post  

- /api/posts/:id  
    method: GET  
    returns: post

- /api/all_posts  
    method: GET  
    returns: all posts by user from token

- /api/posts/:id  
    method: DELETE  
    returns: status

- /api/like/:id  
    method: POST  
    returns: status

- /api/unlike/:id  
    method: POST  
    returns: status

- /api/comment/:id  
    required body : comment  
    method: POST  
    returns: status
