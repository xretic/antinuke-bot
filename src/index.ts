import { connectDiscord } from "./libs/discord";
import { connectDatabase } from "./libs/database";
import { config } from "dotenv";

config({
	path: "./.env",
});

const bootstrap = async (): Promise<void> => {
	await connectDatabase();
	await connectDiscord();
};

bootstrap()
	.then(() => {
		console.log("App started!");
	})
	.catch((err: Error) => {
		console.error(err);
	});
