import { Router } from "express";
import googleLogin from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post('/google',googleLogin);

export default userRoute;