import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";
import { Staff } from "./models/Staff";

export class CareServiceService{

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/staff"
        });
    }

    
    async getAllStaff(){
        try {
            const response: AxiosResponse<Staff> = await this.api.get("/getall");
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getAllStaffByCareService(careServiceId){
        try {
            const response: AxiosResponse<Staff> = await this.api.get(`/getall/${careServiceId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };
    
    async getStaffById(staffId: string): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.get(`/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async getStaffByEmail(email: string): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.get(`/email/${email}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async getStaffByEmailAndPassword(email, password): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.get(`/email-password`, {
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
    
    async createStaff (staff: Staff): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.post("/add", staff);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async updateStaff (staff: Staff): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.put("/update", staff);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async deleteStaff (staff: Staff): Promise<Staff>{
        try {
            const response: AxiosResponse<Staff> = await this.api.put("/delete", staff);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
}

export default CareServiceService;