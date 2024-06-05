import bcrypt from "bcrypt";

export async function generateHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    return await bcrypt.hash(password, salt); // Hash the password with the salt
}