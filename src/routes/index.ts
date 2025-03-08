import { Router } from "express";

import { authRouter } from "./auth.routes";
import { imageRouter } from "./image.routes";
import { Middlewares } from "../middlewares";

export const rootRouter = Router();

const middleware = new Middlewares();

rootRouter.use("/auth", authRouter);
rootRouter.use("/image", middleware.tokenVerifier, imageRouter);
