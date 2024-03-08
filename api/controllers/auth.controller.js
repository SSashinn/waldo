import { body, validationResult } from "express-validator";
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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
          username,
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
              res.status(201).json({message: "User created successfully"});
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

export {signUp};