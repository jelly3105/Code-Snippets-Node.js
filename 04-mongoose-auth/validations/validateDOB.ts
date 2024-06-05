import { dateFormatDDMMYYYY } from "./regex";

export function validateDOB(value: string) {
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
}