import { GatewayIntentBits } from "discord.js";
import { Client } from "discordx";
import { importx } from "@discordx/importer";
import path from "path";

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildScheduledEvents,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildEmojisAndStickers,
	],
});

export const connectDiscord = async (): Promise<void> => {
	await importx(
		path.resolve("./{src,dist}/{commands,events}/") + "/**/*.{ts,js}"
	);
	await client.login(process.env.DISCORD_TOKEN);
};
