const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema,
  userSchema = new Schema(
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
        select: false,
      },
      age: {
        type: Number,
        require:false,
      },
      following: [{
        type: Schema.Types.ObjectId,
        ref:"User"
      }]
    },
    {
      timestamps: true,
    }
  );
userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
userSchema.methods.validatePassword = async function (candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};
module.exports = mongoose.model("User", userSchema);
