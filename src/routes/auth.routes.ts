import { Router } from "express";

import { AuthenticationController } from "../controllers";

const authenticationController = new AuthenticationController();

export const authRouter = Router();

authRouter.route("/sign-up").post(authenticationController.signUp);
authRouter.route("/sign-in").post(authenticationController.signIn);
