import { Discord, On, ArgsOf } from "discordx";
import embeds from "../data/embeds";
import updateConfig from "../utils/updateConfig";
import { Config } from "../models/Config";
import actionRows from "../data/actionRows";

@Discord()
class ModalSumbit {
	@On({ event: "interactionCreate" })
	async modalSumbit([interaction]: ArgsOf<"interactionCreate">) {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId !== "setWarnLimit") return;

		const limit = Number(interaction.fields.getTextInputValue("limit"));

		if (limit < 1 || !limit) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					embeds.notification("Ошибка", "Вы указали не корректное число!"),
				],
			});
		}

		await interaction.reply({
			ephemeral: true,
			embeds: [
				embeds.notification(
					"Изменение лимита предупреждений",
					"Вы успешно изменили лимит предупреждений на " + `\`${limit}\``
				),
			],
		});

		await updateConfig("warnLimit", limit);

		const updatedConfig = await Config.findOne({});

		(await interaction.message.fetch()).edit({
			embeds: [
				embeds.managePanel(
					interaction.guild.members.cache.get(interaction.user.id),
					updatedConfig
				),
			],
			components: [actionRows.antiNukePanel()],
		});
	}
}
