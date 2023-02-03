import { Discord, On, ArgsOf } from "discordx";
import { Config } from "../models/Config";
import action from "../utils/action";

@Discord()
class MessageCreate {
	@On({ event: "messageCreate" })
	async antiEveryone([msg]: ArgsOf<"messageCreate">) {
		const config = await Config.findOne({});

		if (
			msg.mentions.everyone === true &&
			!config.white_list_roles.some((id) => msg.member.roles.cache.has(id))
		) {
			await msg.delete();
			await action(config.everyone_ping, msg.member, "Пинг everyone");
		}
	}
}
