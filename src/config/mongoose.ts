import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL || '')

export default mongoose