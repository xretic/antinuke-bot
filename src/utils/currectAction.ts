import { IConfig } from "../models/Config";

export default (value: string, config: IConfig): string => {
	const fields = {
		addBot: config.bot_add,
		deleteChannel: config.delete_channel,
		createChannel: config.create_channel,
		editChannel: config.edit_channel,
		deleteRole: config.edit_role,
		createRole: config.create_role,
		editRole: config.edit_role,
		createWebhook: config.webhook_create,
		editWebhook: config.webhook_edit,
		editMember: config.member_edit,
		disableInvites: config.disable_invites,
		deleteInvite: config.delete_invite,
		ban: config.ban,
		kick: config.kick,
		everyonePing: config.everyone_ping,
		warnLimit: config.warn_limit,
		warnSuppressionAction: config.warn_suppression_action,
		urlProtection: config.url_protection,
		guildName: config.guild_name,
	};

	return fields[value];
};
