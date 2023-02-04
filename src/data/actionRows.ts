import { ActionRowBuilder, StringSelectMenuBuilder } from "@discordjs/builders";
import {
	ButtonBuilder,
	ButtonStyle,
	ModalBuilder,
	RoleSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";

export default {
	antiNukePanel(): ActionRowBuilder<StringSelectMenuBuilder> {
		return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("antiNukePanel")
				.setPlaceholder("Выберите нужное")
				.setOptions([
					{
						label: "Добавление бота",
						value: "bot_add",
					},
					{
						label: "Удаление канала",
						value: "delete_channel",
					},
					{
						label: "Создание канала",
						value: "create_channel",
					},
					{
						label: "Изменение канала",
						value: "edit_channel",
					},
					{
						label: "Удаление роли",
						value: "delete_role",
					},
					{
						label: "Создание роли",
						value: "create_role",
					},
					{
						label: "Изменение роли",
						value: "edit_role",
					},
					{
						label: "Создание вебхука",
						value: "webhook_create",
					},
					{
						label: "Изменение вебхука",
						value: "webhook_edit",
					},
					{
						label: "Изменение участника",
						value: "member_edit",
					},
					{
						label: "Отключение инвайтов",
						value: "disable_invites",
					},
					{
						label: "Удаление инвайта",
						value: "delete_invite",
					},
					{
						label: "Бан",
						value: "ban",
					},
					{
						label: "Кик",
						value: "kick",
					},
					{
						label: "Пинг @everyone",
						value: "everyone_ping",
					},
					{
						label: "Защита ссылки",
						value: "url_protection",
					},
					{
						label: "Изменение название сервера",
						value: "guild_name",
					},
					{
						label: "Лимит варнов",
						value: "warn_limit",
					},
					{
						label: "После пресечение лимита",
						value: "warn_suppression_action",
					},
					{
						label: "Вайт-лист роли",
						value: "white_list_roles",
					},
				])
		);
	},

	selectAction(
		currentValue: string,
		field: string
	): ActionRowBuilder<ButtonBuilder> {
		const buttons = [
			new ButtonBuilder()
				.setCustomId("Nothing")
				.setLabel("Ничего")
				.setDisabled(currentValue === "Nothing")
				.setStyle(ButtonStyle.Danger),

			new ButtonBuilder()
				.setCustomId("Quarantine")
				.setLabel("Карантин")
				.setDisabled(currentValue === "Quarantine")
				.setStyle(ButtonStyle.Primary),

			new ButtonBuilder()
				.setCustomId("Ban")
				.setLabel("Бан")
				.setDisabled(currentValue === "Ban")
				.setStyle(ButtonStyle.Primary),

			new ButtonBuilder()
				.setCustomId("Kick")
				.setLabel("Кик")
				.setDisabled(currentValue === "Kick")
				.setStyle(ButtonStyle.Primary),
		];

		if (field !== "warnSuppressionAction") {
			buttons.push(
				new ButtonBuilder()
					.setCustomId("Warn")
					.setLabel("Предупреждение")
					.setDisabled(currentValue === "Warn")
					.setStyle(ButtonStyle.Primary)
			);
		}

		return new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);
	},

	selectWhiteListRole(): ActionRowBuilder<RoleSelectMenuBuilder> {
		return new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
			new RoleSelectMenuBuilder()
				.setCustomId("selectWhiteListRole")
				.setPlaceholder("Выберите роль")
		);
	},

	setWarnLimit(): ModalBuilder {
		const modal = new ModalBuilder()
			.setCustomId("setWarnLimit")
			.setTitle("Установите лимит предупреждений");

		return modal.addComponents(
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setCustomId("limit")
					.setLabel("Лимит")
					.setStyle(TextInputStyle.Short)
					.setPlaceholder("Пример: 3")
					.setMinLength(1)
					.setMaxLength(1)
			)
		);
	},
};
