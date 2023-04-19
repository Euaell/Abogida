import { Schema, model, Document, Model } from 'mongoose'

export interface IClass extends Document {
	ClassName: string
}

interface ClassModel extends Model<IClass> {}

const ClassSchema: Schema<IClass> = new Schema(
	{
		ClassName: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	})

export default model<IClass, ClassModel>('Class', ClassSchema)