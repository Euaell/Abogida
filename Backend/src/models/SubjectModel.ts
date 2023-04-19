import { Schema, model, Document, Model } from 'mongoose'

export interface ISubject extends Document {
	Name : String
}

interface SubjectModel extends Model<ISubject> {

}

const SubjectSchema : Schema <ISubject> = new Schema<ISubject>(
	{
		Name : {
			type : String,
			required : true,
			unique : true
		}
	},
	{
		timestamps : true
	})

export default model<ISubject, SubjectModel>("Subject",SubjectSchema)