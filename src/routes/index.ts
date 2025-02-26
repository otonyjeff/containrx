import { Router } from "express";

import { authRouter } from "./auth.routes";
import { imageRouter } from "./image.routes";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/image", imageRouter);
