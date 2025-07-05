import mongoose from "mongoose";

const connection: { isConnected?: boolean } = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGO_DB) {
    throw new Error("Please define the MONGO_DB environment variable");
  }

  try {
    const dbReponse = await mongoose.connect(process.env.MONGO_DB as string);
    connection.isConnected = dbReponse.connection.readyState === 1;
  } catch (error) {
    console.log("Error connecting to DB", error);
    throw new Error("Error connecting to DB");
  }
};
