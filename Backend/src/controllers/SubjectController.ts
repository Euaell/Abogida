import { Request, Response, NextFunction } from "express"
import SubjectModel, { ISubject } from "../models/SubjectModel"

export default class SubjectController {
	public static async GetSubjects(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const subjects: ISubject[] = await SubjectModel.find()
			return res.status(200).json({ subjects })
		} catch (error) {
			next(error)
		}
	}

	public static async GetSubject(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const subject: ISubject = await SubjectModel.findById(id)
			if (subject) {
				return res.status(200).json({ subject })
			} else {
				return res.status(404).json({ message: "Subject not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async UpdateSubject(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params

			// TODO: Update subject
			return res.status(200).json({ message: "Subject Not updated!" })
		} catch (error) {
			next(error)
		}
	}

	public static async DeleteSubject(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params
			const subject: ISubject = await SubjectModel.findByIdAndDelete(id)
			if (subject) {
				return res.status(200).json({ subject })
			} else {
				return res.status(404).json({ message: "Subject not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async CreateSubject(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { Name } = req.body
			const subject: ISubject = await SubjectModel.create({ Name })
			return res.status(201).json({ subject })
		} catch (error) {
			next(error)
		}
	}
}