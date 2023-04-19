import {Schema, model, Document, Model} from "mongoose";

export interface ITeacher extends Document {
    UserID : Schema.Types.ObjectId
}

interface TeacherModel extends Model<ITeacher> {

}

const TeacherSchema : Schema <ITeacher> = new Schema<ITeacher>({
    UserID : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User",
        unique : true
    }
})

export default model<ITeacher, TeacherModel>("Teacher",TeacherSchema);