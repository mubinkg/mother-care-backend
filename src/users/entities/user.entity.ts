import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { type } from "os";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
    @Prop({type: mongoose.Schema.Types.Mixed})
    userDetails: any
}

export const UserSchema = SchemaFactory.createForClass(User);
