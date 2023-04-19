import { Schema, model, Document } from "mongoose";

export interface ITeacher extends Document{

    Uid : Schema.Types.ObjectId
}

const TeacherSchema : Schema <ITeacher> = new Schema<ITeacher>({

    Uid : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User",
        unique : true
    }

})

export default model<ITeacher>("Teacher",TeacherSchema);