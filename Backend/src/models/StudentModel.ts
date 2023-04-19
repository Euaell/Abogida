import { Schema, model, Document } from "mongoose";
export enum GenderEnum {
    Male = "male",
    Female = "female"
}


export interface IStudent extends Document {

    Section : String,
    Year : number,
    Uid : Schema.Types.ObjectId

}

const StudentSchema : Schema <IStudent> = new Schema<IStudent>({

    Section : {
        type : String,
        required : true
    },

    Year : {

        type : Number,
        required : true
    },

    Uid : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "User",
        unique: true
    }

    }
)

export default model<IStudent>("Student",StudentSchema)

