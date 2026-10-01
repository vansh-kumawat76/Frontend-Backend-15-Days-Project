const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log("token >>>", token);

    const decode = jwt.verify(token, "gpTech");

    console.log("decode >>>", decode);

    req.user = decode;

    next();

  } catch (error) {
    console.log("JWT Error >>>", error.message);

    return res.status(401).send({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = auth;

