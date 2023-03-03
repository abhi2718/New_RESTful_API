const express = require("express"),
  port = process.env.port || 1010,
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  postRoutes = require("./routes/post"),
  errorHandler = require("./middlewares/errorHandler"),
  app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
// serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/post", postRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on ${port}`));
