import {Schema, model, Document, Model} from "mongoose";

export interface IGrade extends Document {
    ClassID : Schema.Types.ObjectId,
    SubjectID : Schema.Types.ObjectId,
    TeacherID : Schema.Types.ObjectId,
    StudentID : Schema.Types.ObjectId,
    Score : Number
}

interface GradeModel extends Model<IGrade> {

}

const GradeSchema : Schema <IGrade> = new Schema<IGrade>(
    {
        ClassID : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : "Class"
        },
        SubjectID : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : "Subject"
        },
        TeacherID : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : "User"
        },
        StudentID : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : "User"
        },
        Score : {
            type : Number,
            required : true
        }
    },
    {
        timestamps : true
    })

export default model<IGrade, GradeModel>("Grade",GradeSchema)