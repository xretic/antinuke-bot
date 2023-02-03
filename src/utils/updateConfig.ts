import { Config } from "../models/Config";

export default async (field: string, value: string | number): Promise<void> => {
	if (field === "whiteListRoles") {
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

	const fields = {
		addBot: {
			bot_add: value,
		},
		deleteChannel: {
			delete_channel: value,
		},
		createChannel: {
			create_channel: value,
		},
		editChannel: {
			edit_channel: value,
		},
		deleteRole: {
			delete_role: value,
		},
		createRole: {
			create_role: value,
		},
		editRole: {
			edit_role: value,
		},
		createWebhook: {
			webhook_create: value,
		},
		editWebhook: {
			webhook_edit: value,
		},
		editMember: {
			member_edit: value,
		},
		disableInvites: {
			disable_invites: value,
		},
		deleteInvite: {
			delete_invite: value,
		},
		ban: {
			ban: value,
		},
		kick: {
			kick: value,
		},
		everyonePing: {
			everyone_ping: value,
		},
		urlProtection: {
			url_protection: value,
		},
		warnLimit: {
			warn_limit: value,
		},
		warnSuppressionAction: {
			warn_suppression_action: value,
		},
		guildName: {
			guild_name: value,
		},
	};

	await Config.updateOne({}, fields[field]);
};
