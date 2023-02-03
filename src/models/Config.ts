import { Schema, model } from "mongoose";

export type Action = "Nothing" | "Quarantine" | "Ban" | "Kick" | "Warn";

export interface IConfig {
	_id?: Schema.Types.ObjectId;
	vanity_url_code: string;
	bot_add: Action;
	delete_channel: Action;
	create_channel: Action;
	edit_channel: Action;
	delete_role: Action;
	create_role: Action;
	edit_role: Action;
	webhook_create: Action;
	webhook_edit: Action;
	member_edit: Action;
	disable_invites: Action;
	delete_invite: Action;
	ban: Action;
	kick: Action;
	everyone_ping: Action;
	url_protection: Action;
	guild_name: Action;
	warn_limit: number;
	warn_suppression_action: "Nothing" | "Quarantine" | "Ban" | "Kick";
	white_list_roles: string[];
}

const schema = new Schema<IConfig>({
	vanity_url_code: { type: String, default: "" },
	bot_add: { type: String, default: "Quarantine" },
	delete_channel: { type: String, default: "Quarantine" },
	create_channel: { type: String, default: "Quarantine" },
	edit_channel: { type: String, default: "Quarantine" },
	delete_role: { type: String, default: "Quarantine" },
	create_role: { type: String, default: "Quarantine" },
	edit_role: { type: String, default: "Quarantine" },
	webhook_create: { type: String, default: "Quarantine" },
	webhook_edit: { type: String, default: "Quarantine" },
	member_edit: { type: String, default: "Quarantine" },
	disable_invites: { type: String, default: "Quarantine" },
	delete_invite: { type: String, default: "Quarantine" },
	ban: { type: String, default: "Quarantine" },
	kick: { type: String, default: "Quarantine" },
	everyone_ping: { type: String, default: "Quarantine" },
	url_protection: { type: String, default: "Quarantine" },
	guild_name: { type: String, default: "Quarantine" },
	warn_limit: { type: Number, min: 1, default: 3 },
	warn_suppression_action: { type: String, default: "Quarantine" },
	white_list_roles: { type: [String], default: [] },
});

export const Config = model<IConfig>("Config", schema);
