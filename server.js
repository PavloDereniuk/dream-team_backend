import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: ", PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
