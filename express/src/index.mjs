import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});