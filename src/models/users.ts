import mongoose from '../config/mongoose';
import paginate from 'mongoose-paginate-v2';
import validator from 'validator';

export interface userInterface extends mongoose.Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isActive: boolean,
  userLevel: number,
  createdAt: number
}


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: [true, 'Email already taken'],
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Invalid email address provided']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userLevel: {
    type: Number,
    default: 0
  },
  createdAt: Number
});

userSchema.plugin(paginate);

const Users = mongoose.model<
  userInterface,
  mongoose.PaginateModel<userInterface>
>('Users', userSchema, 'users');

export default Users;