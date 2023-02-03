import { Schema, model } from "mongoose";

export interface IWarn {
	_id?: Schema.Types.ObjectId;
	user_id: string;
	reason: string;
	updatedAt: string;
	createdAt: string;
}

const schema = new Schema<IWarn>(
	{
		user_id: { type: String, required: true },
		reason: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

export const Warn = model<IWarn>("Warn", schema);
