import zod from "zod";
import { allDigits, dateFormatDDMMYYYY, digit, lowerCase, specialCharacters, upperCase } from "./regex";

export const signUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(16).refine((value) => {
        const hasUpperCase = upperCase.test(value);
        const hasLowerCase = lowerCase.test(value);
        const hasDigit = digit.test(value);
        const hasSpecialChar = specialCharacters.test(value);
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
      }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    name: zod.string(),
    age: zod.number().optional(),
    mobilenumber: zod.string().refine((value) => {
        return allDigits.test(value) && value.length===10;
    }),
    dateOfBirth: zod.string().refine((value) => {
        // Check if the format is correct using a regular expression dd-mm-yyyy.
        const dateFormat = dateFormatDDMMYYYY.test(value);
        // parse the date
        const [day, month, year] = value.split("-").map(Number);
        // Check if the date is valid
        const dob = new Date(year, month - 1, day); // month is 0-based in JS Date
        if (dob.getFullYear() !== year || dob.getMonth() !== month - 1 || dob.getDate() !== day) {
            return false;
        }

        // Check if the date is less than today
        const today = new Date();
        if (dob >= today) {
            return false;
        }
        return dateFormat;
    })
});