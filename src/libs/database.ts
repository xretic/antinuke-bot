import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
	await mongoose.connect(process.env.MONGO_URL);
	console.log(`Database connected!`);
};
