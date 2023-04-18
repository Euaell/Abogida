import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import configs from "../config/configs"

export enum GenderEnum {
	Male = "male",
	Female = "female"
}

export interface IUser extends Document {
	Username: string
	Email: string
	Password: string

	ComparePassword: (password: string) => Promise<boolean>
	GenerateToken: () => string
}

interface UserModel extends Model<IUser> {
	login(email: string, password: string): any
	findByToken(token: string): IUser | null
}

const UserSchema: Schema<IUser> = new Schema(
	{
		Username: {
			type: String,
			required: true,
			unique: true
		},
		Email: {
			type: String,
			required: true,
			unique: true
		},
		Password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

UserSchema.methods.ComparePassword = async function (password: string) {
	return await bcrypt.compare(password, this.Password)
}

UserSchema.methods.GenerateToken = function () : string {
	return jwt.sign(
		{ id: this._id },
		configs.JWT_SECRET,
		{
			expiresIn: configs.JWT_EXPIRES_IN
		}
	)
}

UserSchema.statics.findByToken = async function (token: string) : Promise<IUser | null> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, configs.JWT_SECRET, (err, decoded) => {
			if (err) {
				reject(err)
			}
			resolve(this.findOne({ _id: decoded.id }))
		})
	})
}

UserSchema.statics.login = async function (email: string, password: string) : Promise<IUser | null> {
	return new Promise((resolve, reject) => {
		resolve(null)
	})
}

UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("Password")) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.Password = await bcrypt.hash(this.Password, salt)
	next()
})

export default model<IUser, UserModel>("User", UserSchema)
