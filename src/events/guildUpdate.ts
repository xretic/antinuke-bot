import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import { AuditLogEvent } from "discord.js";
import action from "../utils/action";
import { client } from "../libs/discord";
import axios from "axios";

@Discord()
class GuildUpdate {
	@On({ event: "guildUpdate" })
	async guildUpdate([oldGuild, newGuild]: ArgsOf<"guildUpdate">) {
		try {
			const config = await Config.findOne({});

			const fetchedLogs = await newGuild.fetchAuditLogs({
				limit: 1,
				type: AuditLogEvent.GuildUpdate,
			});

			const log = fetchedLogs.entries.first();

			if (!log) return;

			const { executor } = log;

			const member = newGuild.members.cache.get(executor.id);

			if (member.id === client.user.id) return;

			if (config.white_list_roles.some((id) => member.roles.cache.has(id)))
				return;

			if (newGuild.name !== oldGuild.name) {
				await newGuild.edit({ name: oldGuild.name });
				await action(config.guild_name, member, "Изменение название сервера");
			}

			if (
				newGuild.premiumTier > 1 &&
				oldGuild.vanityURLCode !== newGuild.vanityURLCode
			) {
				await axios.patch(
					`https://discord.com/api/v9/guilds/${process.env.GUILD_ID}/vanity-url`,
					{
						body: {
							code: config.vanity_url_code,
						},
						headers: {
							Authorization: "Bot " + process.env.DISCORD_TOKEN,
						},
					}
				);

				await action(config.url_protection, member, "Изменение ссылки сервера");
			}

			if (
				oldGuild.features.some((x) => x === "INVITES_DISABLED") &&
				!newGuild.features.some((x) => x === "INVITES_DISABLED")
			) {
				await newGuild.edit({
					features: oldGuild.features,
				});

				await action(
					config.disable_invites,
					member,
					"Отключение инвайтов сервера"
				);
			}
		} catch (err) {
			console.log(err);
		}
	}
}
