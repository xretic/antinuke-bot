import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import { AuditLogEvent } from "discord.js";
import action from "../utils/action";
import { client } from "../libs/discord";
import moment from "moment";

@Discord()
class WebhookUpdate {
	@On({ event: "webhookUpdate" })
	async webhookCreate([channel]: ArgsOf<"webhookUpdate">) {
		try {
			if (channel.guild.id !== process.env.GUILD_ID) return;

			const createLog = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.WebhookCreate,
			});

			const log = createLog.entries.first();

			if (!log || log.createdTimestamp < moment().unix() - 30) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = channel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await log.target.delete();
				await action(config.webhook_create, member, "Создание вебхука");
			}
		} catch {}
	}

	@On({ event: "webhookUpdate" })
	async webhookUpdate([channel]: ArgsOf<"webhookUpdate">) {
		try {
			if (channel.guild.id !== process.env.GUILD_ID) return;

			const updateLog = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.WebhookUpdate,
			});

			const log = updateLog.entries.first();

			if (!log || log.createdTimestamp < moment().unix() - 30) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = channel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await log.target.delete();
				await action(config.webhook_edit, member, "Изменение вебхука");
			}
		} catch {}
	}

	@On({ event: "webhookUpdate" })
	async webhookDelete([channel]: ArgsOf<"webhookUpdate">) {
		try {
			if (channel.guild.id !== process.env.GUILD_ID) return;

			const deleteLog = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.WebhookDelete,
			});

			const log = deleteLog.entries.first();

			if (!log || log.createdTimestamp < moment().unix() - 30) return;

			const config = await Config.findOne({});
			const { executor } = log;

			const member = channel.guild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (!config.white_list_roles.some((id) => member.roles.cache.has(id))) {
				await action(config.webhook_create, member, "Удаление вебхука");
			}
		} catch {}
	}
}
