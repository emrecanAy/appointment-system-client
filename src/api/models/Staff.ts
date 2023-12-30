import { Gender } from "./enums/Gender";
import { Role } from "./enums/Role";

export interface Staff{
    staffId: string;
    role: Role;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    userName: string;
    password: string;
}