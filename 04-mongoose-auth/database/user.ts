import { User } from "../schema/user"
import { UserType } from "../types";

export const findUserByEmail = async (email:string) => {
    let user;
    try{
        user = await User.findOne({email});
    }catch(e:any) {
        console.log(`Error while finding user by email : ${e}`)
        throw new Error(e);
    }
    return user;
}

export const saveUser = async (userData:UserType) => {
    let user;
    try {
        user = new User(userData);
        await user.save();
    }catch(e:any) {
        console.log(`Error while saving user : ${e}`)
        throw new Error(e);
    }
    return user;
}