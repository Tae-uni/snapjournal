import express from "express";
import routes from "./routes/index.mjs";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect('mongodb://localhost/snapJournal')
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
