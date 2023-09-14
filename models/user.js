const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profileImgUrl: {
    type: String,
  },
  bannerImgUrl: {
    type: String,
  },
  userSince: {
    type: Date,
    default: Date.now,
  },
});

// presave hook to encrypt user pasword on signup
// 1. `user.isModified('password')`: The `isModified` method is called on the `user` document (the instance of the model). It takes a field name as its argument, in this case, `'password'`. The purpose is to check if the `'password'` field of the user document has been modified.

// 2. If the `'password'` field has not been modified (i.e., it's the first time the user document is being saved, or the `'password'` field was not changed during an update), the hook returns early with `next()`. This means that the password hashing operation will be skipped, as there is no need to re-hash an unmodified password.

// 3. If the `'password'` field has been modified (e.g., a new password is set or the existing password is changed), the code inside the `if` block will execute.

// 4. In the `if` block, the `bcrypt.hash` function is called to hash the password. The hashed password will then replace the original plaintext password in the `user.password` field.

// 5. After the password is hashed and the user document is updated, the `next()` function is called to proceed with saving the updated user document, now with the hashed password.

// By using `user.isModified('password')`, you can efficiently handle password hashing only when the password is being created or updated, reducing unnecessary hashing and potential overhead when other fields are updated. This is beneficial for performance and ensures that the password is always securely hashed before being stored in the database when needed.

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

//creating methods

// method to check encrypted password on login

// userSchema.methods is an object of methods currently defined on the schema
// we create one called checkPassword
// our function uses two paramaters, the password attempt and the callback function we will use in the route
// since the stored passwords are being hashed by bcrpt we use a bcrypt compare method to check the password attempt
// if there is an err we use our callback with the err
// if its a match we use callback with the match but pass null first to indicate there is no error.

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

//method to remove users password for token/sending the response

// we use the .toObject method to turn our data into plain JS

userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
