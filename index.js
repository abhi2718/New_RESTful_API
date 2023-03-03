const express = require("express"),
  port = process.env.port || 1010,
  path = require("path"),
  cors = require("cors"),
  postRoutes = require("./routes/post"),
  errorHandler = require("./middlewares/errorHandler"),
  app = express();

app.use(cors());
app.use(express.json());
// serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/post", postRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on ${port}`));
