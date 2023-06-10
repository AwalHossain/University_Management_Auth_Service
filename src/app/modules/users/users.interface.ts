import { Model } from 'mongoose'

export type Iuser = {
  id: string
  role: string
  password: string
}

export type UserModel = Model<Iuser, Record<string, unknown>>
