import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import { AuditLogEvent } from "discord.js";
import { client } from "../libs/discord";
import action from "../utils/action";
import moment from "moment";

@Discord()
class GuildMemberRemove {
	@On({ event: "guildMemberRemove" })
	async guildMemberRemove([member]: ArgsOf<"guildMemberRemove">) {
		try {
			const config = await Config.findOne({});

			const fetchedLogs = await member.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.MemberKick,
			});

			const log = fetchedLogs.entries.first();

			if (
				!log ||
				log.target.id !== member.id ||
				log.createdTimestamp < moment().unix() - 30
			) {
				return;
			}

			const { executor } = log;

			const actionMember = member.guild.members.cache.get(executor.id);

			if (actionMember.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await action(config.kick, actionMember, "Кик участника");
			}
		} catch (err) {
			console.log(err);
		}
	}
}
