import { Schema, model } from "mongoose";

export interface User {
    id:string;
    email:string;
    name:string;
    address:string;
    password:string;
    isAdmin:boolean;
}

export const userSchema = new Schema<User>(
    {
        email: {type: String, required: true},
        name: {type: String, required: true},
        address: {type: String, required: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, required: false}
    }, {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
)

export const UserModel = model<User>('user', userSchema)