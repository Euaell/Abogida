import { Request, Response, NextFunction } from "express"
import StudentModel from "../models/StudentModel";
import GradeModel from "../models/GradeModel";

export default class StudentController {
    public static async GetStudents(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const students = await StudentModel.find().populate("UserID", "-Password").populate("Class", "ClassName")
            return res.status(200).json({ students })
        } catch (error) {
            next(error)
        }
    }

    public static async GetStudent(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params

            const student = await StudentModel.findById(id).populate("UserID", "-Password")
            if (student) {
                return res.status(200).json({ student })
            } else {
                return res.status(404).json({ message: "Student not found" })
            }
        } catch (error) {
            next(error)
        }
    }

    public static async UpdateStudent(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params

            const student = await StudentModel.findById(id)
            if (student) {
                return res.status(200).json({ message: "Student Not updated!", student })
            } else {
                return res.status(404).json({ message: "Student not found" })
            }
        } catch (error) {
            next(error)
        }
    }

    public static async DeleteStudent(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params
            const student = await StudentModel.findByIdAndDelete(id)
            if (student) {
                return res.status(200).json({ student })
            } else {
                return res.status(404).json({ message: "Student not found" })
            }
        } catch (error) {
            next(error)
        }
    }

    public static async GetStudentGrades(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { user } = req.body
            const { classID } = req.query

            const filter = { StudentID: user._id }
            if (classID) {
                filter["ClassID"] = classID
            }

            const grades = await GradeModel.find(filter).populate("ClassID", "Name")
            if (grades) {
                return res.status(200).json({ grades })
            } else {
                return res.status(404).json({ message: "Grades not found" })
            }
        } catch (error) {
            next(error)
        }
    }
}
