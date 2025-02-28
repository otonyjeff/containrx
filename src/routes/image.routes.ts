import { Router } from "express";

import { ImageManagerController } from "../controllers";

const imageController = new ImageManagerController();

export const imageRouter = Router();

imageRouter.route("/list").get(imageController.listImages);
imageRouter.route("/remove/:name").delete(imageController.removeImage);
