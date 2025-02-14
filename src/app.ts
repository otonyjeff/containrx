import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectToDatabase } from "./configs";
import { rootRouter } from "./routes";
import { ErrorWithStatusCode } from "./utils/error.util";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

connectToDatabase()
  .then(() => {

    console.log("Connected to database");

    app.listen(process.env.PORT, () => {
      console.log(
        `ContainRX server start successfully on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
