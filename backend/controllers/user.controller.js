import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import oauth2client from "../utils/googleConfig.js";

const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;

    // 1. Get Google OAuth tokens
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    // 2. Fetch user profile info from Google
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    // 3. Check if user exists in DB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }

    // 4. Generate JWT token
    const { _id } = user;
    const token = jwt.sign(
      { _id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_TIMEOUT,
      }
    );

    // 5. Send response
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default googleLogin;
