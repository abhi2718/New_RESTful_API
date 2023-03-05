const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  postSchema = new Schema(
    {
      image: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      userRef: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Post", postSchema);
