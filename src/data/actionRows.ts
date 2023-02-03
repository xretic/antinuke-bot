import { ActionRowBuilder, StringSelectMenuBuilder } from "@discordjs/builders";
import {
	ButtonBuilder,
	ButtonStyle,
	ModalBuilder,
	RoleSelectMenuBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { Action } from "../models/Config";

export default {
	antiNukePanel(): ActionRowBuilder<StringSelectMenuBuilder> {
		return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("antiNukePanel")
				.setPlaceholder("Выберите нужное")
				.setOptions([
					{
						label: "Добавление бота",
						value: "addBot",
					},
					{
						label: "Удаление канала",
						value: "deleteChannel",
					},
					{
						label: "Создание канала",
						value: "createChannel",
					},
					{
						label: "Изменение канала",
						value: "editChannel",
					},
					{
						label: "Удаление роли",
						value: "deleteRole",
					},
					{
						label: "Создание роли",
						value: "createRole",
					},
					{
						label: "Изменение роли",
						value: "editRole",
					},
					{
						label: "Создание вебхука",
						value: "createWebhook",
					},
					{
						label: "Изменение вебхука",
						value: "editWebhook",
					},
					{
						label: "Изменение участника",
						value: "editMember",
					},
					{
						label: "Отключение инвайтов",
						value: "disableInvites",
					},
					{
						label: "Удаление инвайта",
						value: "deleteInvite",
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
						value: "everyonePing",
					},
					{
						label: "Защита ссылки",
						value: "urlProtection",
					},
					{
						label: "Изменение название сервера",
						value: "guildName",
					},
					{
						label: "Лимит варнов",
						value: "warnLimit",
					},
					{
						label: "После пресечение лимита",
						value: "warnSuppressionAction",
					},
					{
						label: "Вайт-лист роли",
						value: "whiteListRoles",
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
