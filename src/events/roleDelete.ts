import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent } from "discord.js";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class RoleDelete {
	@On({ event: "roleDelete" })
	async roleDelete([role]: ArgsOf<"roleDelete">) {
		try {
			if (role.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await role.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.RoleDelete,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = role.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await action(config.delete_role, member, "Удаление роли");
			}
		} catch (err) {
			console.log("Не удалось выполнить задачу: roleDelete", err);
		}
	}
}
