import { Request, Response, NextFunction } from "express"
import TeacherModel, { ITeacher } from "../models/TeacherModel"
import GradeModel, { IGrade } from "../models/GradeModel";
import SubjectModel, {ISubject} from "../models/SubjectModel";
import StudentModel, {IStudent} from "../models/StudentModel";
import ClassModel from "../models/ClassModel";
import UserModel, {IUser} from "../models/UserModel";

export default class TeacherController {
	public static async GetTeachers(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const Teachers: ITeacher[] = await TeacherModel.find().populate("UserID", "-Password")
			return res.status(200).json({Teachers})
		} catch (error) {
			next(error)
		}
	}

	public static async GetTeacher(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {id} = req.params

			const teacher: ITeacher | null = await TeacherModel.findById(id)
			if (teacher) {
				return res.status(200).json({Teacher: TeacherModel})
			} else {
				return res.status(404).json({message: "Teacher not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async UpdateTeacher(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {id} = req.params

			const teacher: ITeacher | null = await TeacherModel.findById(id)
			if (teacher) {
				return res.status(200).json({message: "Teacher Not updated!", teacher})
			} else {
				return res.status(404).json({message: "Teacher not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async DeleteTeacher(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {id} = req.params
			const teacher: ITeacher | null = await TeacherModel.findByIdAndDelete(id)
			if (teacher) {
				return res.status(200).json({teacher})
			} else {
				return res.status(404).json({message: "Teacher not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async CreateGrade(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Score, SubjectName, StudentID, ClassName, user } = req.body

			const teacher: ITeacher | null = await TeacherModel.findOne({UserID: user._id})
			if (teacher) {
				const studentUser: IUser | null = await UserModel.findOne({ ID: StudentID })
				if (!studentUser) {
					return res.status(404).json({message: "Student User not found"})
				}
				const student: IStudent | null = await StudentModel.findOne({UserID: studentUser._id})
				if (!student) {
					return res.status(404).json({message: "Student not found"})
				}
				const subject: ISubject | null = await SubjectModel.findOne({Name: SubjectName})
				if (!subject) {
					return res.status(404).json({message: "Subject not found"})
				}
				const gradeClass: IGrade | null = await ClassModel.findOne({ ClassName })
				if (!gradeClass) {
					return res.status(404).json({message: "Class not found"})
				}
				const grade: IGrade = await GradeModel.create({
					Score,
					SubjectID: subject._id,
					StudentID: student._id,
					TeacherID: teacher._id,
					ClassID: gradeClass._id
				})
				return res.status(200).json({ grade })
			} else {
				return res.status(404).json({message: "Teacher not found"})
			}
		} catch (error) {
			next(error)
		}
	}
}