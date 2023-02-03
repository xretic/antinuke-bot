import { CommandInteraction, GuildMember } from "discord.js";
import { Discord, Slash } from "discordx";
import actionRows from "../data/actionRows";
import embeds from "../data/embeds";
import { Config } from "../models/Config";
import { interactionCollector } from "../collectors/interactionCollector";

@Discord()
class AntiNuke {
	@Slash({ name: "antinuke", description: "Панель управление анти-крашем" })
	async execute(interaction: CommandInteraction<"cached">) {
		const config = await Config.findOne({});

		await interaction.reply({
			embeds: [embeds.managePanel(interaction.member as GuildMember, config)],
			components: [actionRows.antiNukePanel()],
		});

		await interactionCollector(
			interaction.member.id,
			interaction,
			"selectMenu",
			["antiNukePanel"]
		);
	}
}
