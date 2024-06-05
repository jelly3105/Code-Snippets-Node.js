import { upperCase, lowerCase, digit, specialCharacters } from "./regex";

export function validatePassword(value:string) {
    const hasUpperCase = upperCase.test(value);
    const hasLowerCase = lowerCase.test(value);
    const hasDigit = digit.test(value);
    const hasSpecialChar = specialCharacters.test(value);
    return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}