import { EmbedBuilder } from "@discordjs/builders";
import { TextChannel } from "discord.js";
import { client } from "../libs/discord";

export default async (embed: EmbedBuilder): Promise<void> => {
	const guild = client.guilds.cache.get(process.env.GUILD_ID);

	const logChannel = guild.channels.cache.get(
		process.env.LOGGER_CHANNEL_ID
	) as TextChannel;

	await logChannel.send({
		embeds: [embed],
	});
};
