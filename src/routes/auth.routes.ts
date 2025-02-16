import { Router } from "express";

import { signInController, signUpController } from "../controllers";

export const authRouter = Router();

authRouter.route("/sign-up").post(signUpController);
authRouter.route("/sign-in").post(signInController);
