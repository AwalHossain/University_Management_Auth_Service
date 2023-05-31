import { Model, Schema, model } from 'mongoose'
import { Iuser } from './users.interface'

type UserModel = Model<Iuser, object>

const userSchema = new Schema<Iuser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<Iuser, UserModel>('User', userSchema)
