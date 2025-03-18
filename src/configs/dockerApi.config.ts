import Docker from "dockerode";

export const dockerApi = new Docker({
  host: process.env.DOCKER_ENGINE_HOST,
  port: "2375",
});
