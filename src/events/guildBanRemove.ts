import { Discord, On, ArgsOf } from "discordx";
import { TextChannel, AuditLogEvent } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class GuildBanRemove {
	@On({ event: "guildBanRemove" })
	async guildBanRemove([ban]: ArgsOf<"guildBanRemove">) {
		try {
			if (ban.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await ban.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.MemberBanRemove,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = ban.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await ban.guild.bans.create(ban.user.id);
				await action(config.ban, member, "Разбан участника");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу: guildBanAdd", err);
		}
	}
}
