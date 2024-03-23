import Char from "../models/char.model.js";
import User from "../models/user.model.js";

const users = async (req, res, next) => {
  try {
    const foundUsers = await User.find().sort('highScore').limit(10).exec();
    const formattedUsers = foundUsers.map(user => {
      const { username, highScore, _id } = user;
      return { username, highScore, _id };
    });
    res.status(200).json(
      {
        users: formattedUsers,
      });
  } catch (error) {
    next(error);
  };
};

const makeChar = async (req, res, next) => {
  const { name, xPercent, yPercent } = req.body;
  try {
    const newChar = new Char({ name, xPercent, yPercent });
    await newChar.save();
    res.status(201).json({
      status: 201,
      message: "Character created successfully"
    });
  } catch (error) {
    next(error);
  }
};

const getChar = async (req, res, next) => {
  try {
    const chars = await Char.find().exec();
    const formattedChar = chars.map(char => {
      const { name, _id, imgUrl } = char;
      return { name, imgUrl, _id };
    });
    res.status(200).json({ chars: formattedChar });
  } catch (error) {
    next(error);
  }
};

const verifyCoordinate = async (req, res, next) => {
  try {
    const { name, xPercent, yPercent } = req.body;
    const nameData = await Char.findOne({ name }).exec();
    if (!nameData)
      res.status(400).json({ status: 400, error: "Invalid Character" })
    if ((xPercent <= nameData.xPercent + 2 && xPercent >= nameData.xPercent - 2) && (yPercent <= nameData.yPercent + 3 && yPercent >= nameData.yPercent - 3))
      res.status(200).json({ status: 200, message: 'Correct'});
    else
      res.status(400).json({ status: 400, message: 'Incorrect'});
  } catch (error) {
    next(error);
  }
};

const updateScore = async(req, res, next) => {
  try {
    const {highScore, _id} = req.body;
    const user = await User.findByIdAndUpdate(_id, {highScore}, {new: true}).exec();
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
export { users, makeChar, getChar, verifyCoordinate, updateScore };