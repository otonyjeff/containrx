import { Router } from "express";

import { signUpController } from "../controllers";

export const authRouter = Router();

authRouter.route("/sign-up").post(signUpController);
