export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			MONGO_URL: string;
			GUILD_ID: string;
			DEVELOPER_USER_ID: string;
			LOGGER_CHANNEL_ID: string;
		}
	}
}
