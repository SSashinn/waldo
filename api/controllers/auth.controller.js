import { body, validationResult } from "express-validator";
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

const signUp = [
  // Input Validation
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must not be empty")
    .isAlphanumeric()
    .withMessage("Username must only contain letters or numbers")
    .custom(async (value, req, next) => {
      const username = await User.exists({ username: value });
      // if username is already taken, throw error
      if (username) {
        throw new Error("User already exists");
      };
    }),

  body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Enter a Password"),

  async (req, res, next) => {
    try {
      // Destructuring username and password from body
      const { username, password } = req.body;
      // Check whether the input is valid
      const err = validationResult(req);
      if (!err.isEmpty()) {
        res.status(400).json({
          status: 400,
          errors: err.array(),
        });
        return;
      } else {
        // hash password with salt
        bcryptjs.hash(password, 10, async (err, hashedPassword) => {
          if (err)
            next(err);
          else {
            const newUser = new User({ username, password: hashedPassword });
            try {
              await newUser.save();
              res.status(201).json({
                status: 201,
                message: "User created successfully"
              });
            } catch (error) {
              next(error);
            };
          };
        });
      };
    } catch (error) {
      next(error);
    };
  },
];

const login = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must not be empty")
    .isAlphanumeric()
    .withMessage("Username must only contain letters or numbers"),

  body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Enter a Password"),

  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const validUser = await User.findOne({ username });
      if (!validUser)
        return res.status(404).json({ status: 404, message: `User not found` });
      // Comparing password  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword)
        return res.status(401).json({ status: 401, message: `Invalid Credentials` });

      // Creating a token using jwt
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // We don't want to return password so we create a new object called rest
      const { password: pass, ...rest } = validUser._doc;
      // Saving token to cookie,
      res
        .status(200)
        .json({status: 200, userData: rest, token});
    } catch (error) {
      next(error);
    }
  },
];


export { signUp, login };