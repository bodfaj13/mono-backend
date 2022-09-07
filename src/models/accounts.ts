import mongoose from '../config/mongoose';
import paginate from 'mongoose-paginate-v2';
import { userInterface } from './users';
const Schema = mongoose.Schema;

export interface accountInterface extends mongoose.Document {
  userId: userInterface['_id'],
  accountId: string,
  isLinked: boolean,
  dataStatus: string,
  authMethod: string,
  accountName: string,
  currency: string,
  accountType: string,
  accountNumber: string,
  balance: number,
  bvn: string,
  bankName: string,
  bankCode: string,
  bankType: string,
  dateLinked: number,
  reauthorisationRequired: boolean,
  reauthorisationToken: string,
}

const accountSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  accountId: String,
  isLinked: {
    type: Boolean,
    default: true
  },
  dataStatus: String,
  authMethod: String,
  accountName: String,
  currency: String,
  accountType: String,
  accountNumber: String,
  balance: Number,
  bvn: String,
  bankName: String,
  bankCode: String,
  bankType: String,
  dateLinked: Number,
  reauthorisationRequired: {
    type: Boolean,
    default: false
  },
  reauthorisationToken: String,
});

accountSchema.plugin(paginate);

const Accounts = mongoose.model<
  userInterface,
  mongoose.PaginateModel<userInterface>
>('Accounts', accountSchema, 'accounts');

export default Accounts;