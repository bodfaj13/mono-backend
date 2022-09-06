import mongoose from '../config/mongoose';
import paginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

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
  dateLinked: Number
});

accountSchema.plugin(paginate);

const Accounts: any = mongoose.model('accounts', accountSchema);

export default Accounts;