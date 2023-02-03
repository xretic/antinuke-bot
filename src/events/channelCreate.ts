import { Discord, On, ArgsOf } from "discordx";
import { TextChannel, AuditLogEvent } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class ChannelCreate {
	@On({ event: "channelCreate" })
	async channelCreate([channel]: ArgsOf<"channelCreate">) {
		try {
			if (channel.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.ChannelCreate,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = channel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await channel.delete();
				await action(config.create_channel, member, "Создание канала");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу: channelCreate", err);
		}
	}
}
