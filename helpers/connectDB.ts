import mongoose from "mongoose";
import { MONGO_DB_URL } from "../config/config";

export const connectDB: () => void = async () => {
  try {
    mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  mongoose.connection.on("connected", (): void =>
    console.log(`MONGO_DB CONNECTED : ${mongoose.connection.host}`)
  );

  mongoose.connection.on("error", (err): void => {
    console.error(err);
  });

  mongoose.connection.on("disconnected", (): void =>
    console.log("Mongoose Connection is Disconnected")
  );
};
