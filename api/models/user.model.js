import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  highScore: {type: Date, default: () => new Date().setHours(0,0,0,0) },
});

const User = mongoose.model('User', UserSchema);

export default User;