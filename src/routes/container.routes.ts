import { Router } from "express";

import { ContainerManagerController } from "../controllers";

const containerController = new ContainerManagerController();

export const containerRouter = Router();

containerRouter.route("/create").post(containerController.createContainer);

containerRouter.route("/list").get(containerController.listContainers);

containerRouter.route("/pause").put(containerController.pauseContainer);
containerRouter.route("/unpause").put(containerController.unpauseContainer)

containerRouter.route("/stop").put(containerController.stopContainer);
containerRouter.route("/resume").put(containerController.resumeContainer)

containerRouter.route("/remove").put(containerController.removeContainer)
