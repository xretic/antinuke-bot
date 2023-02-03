import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class GuildMemberUpdate {
	@On({ event: "guildMemberUpdate" })
	async guildMemberUpdate([oldMember, newMember]: ArgsOf<"guildMemberUpdate">) {
		try {
			if (newMember.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await newMember.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.MemberRoleUpdate,
			});

			const log = fetchedLogs.entries.first();

			if (!log || log.target.id !== newMember.id) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const actionMember = newMember.guild.members.cache.get(executor.id);

			if (actionMember.id === client.user.id) return;

			if (
				!config.white_list_roles.some((id) => newMember.roles.cache.has(id))
			) {
				await newMember.roles.set(oldMember.roles.cache);
				await action(
					config.member_edit,
					actionMember,
					"Изменение ролей пользователя"
				);
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу guildMemberUpdate", err);
		}
	}
}
