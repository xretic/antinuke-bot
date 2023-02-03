import path from "path";
import {
	ButtonInteraction,
	CommandInteraction,
	Message,
	AnySelectMenuInteraction,
} from "discord.js";

export const interactionCollector = async (
	id: string,
	interaction:
		| CommandInteraction
		| ButtonInteraction
		| AnySelectMenuInteraction,
	type: "buttons" | "selectMenu",
	filters: string[],
	props?: any | null
) => {
	const filter = (i: ButtonInteraction | AnySelectMenuInteraction) => {
		return filters.some((x) => x === i.customId && i.user.id === id);
	};

	const message = (await interaction.fetchReply()) as Message;

	const collector = message.createMessageComponentCollector({
		filter,
		time: 60 * 1000,
	});

	collector.on(
		"collect",
		async (i: ButtonInteraction | AnySelectMenuInteraction) => {
			try {
				collector.resetTimer();

				if (type === "selectMenu") {
					(await interaction.fetchReply()).edit({}).catch(() => {});
				}

				const file = await import(
					path.resolve(__dirname, `../actions/${type}/${i.customId}.{ts,js}`)
				);

				if (props) {
					await file.execute(interaction, i, props);
				} else if (!props) {
					await file.execute(interaction, i);
				}

				if (!i.replied && !i.deferred) {
					await i.deferUpdate().catch(() => {});
				}
			} catch (err) {
				console.log(err);
			}
		}
	);
};
