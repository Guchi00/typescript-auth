import UserSchema  from "../models/auth.schema";

export type RegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age?: number;
}

export type LoginType = {
    email: string;
}

export const register = (body: RegisterType) => {
    return UserSchema.create(body)
}

export const findByEmail = (userLogin: LoginType) => {
    return UserSchema.findOne(userLogin);
}

