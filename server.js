/*
const express = require("express");
const path = require("path");
const favicon = require("express-favicon");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/!*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
*/

const express = require("express");
const path = require("path");
const favicon = require("express-favicon");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});