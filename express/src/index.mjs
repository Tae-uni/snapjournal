import express from "express";
import routes from "./routes/index.mjs";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

mongoose
  .connect('mongodb://localhost/snapJournal')
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());

// CORS setting
app.use(cors({
  origin: "https://localhost:3000",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use('/api', routes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
