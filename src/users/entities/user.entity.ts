import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
    _id: string
    @Prop({type: mongoose.Schema.Types.Mixed})
    userDetails: any
}

export const UserSchema = SchemaFactory.createForClass(User);
