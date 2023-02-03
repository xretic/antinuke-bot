import { CommandInteraction, StringSelectMenuInteraction } from "discord.js";
import actionRows from "../../data/actionRows";
import configValueNames from "../../data/configValueNames";
import embeds from "../../data/embeds";
import { Config } from "../../models/Config";
import currectAction from "../../utils/currectAction";
import { interactionCollector } from "../../collectors/interactionCollector";

export const execute = async (
	commandInteraction: CommandInteraction<"cached">,
	selectMenuInteraction: StringSelectMenuInteraction
): Promise<void> => {
	const config = await Config.findOne({});

	switch (selectMenuInteraction.values[0]) {
		case "whiteListRoles":
			await selectMenuInteraction.reply({
				ephemeral: true,
				embeds: [
					embeds.notification(
						"Добавление вайт-лист роли",
						"Выберите роль для добавление в список разрешенных",
						commandInteraction.member.displayAvatarURL()
					),
				],
				components: [actionRows.selectWhiteListRole()],
			});

			await interactionCollector(
				commandInteraction.member.id,
				selectMenuInteraction,
				"selectMenu",
				["selectWhiteListRole"]
			);
			break;

		case "warnLimit":
			await selectMenuInteraction.showModal(actionRows.setWarnLimit());
			break;
	}

	if (
		["whiteListRoles", "warnLimit"].some(
			(x) => x === selectMenuInteraction.values[0]
		)
	) {
		return;
	}

	await selectMenuInteraction.reply({
		ephemeral: true,
		embeds: [
			embeds.notification(
				"Новое значение",
				"Выберите новое пресечение для действия " +
					`"**${configValueNames[selectMenuInteraction.values[0]]}**"`,
				commandInteraction.member.displayAvatarURL()
			),
		],
		components: [
			actionRows.selectAction(
				currectAction(selectMenuInteraction.values[0], config),
				selectMenuInteraction.values[0]
			),
		],
	});

	await interactionCollector(
		selectMenuInteraction.user.id,
		selectMenuInteraction,
		"buttons",
		["Nothing", "Quarantine", "Ban", "Kick", "Warn"],
		{
			field: selectMenuInteraction.values[0],
		}
	);
};
