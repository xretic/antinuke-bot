import { Discord, On, ArgsOf } from "discordx";
import { AuditLogEvent, TextChannel } from "discord.js";
import moment from "moment";
import { Config } from "../models/Config";
import action from "../utils/action";
import { client } from "../libs/discord";

@Discord()
class RoleCreate {
	@On({ event: "roleCreate" })
	async roleCreate([role]: ArgsOf<"roleCreate">) {
		try {
			if (role.guild.id !== process.env.GUILD_ID) return;

			const fetchedLogs = await role.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.RoleCreate,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = role.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await role.delete();
				await action(config.create_role, member, "Создание роли");
			}
		} catch (err) {
			console.log(err);
		}
	}
}
