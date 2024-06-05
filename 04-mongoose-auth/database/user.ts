import { User } from "../schema/user"

export const findUserByEmail = async (email:string) => {
    let user;
    try{
        user = User.findOne({email});
    }catch(e) {
        console.log(`Error while finding user by email : ${e}`)
    }
    return user;
}