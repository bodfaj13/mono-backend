import { comparePasswordInterface, createUserInterface, DocumentUpdate } from "../utils/helper-interface";
import moment from "moment"
import bcrypt from 'bcryptjs';
import Users from "../models/users";

const checkEmailAddress = async ({ email }: { email: string }) => {
  return await Users.findOne({ email });
}

const createUser = async ({ email, password, firstName, lastName }: createUserInterface) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await Users.create({ firstName, lastName, email, password: hashedPassword, createdAt: moment() });
}

const comparePassword = async ({ password, hashedPassword }: comparePasswordInterface) => {
  return await bcrypt.compare(password, hashedPassword)
}

const getUserById = async ({ id }: { id: string }) => {
  return await Users.findOne({ _id: id });
}

const updateUser = ({ _id, update }: DocumentUpdate) => {

  return Users.findOneAndUpdate({ _id }, {
    $set: {
      ...update
    }
  }, {
    new: true
  })
}

const usersService = {
  checkEmailAddress,
  createUser,
  comparePassword,
  getUserById,
  updateUser
}

export default usersService
