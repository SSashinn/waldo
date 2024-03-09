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

export {users};