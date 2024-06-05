import mongoose from "mongoose";
import { allDigits, email } from "../validations/regex";
import { validateDOB } from "../validations/validateDOB";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function(value:any) {
              // Regular expression to validate email format
              return email.test(value);
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    mobilenumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
          validator: function(value:any) {
            // Regular expression to validate mobile number (10 digits)
            return allDigits.test(value);
          }
        }
    },
    dateofbirth: {
        type: String,
        required: [true, 'Date of birth is required'],
        validate: {
          validator: function(value:string) {
            return validateDOB(value);
          }
        }
      }    
});

export const User = mongoose.model("User", userSchema);