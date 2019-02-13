const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "../", "public");
const port = process.env.PORT || 3000;
//Tell him to serve public/
app.use(express.static(publicPath));
//MiddleWare, code that runs when someone makes a request
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(port, () => {
  console.log("server is up !", port);
});
