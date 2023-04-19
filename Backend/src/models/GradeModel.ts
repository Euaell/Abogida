import { Schema, model, Document } from "mongoose";

export interface IGrade extends Document {
    Year : String,
    // TeacherID : Schema.Types.ObjectId,
    StudentID : Schema.Types.ObjectId,
    Score : Number
}

const GradeSchema : Schema <IGrade> = new Schema<IGrade>({

    Year : {
        type : String,
        required : true
    },

    StudentID : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "Student"
    },

    Score : {
        type : Number,
        required : true
    }

})

export default model<IGrade>("Grade",GradeSchema)