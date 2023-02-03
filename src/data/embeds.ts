import { EmbedBuilder } from "@discordjs/builders";
import { GuildMember } from "discord.js";
import { IConfig } from "../models/Config";
import actions from "./actions";

export default {
	notification(title: string, text: string, avatarUrl?: string): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(text)
			.setColor(0x2f3136);

		if (avatarUrl) {
			embed.setThumbnail(avatarUrl);
		}

		return embed;
	},

	managePanel(member: GuildMember, config: IConfig): EmbedBuilder {
		return new EmbedBuilder()
			.setTitle("Панель управление анти-крашем")
			.setDescription(
				"```Конфигурация защиты```\n" +
					`> **Добавление бота** - \`${actions[config.bot_add]}\`\n` +
					`> **Удаление канала** - \`${actions[config.delete_channel]}\`\n` +
					`> **Создание канала** - \`${actions[config.create_channel]}\`\n` +
					`> **Изменение канала** - \`${actions[config.edit_channel]}\`\n` +
					`> **Удаление роли** - \`${actions[config.delete_role]}\`\n` +
					`> **Создание роли** - \`${actions[config.create_channel]}\`\n` +
					`> **Изменение роли** - \`${actions[config.edit_role]}\`\n` +
					`> **Создание вебхука** - \`${actions[config.webhook_create]}\`\n` +
					`> **Изменение вебхука** - \`${actions[config.webhook_edit]}\`\n` +
					`> **Изменение участника** - \`${actions[config.member_edit]}\`\n` +
					`> **Защита ссылки** - \`${actions[config.url_protection]}\`\n` +
					`> **Изменение название сервера** - \`${
						actions[config.guild_name]
					}\`\n` +
					`> **Отключение инвайтов** - \`${
						actions[config.disable_invites]
					}\`\n` +
					`> **Удаление инвайта** - \`${actions[config.delete_invite]}\`\n` +
					`> **Бан** - \`${actions[config.ban]}\`\n` +
					`> **Кик** - \`${actions[config.kick]}\`\n` +
					`> **Пинг @everyone** - \`${actions[config.everyone_ping]}\`\n\n` +
					"```Термины```\n" +
					"> **Карантин** - `Удаление всех ролей пользователя`\n" +
					"> **Бан** - `Выдать блокировку на сервере`\n" +
					"> **Кик** - `Выгнать с сервера`\n" +
					"> **Предупреждение** - `Выдача варна пользователю`\n\n" +
					"```Настройки```\n" +
					`> **Лимит варнов** - \`${config.warn_limit}\`\n` +
					`> **После пресечение лимита** - \`${
						actions[config.warn_suppression_action]
					}\`\n` +
					`> **Вайт-лист роли** - ${
						config.white_list_roles.length === 0
							? "`Не установлены`"
							: config.white_list_roles.map((x) => `<@&${x}>`).join(" ")
					}`
			)
			.setThumbnail(member.displayAvatarURL())
			.setColor(0x2f3136);
	},
};
