import mongoose from 'mongoose';

const { Schema } = mongoose;

const bannedUserSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bannedBy: {
    type: String,
    required: true,
  },
  bannedAt: {
    type: Date,
    default: Date.now,
  },
});

const BannedUser = mongoose.model('BanUser', bannedUserSchema);

export default BannedUser;
