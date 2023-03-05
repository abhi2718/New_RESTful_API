const express = require("express"),
  port = process.env.port || 1010,
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  postRoutes = require("./routes/post"),
  authRoutes = require("./routes/auth"),
  followRoutes = require("./routes/follow"),
  errorHandler = require("./middlewares/errorHandler"),
  passportJWT = require("./middlewares/passportJWT")(),
  app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node", {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(passportJWT.initialize());
// serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/auth', authRoutes);
app.use("/api/post",passportJWT.authenticate(),postRoutes);
app.use('/api/follow',passportJWT.authenticate(),followRoutes);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on ${port}`));
