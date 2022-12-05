import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Client',
  },
  donor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Client',
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.model('Transaction', transactionSchema);
