import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  highScore: {type: Number, default: 99999999 },
});

const User = mongoose.model('User', UserSchema);

export default User;