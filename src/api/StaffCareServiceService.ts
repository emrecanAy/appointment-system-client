import axios, { AxiosInstance } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";

export class StaffCareServiceService{

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/staffcareservices"
        });
    }

    async getAll(){
        try {
            const response = await this.api.get(`/getall`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getAllByStaff(staffId: string){
        try {
            const response = await this.api.get(`/getallbystaff/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async createStaffCareService (staffCareService){
        try {
            const response = await this.api.post("/add", staffCareService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async updateStaffCareService (staffCareService){
        try {
            const response = await this.api.put("/update", staffCareService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async deleteStaffCareService (staffCareService){
        try {
            const response = await this.api.put("/delete", staffCareService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }



}

export default StaffCareServiceService;