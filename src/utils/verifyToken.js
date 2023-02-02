const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
    const key = process.env.JWT_SECRET_KEY;
    return new Promise((res, rej) => {
      jwt.verify(token, key, function (error, user) {
        if (error) return rej(err);
        //here you get the user
        return res(user);
      });
    });
  };
module.exports=verifyToken;