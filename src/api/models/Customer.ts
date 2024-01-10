import { Gender } from "./enums/Gender";

export interface Customer{
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userName: string;
    password: string;
    gender: Gender;
   
}