import {checkSchema, validationResult} from "express-validator";
import {signInValidationSchema, userValidationSchema} from "../schemas/userValidationSchema.mjs";

export const validateUserRegistration = [
  checkSchema(userValidationSchema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  }
];

export const validateUserLogIn = [
  checkSchema(signInValidationSchema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  }
];