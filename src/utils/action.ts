import { GuildMember } from "discord.js";
import embeds from "../data/embeds";
import { Action, Config } from "../models/Config";
import { Warn } from "../models/Warn";
import sendLog from "./sendLog";

export default async (
	type: Action,
	member: GuildMember,
	warnReason: string
): Promise<void> => {
	switch (type) {
		case "Warn":
			await Warn.create({ user_id: member.id, reason: warnReason });

			await member
				.send({
					embeds: [
						embeds.notification(
							"Предупреждение",
							"Вы получили предупреждение по причине " + `**${warnReason}**`,
							member.displayAvatarURL()
						),
					],
				})
				.catch(() => {});

			const config = await Config.findOne({});
			const allWarnsCount = await Warn.countDocuments({ user_id: member.id });

			if (allWarnsCount === config.warn_limit) {
				await member
					.send({
						embeds: [
							embeds.notification(
								"Лимит предупреждений",
								"Вы достигли лимита предупреждений!",
								member.displayAvatarURL()
							),
						],
					})
					.catch(() => {});

				switch (config.warn_suppression_action) {
					case "Kick":
						await member.kick().catch(() => {});
						break;

					case "Ban":
						await member.ban().catch(() => {});
						break;

					case "Quarantine":
						await member.roles.set([]).catch(() => {});
						break;
				}

				await Warn.deleteMany({ user_id: member.id });
			}

			await sendLog(
				embeds.notification(
					"Предупреждение",
					`Пользователю ${member.toString()} выдано \`${allWarnsCount} из ${
						config.warn_limit
					}\` предупреждение`
				)
			);
			break;

		case "Kick":
			await member.kick().catch(() => {});
			await sendLog(
				embeds.notification("Кик", `Пользователь ${member.toString()} кикнут`)
			);
			break;

		case "Ban":
			await member.ban().catch(() => {});
			await sendLog(
				embeds.notification(
					"Бан",
					`Пользователю ${member.toString()} выдан бан`
				)
			);
			break;

		case "Quarantine":
			await member.roles.set([]).catch(() => {});
			await sendLog(
				embeds.notification(
					"Карантин",
					`Пользователю ${member.toString()} выдан карантин`
				)
			);
			break;
	}

	await sendLog(
		embeds.notification(
			warnReason,
			`Пользователь ${member.toString()} выполнил запрещенное действие **"${warnReason}"**`
		)
	);
};
