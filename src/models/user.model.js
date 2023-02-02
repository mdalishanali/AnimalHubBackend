const Yup = require("yup");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: Yup.string().email().required("Enter valid email-id"),
    name: Yup.object().shape({
      first: Yup.string()
        .matches(/[A-Z]/, "Name should start with uppercase")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please enter first name"),
      last: Yup.string()
        .matches(/[A-Z]/, "Name should start with uppercase")
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please enter last name"),
    }),
    password: Yup.string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/)
      .required(
        "Please valid password. One uppercase, one lowercase, one special character and no spaces"
      ),
    role: {
      type: Yup.string().required(),
      enum: ["Admin", "User"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  let hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
