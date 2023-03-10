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
        require: false,
        validate: {
          validator: (value) => {
            if (value % 2 === 0) {
              return true;
            } else {
              return false;
            }
          },
          message: (props) => `${props.value} is not an even number`,
        },
      },
      gender: {
        type: String,
        require: false,
      },
      caste: {
        type: String,
        require: false,
      },
      following: [],
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

userSchema.statics.findByName = function () {
  return this.find({});
};

userSchema.virtual("averageAge").get(function () {
  return this.age / 5
})

userSchema.pre('save', function (next) {
  console.log("pre ", this.name);
  next();
})
userSchema.post('save', function (doc,next) { 
  console.log("post ", this.name);
  next();
})

module.exports = mongoose.model("User", userSchema);
