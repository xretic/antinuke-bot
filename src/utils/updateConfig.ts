import { Config } from "../models/Config";

export default async (field: string, value: string | number): Promise<void> => {
	if (
		![
			"bot_add",
			"delete_channel",
			"create_channel",
			"edit_channel",
			"delete_role",
			"create_role",
			"edit_role",
			"webhook_create",
			"webhook_edit",
			"member_edit",
			"disable_invites",
			"delete_invite",
			"ban",
			"kick",
			"everyone_ping",
			"url_protection",
			"guild_name",
			"warn_limit",
			"warn_suppression_action",
			"white_list_roles",
		].some((x) => x === field)
	) {
		return console.error("Invalid field!");
	}

	if (field === "white_list_roles") {
		await Config.updateOne(
			{},
			{
				$push: {
					white_list_roles: [value],
				},
			}
		);
		return;
	}

	await Config.updateOne(
		{},
		{
			[field]: value,
		}
	);
};
