import {Schema, model, Document, Model} from "mongoose";

export interface IStudent extends Document {
	Class : Schema.Types.ObjectId,
	UserID : Schema.Types.ObjectId
}

interface StudentModel extends Model<IStudent> {

}

const StudentSchema : Schema <IStudent> = new Schema<IStudent>(
	{
		Class : {
			type : Schema.Types.ObjectId,
			required : true,
			ref : "Class"
		},
		UserID : {
			type : Schema.Types.ObjectId,
			required : true,
			ref : "User",
			unique : true
		}
	},
	{
		timestamps : true
	}
)

export default model<IStudent, StudentModel>("Student",StudentSchema)

