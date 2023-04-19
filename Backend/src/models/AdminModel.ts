import { model, Schema, Document, Model} from "mongoose";

export interface IAdmin extends Document {
	UserID: Schema.Types.ObjectId
}

interface AdminModel extends Model<IAdmin> {

}

const AdminSchema: Schema<IAdmin> = new Schema(
	{
		UserID: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	})

export default model<IAdmin, AdminModel>("Admin", AdminSchema)