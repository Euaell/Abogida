import { Request, Response, NextFunction } from "express"
import ClassModel, { IClass } from "../models/ClassModel"

// Admin
export default class ClassController {
	public static async GetClasses(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const Classes: IClass[] = await ClassModel.find()
			return res.status(200).json({ Classes })
		} catch (error) {
			next(error)
		}
	}

	public static async GetClass(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { id } = req.params

			const Class: IClass | null = await ClassModel.findById(id)
			if (Class) {
				return res.status(200).json({ Class })
			} else {
				return res.status(404).json({ message: "Class not found" })
			}
		} catch (error) {
			next(error)
		}
	}

	public static async UpdateClass(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {id} = req.params
			const {ClassName} = req.body

			// TODO: Update Class
			const Class: IClass | null = await ClassModel.findById(id)
			if (Class) {
				return res.status(200).json({message: "Class Not updated!", Class})
			} else {
				return res.status(404).json({message: "Class not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async DeleteClass(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const {id} = req.params
			const Class: IClass | null = await ClassModel.findByIdAndDelete(id)
			if (Class) {
				return res.status(200).json({ Class })
			} else {
				return res.status(404).json({message: "Class not found"})
			}
		} catch (error) {
			next(error)
		}
	}

	public static async CreateClass(req: Request, res: Response, next: NextFunction): Promise<Response> {
		try {
			const { ClassName } = req.body
			if (!ClassName || await ClassModel.findOne({ ClassName }))
				return res.status(400).json({ message: "Invalid Class Name" })

			const Class: IClass = await ClassModel.create({ClassName})
			return res.status(200).json({ Class })
		} catch (error) {
			next(error)
		}
	}
}