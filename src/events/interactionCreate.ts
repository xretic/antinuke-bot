import { Discord, On, ArgsOf } from "discordx";
import embeds from "../data/embeds";
import { client } from "../libs/discord";

@Discord()
class InteractionCreate {
	@On({ event: "interactionCreate" })
	async interactionCreate([interaction]: ArgsOf<"interactionCreate">) {
		if (interaction.isCommand()) {
			if (interaction.user.id !== process.env.DEVELOPER_USER_ID) {
				return await interaction.reply({
					ephemeral: true,
					embeds: [
						embeds.notification("Ошибка", "Вы не в праве использовать это!"),
					],
				});
			}
		}

		client.executeInteraction(interaction);
	}
}
