import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  CPF: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('Client', clientSchema);
