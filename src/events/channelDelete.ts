import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent, ChannelType } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class ChannelDelete {
	@On({ event: "channelDelete" })
	async channelDelete([channel]: ArgsOf<"channelDelete">) {
		try {
			if (channel.isDMBased()) return;
			if (channel.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.ChannelDelete,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = channel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await action(config.delete_channel, member, "Удаление канала");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу: channelDelete", err);
		}
	}
}
