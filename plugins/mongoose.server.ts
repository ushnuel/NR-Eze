import mongoose from "mongoose";

export default defineNuxtPlugin(async (nuxtApp) => {
  const uri = process.env.MONGODB_URI;
  await mongoose
    .connect(uri as string)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err: Error) => {
      console.error("MongoDB connection error", err.message);
      console.error("MongoDB connection error", err.cause);
    });

  nuxtApp.provide("mongoose", mongoose);
});
