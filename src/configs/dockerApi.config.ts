import Docker from "dockerode";

export const dockerApi = new Docker({
  host: process.env.DOCKER_ENGINE_URL,
});
