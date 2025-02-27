import { Router } from "express";

import { listImagesController, removeImageController } from "../controllers";

export const imageRouter = Router();

imageRouter.route("/list").get(listImagesController);
imageRouter.route("/remove/:name").delete(removeImageController)
