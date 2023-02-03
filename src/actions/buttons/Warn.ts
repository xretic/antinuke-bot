import { ButtonInteraction, StringSelectMenuInteraction } from "discord.js";
import actionRows from "../../data/actionRows";
import configValueNames from "../../data/configValueNames";
import embeds from "../../data/embeds";
import { Config } from "../../models/Config";
import updateConfig from "../../utils/updateConfig";

export const execute = async (
	selectMenuInteraction: StringSelectMenuInteraction,
	buttonInteraction: ButtonInteraction,
	props: {
		field: string;
	}
): Promise<void> => {
	await updateConfig(props.field, "Warn");

	const updatedConfig = await Config.findOne({});

	await selectMenuInteraction.editReply({
		embeds: [
			embeds.notification(
				"Изменение действие",
				"Вы успешно изменили пресечение за действие " +
					`"**${configValueNames[selectMenuInteraction.values[0]]}**"`,

				selectMenuInteraction.guild.members.cache
					.get(selectMenuInteraction.user.id)
					.displayAvatarURL()
			),
		],
		components: [],
	});

	(await selectMenuInteraction.message.fetch()).edit({
		embeds: [
			embeds.managePanel(
				selectMenuInteraction.guild.members.cache.get(
					selectMenuInteraction.user.id
				),
				updatedConfig
			),
		],
		components: [actionRows.antiNukePanel()],
	});
};
