import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  highScore: {type: Number, default: 0 },
});

const User = mongoose.model('User', UserSchema);

export default User;