import { ActivityType } from "discord.js";
import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import { client } from "../libs/discord";

@Discord()
class Ready {
	@On({ event: "ready" })
	async ready([readyClient]: ArgsOf<"ready">) {
		const check = await Config.findOne({});

		if (!check) {
			const guild = client.guilds.cache.get(process.env.GUILD_ID);

			let options = {};

			if (guild.premiumTier > 1 && guild.vanityURLCode) {
				options = {
					vanity_url_code: guild.vanityURLCode,
				};
			}
			await Config.create(options);
		}

		await client.guilds.fetch();

		await client.initApplicationCommands();

		client.user.setActivity({
			name: "защите",
			type: ActivityType.Competing,
		});

		console.log("Discord bot is ready!");
	}
}
