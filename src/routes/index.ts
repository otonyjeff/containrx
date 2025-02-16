import { Router } from "express";

import { authRouter } from "./auth.routes";
import { dockerServiceRouter } from "./docker.routes";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/docker-service", dockerServiceRouter)
