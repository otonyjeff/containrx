import express from "express";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())

app.use("/", )

app.listen(process.env.PORT, () => {
  console.log(
    `ContainRX daemon server start successfully on port ${process.env.PORT}`
  );
});
