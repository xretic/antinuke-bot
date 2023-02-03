import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";

@Discord()
class GuildMemberAdd {
	@On({ event: "guildMemberAdd" })
	async guildMemberAdd([member]: ArgsOf<"guildMemberAdd">) {
		try {
			if (member.guild.id !== process.env.GUILD_ID) return;
			if (!member.user.bot) return;

			const fetchedLogs = await member.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.BotAdd,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const actionMember = member.guild.members.cache.get(executor.id);

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await member.kick();
				await action(config.bot_add, actionMember, "Добавление бота");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу guildMemberAdd", err);
		}
	}
}
