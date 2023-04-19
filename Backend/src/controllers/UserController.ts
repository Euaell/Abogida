import { Request, Response, NextFunction } from 'express'
import User, { IUser } from "../models/UserModel"
import UnverifiedUserModel, {IUnverifiedUser} from "../models/UnverifiedUserModel";

export default class UserController {
	public static async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const user: IUser[] = await User.find()
			return res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}

	public static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const user: IUser | null = await User.findById(req.params.id)
			if (user) {
				return res.status(200).json({ user })
			} else {
				return res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Username, Email, Password, verificationCode } = req.body

			const unverifiedUser: IUnverifiedUser | null = await UnverifiedUserModel.findOne({ email: Email })
			if (unverifiedUser) {
				const authMessage: string = await unverifiedUser.verifyCode(verificationCode)
                if (authMessage !== "Success") {
                    return res.status(400).json({verificationCode: authMessage})
                }
                await UnverifiedUserModel.findByIdAndDelete(unverifiedUser._id)

				// check if user exists
				const eUser : IUser | null = await User.findOne({ Email })
				const uUser : IUser | null = await User.findOne({ Username })
				if (eUser) {
					return res.status(400).json({ Email: "Email already exists" })
				}
				if (uUser) {
					return res.status(400).json({ Username: "Username already exists" })
				}

				const user: IUser = await User.create({ Username, Email, Password })
				return res.status(201).json({ user })
			} else {
				return res.status(404).json({ message: "User not found" })
			}

		} catch (error) {
			next(error)
		}
	}

	public static async loginUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { ID, Password } = req.body
			const user: IUser | null = await User.findOne({ ID })
			if (!user) {
				return res.status(404).json({ Email: "Email not found" })
			}
			const authMessage: boolean = await user.ComparePassword(Password)
			if (!authMessage) {
				return res.status(400).json({ Password: "Password is incorrect" })
			}

			const userObj: any = user.toObject()
			delete userObj.Password

			const token: string = user.GenerateToken()
			res.cookie('token', token, { httpOnly: true })
			return res.status(200).json({ message: "Login successful", user: userObj, token })

		} catch (error) {
			next(error)
		}
	}

	public static async logoutUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			res.clearCookie('token')
			return res.status(200).json({ message: "Logout successful" })
		} catch (error) {
			next(error)
		}
	}

	public static async verifyUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { user } = req.body
			return res.status(200).json({ message: "User verified", user })
		} catch (error) {
			next(error)
		}
	}

	public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const { Username, Password } = req.body


			const user: IUser | null = await User.findById(id)
			if (user) {
				if (Username) user.ID = Username
				if (Password) user.Password = Password

				await user.save()
				return res.status(200).json({ user })
			} else {
				return res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const user: IUser | null = await User.findByIdAndDelete(id)
			if (user) {
				return res.status(200).json({ user })
			} else {
				return res.status(404).json({ message: "User not found" })
			}
		} catch (error) {
			next(error)
		}
	}
}