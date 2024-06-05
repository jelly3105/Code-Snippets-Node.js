import zod from "zod";

export const signUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(16).refine((value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
      }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    name: zod.string(),
    age: zod.number().optional(),
    mobilenumber: zod.string().refine((value) => {
        return /^[0-9]+$/.test(value) && value.length===10;
    }),
    dateOfBirth: zod.string().refine((value) => {
        // Check if the format is correct using a regular expression dd-mm-yyyy.
        const dateFormat = /^\d{2}-\d{2}-\d{4}$/.test(value);
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