import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";
import { Customer } from "./models/Customer";

export class CustomerService{

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/customers"
        });
    }

    
    async getAllCustomers(){
        try {
            const response: AxiosResponse<Customer> = await this.api.get("/getall");
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };
    
    async getCustomerById(staffId: string): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.get(`/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async getCustomerByEmail(email: string): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.get(`/email/${email}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async getCustomerByEmailAndPassword(email, password): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.get(`/email-password`, {
                params: {
                    email: email,
                    password: password
                }
            });
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async getCustomerByUsername(username: string): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.get(`/username/${username}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
    async createCustomer (customer: Customer): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.post("/add", customer);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async updateCustomer (customer: Customer): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.put("/update", customer);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async deleteCustomer (customer: Customer): Promise<Customer>{
        try {
            const response: AxiosResponse<Customer> = await this.api.put("/delete", customer);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
}

export default CustomerService;