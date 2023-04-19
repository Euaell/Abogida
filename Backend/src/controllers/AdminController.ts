import { Request, Response, NextFunction } from "express";
import AdminModel, { IAdmin } from "../models/AdminModel";
import UserModel, { IUser, roleEnum } from "../models/UserModel";
import TeacherModel, {ITeacher} from "../models/TeacherModel";
import StudentModel, {IStudent} from "../models/StudentModel";

export class AdminController {
	public static async GetAdmins(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const Admins: IAdmin[] = await AdminModel.find().populate("UserID", "-Password")
			return res.status(200).json({ Admins })
		} catch (error) {
			next(error)
		}
	}

	public static async GetAdmin(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params

			const admin: IAdmin | null = await AdminModel.findById(id)
			if (admin) {
				return res.status(200).json({ Admin: AdminModel })
			} else {
				return res.status(404).json({ message: "Admin not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async UpdateAdmin(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params

			const admin: IAdmin | null = await AdminModel.findById(id)
			if (admin) {
				// TODO: Update admin
				return res.status(200).json({ message: "Admin Not updated!", admin })
			} else {
				return res.status(404).json({ message: "Admin not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async DeleteAdmin(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const admin: IAdmin | null = await AdminModel.findByIdAndDelete(id)
			if (admin) {
				return res.status(200).json({ admin })
			} else {
				return res.status(404).json({ message: "Admin not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async CreateAdmin(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { ID, Name, Password } = req.body

			if (await UserModel.findOne({ ID }))
				return res.status(400).json({ message: "User already exists" })

			const newUser: IUser = await UserModel.create({ ID, Name, Password, role: roleEnum.Admin })
			const admin: IAdmin = await AdminModel.create({ UserID: newUser._id })

			return res.status(200).json({ message: "Admin created", admin })
		} catch (error) {
			next(error)
		}
	}

	public static async CreateTeacher(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { ID, Name, Password } = req.body

			if (await UserModel.findOne({ ID }))
				return res.status(400).json({ message: "User already exists" })

			const newUser: IUser = await UserModel.create({ ID, Name, Password, role: roleEnum.Teacher })
			const teacher: ITeacher = await TeacherModel.create({ UserID: newUser._id })

			return res.status(200).json({ message: "Teacher created", teacher })
		} catch (error) {
			next(error)
		}
	}

	public static async CreateStudent(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { ID, Name, Password } = req.body

			if (await UserModel.findOne({ ID }))
				return res.status(400).json({ message: "User already exists" })

			const newUser: IUser = await UserModel.create({ ID, Name, Password, role: roleEnum.Student })
			const student: IStudent = await StudentModel.create({ UserID: newUser._id })

			return res.status(200).json({ message: "Student created", student })

		} catch (error) {
			next(error)
		}
	}
}