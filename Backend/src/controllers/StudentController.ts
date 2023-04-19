import { Request, Response, NextFunction } from "express"
import StudentModel from "../models/StudentModel";
import GradeModel from "../models/GradeModel";

export class StudentController {

    public static getGrade(req : Request,res: Response){

        const studentId = req.body.user
        StudentModel.findById(studentId).then((result)=>{

            if (result != null){
                return result._id
            }
            else{
                throw new Error(" Studetn not found")
            }
        })
            .then((Id) => {
                GradeModel.find({StudentID : Id}).then((result)=>{

                    res.status(200).send(result)

                })
            }).catch(err =>{
                res.status(501).send(err.message)
        })


    }





}
