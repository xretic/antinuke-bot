import { Discord, On, ArgsOf } from "discordx";
import action from "../utils/action";
import { Config } from "../models/Config";
import { AuditLogEvent } from "discord.js";
import { client } from "../libs/discord";

@Discord()
class RoleUpdate {
	@On({ event: "roleUpdate" })
	async roleUpdate([oldRole, newRole]: ArgsOf<"roleUpdate">) {
		try {
			if (newRole.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await newRole.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.RoleUpdate,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = newRole.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await newRole.edit({
					name: oldRole.name,
					color: oldRole.color,
					position: oldRole.position,
					permissions: oldRole.permissions,
				});
				await action(config.edit_role, member, "Изменение роли");
			}
		} catch (err) {
			console.log(err);
		}
	}
}
