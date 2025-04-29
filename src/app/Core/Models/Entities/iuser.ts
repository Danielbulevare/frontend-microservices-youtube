import { ERole } from "../Enums/e-role";

export interface IUser {
    id?: string;
    name: string;
    surnames: string;
    userName: string;
    email: string;
    password: string;
    role: ERole    
}
