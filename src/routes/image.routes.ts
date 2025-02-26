import { Router } from "express";

import { listImagesController } from "../controllers";

export const imageRouter = Router();

imageRouter.route("/list-images").get(listImagesController);
