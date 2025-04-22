import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectToDatabase } from "./configs";
import { rootRouter } from "./routes";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", rootRouter);

connectToDatabase()
  .then(() => {

    console.log("Connected to database");

    app.listen(process.env.CONTAINRX_EXPOSE_PORT, () => {
      console.log(
        `ContainRX server start successfully on port ${process.env.CONTAINRX_EXPOSE_PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
