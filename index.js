const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { createProxyMiddleware } = require('http-proxy-middleware');
// enable CORS
app.use(cors());
// set the port on which our app wil run
// important to read from environment variable if deploying
const port = process.env.PORT || 5000;

// basic string route to prevent Glitch error
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// the route we're working with
app.get('/corsbypass', async (req, res) => {
    const { url } = req.query;
  
    try {
      const response = await axios.get(url);
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
    }
  });

// console text when app is running
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})