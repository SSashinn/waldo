import Char from "../models/char.model.js";
import User from "../models/user.model.js";

const users = async(req, res, next) =>{
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

const makeChar = async(req,res,next) => {
  const {name, xPercent, yPercent} = req.body;
  try {
    const newChar = new Char({name, xPercent, yPercent});
    await newChar.save();
    res.status(201).json({
      status:201,
      message: "Character created successfully"
    });
  } catch (error) {
    next(error);
  }
};

const getChar = async(req, res,next) => {
  try {
    const chars = await Char.find().exec();
    const formattedChar = chars.map(char => {
      const { name, _id } = char;
      return {name, _id};
    });
    res.status(200).json({chars: formattedChar});
  } catch(error) {
    next(error);
  }
}

export {users, makeChar, getChar};