import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent, ChannelType } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class ChannelUpdate {
	@On({ event: "channelUpdate" })
	async channelUpdate([oldChannel, newChannel]: ArgsOf<"channelUpdate">) {
		try {
			if (newChannel.isDMBased() || oldChannel.isDMBased()) return;
			if (newChannel.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await newChannel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.ChannelUpdate,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = newChannel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await newChannel.edit({
					name: oldChannel.name,
					parent: oldChannel.parent,
					position: oldChannel.position,
					flags: oldChannel.flags,
				});

				await newChannel.permissionOverwrites.set(
					newChannel.permissionOverwrites.cache
				);

				await action(config.edit_channel, member, "Изменение канала");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу: channelUpdate", err);
		}
	}
}
