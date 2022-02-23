var express = require('express');
var app = express();

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})

const port = process.env.PORT || 8000;

// start the server listening for requests
app.listen(port, () => {
   console.log("Server is running...")
});