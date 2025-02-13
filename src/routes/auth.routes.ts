import { Router } from "express";

import { signUpController } from "../controllers";

export const authRouter = Router();

authRouter.use("/sign-up", signUpController);
