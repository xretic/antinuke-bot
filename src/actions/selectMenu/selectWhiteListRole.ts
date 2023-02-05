import {
	RoleSelectMenuInteraction,
	StringSelectMenuInteraction,
} from "discord.js";
import embeds from "../../data/embeds";
import updateConfig from "../../utils/updateConfig";
import { Config } from "../../models/Config";
import actionRows from "../../data/actionRows";

export const execute = async (
	selectMenuInteraction: StringSelectMenuInteraction,
	roleSelectMenuInteraction: RoleSelectMenuInteraction
): Promise<void> => {
	const config = await Config.findOne({});

	if (
		config.white_list_roles.some(
			(x) => x === roleSelectMenuInteraction.values[0]
		)
	) {
		const config = await Config.findOneAndUpdate(
			{},
			{
				$pull: {
					white_list_roles: roleSelectMenuInteraction.values[0],
				},
			},
			{
				new: true,
			}
		);

		await roleSelectMenuInteraction.editReply({
			embeds: [
				embeds.notification(
					"Удаление вайт-лист роли",
					"Вы успешно убрали данную роль со списка разрешенных!",
					roleSelectMenuInteraction.guild.members.cache
						.get(roleSelectMenuInteraction.user.id)
						.displayAvatarURL()
				),
			],
		});

		(await selectMenuInteraction.message.fetch()).edit({
			embeds: [
				embeds.managePanel(
					roleSelectMenuInteraction.guild.members.cache.get(
						roleSelectMenuInteraction.user.id
					),
					config
				),
			],
			components: [actionRows.antiNukePanel()],
		});
		return;
	}

	await selectMenuInteraction.editReply({
		embeds: [
			embeds.notification(
				"Добавление вайт-лист роли",
				"Вы успешно добавили роль в список разрешенных!",
				roleSelectMenuInteraction.guild.members.cache
					.get(roleSelectMenuInteraction.user.id)
					.displayAvatarURL()
			),
		],
		components: [],
	});

	await updateConfig("white_list_roles", roleSelectMenuInteraction.values[0]);

	const updatedConfig = await Config.findOne({});

	(await selectMenuInteraction.message.fetch()).edit({
		embeds: [
			embeds.managePanel(
				roleSelectMenuInteraction.guild.members.cache.get(
					roleSelectMenuInteraction.user.id
				),
				updatedConfig
			),
		],
		components: [actionRows.antiNukePanel()],
	});
};
