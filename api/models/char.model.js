import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CharSchema = new Schema({
  name: {type: String, required: true},
  xPercent: {type: Number, required: true},
  yPercent: {type: Number, required: true},
});

const Char = mongoose.model('Char', CharSchema);

export default Char;

