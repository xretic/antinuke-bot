import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import { AuditLogEvent } from "discord.js";
import { client } from "../libs/discord";
import action from "../utils/action";

@Discord()
class InviteDelete {
	@On({ event: "inviteDelete" })
	async inviteDelete([invite]: ArgsOf<"inviteDelete">) {
		try {
			const config = await Config.findOne({});

			const guild = await invite.guild.fetch();

			const fetchedLogs = await guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.InviteDelete,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const { executor } = log;

			const member = guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await action(config.delete_invite, member, "Удаление инвайта");
			}
		} catch (err) {
			console.log(err);
		}
	}
}
