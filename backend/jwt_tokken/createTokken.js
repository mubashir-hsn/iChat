import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY, {
    expiresIn: "10d",
  });
  res.cookie('jwt', token, { // 'jwt' should be a string
    httpOnly: true,
    secure: false,  // Set true if you're using HTTPS
    sameSite: "strict",
  });
};

export default createTokenAndSaveCookie;
