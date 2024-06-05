import zod from "zod";
import { allDigits } from "./regex";
import { validateDOB } from "./validateDOB";
import { validatePassword } from "./validatePassword";

export const signUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(16).refine((value) => {
        return validatePassword(value);
      }, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }),
    name: zod.string(),
    age: zod.number().optional(),
    mobileNumber: zod.string().refine((value) => {
        return allDigits.test(value) && value.length===10;
    }),
    dateOfBirth: zod.string().refine((value) => {
        return validateDOB(value)
    })
});