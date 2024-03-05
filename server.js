// import mongoose from "mongoose";
// import app from "./app";
// import dotenv from "dotenv";
// dotenv.config();


// const databaseHost = process.env.DB_HOST;

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(databaseHost)
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Database connection successful");
//       console.log("Server running. Use our API on port: 3000");
//     });
//   })
//   .catch((err) => {
//     console.log("err", err);
//     process.exit(1);
//   });