import axios, { AxiosInstance } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";

export class StaffConfigService{

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/staffconfigs"
        });
    }

    
    async getAllStaffConfigs(){
        try {
            const response = await this.api.get("/getall");
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };
    
    async getStaffConfigById(staffConfigId: string){
        try {
            const response = await this.api.get(`/${staffConfigId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
    async createStaffConfig (staffConfig){
        try {
            const response = await this.api.post("/add", staffConfig);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async updateStaffConfig (staffConfig){
        try {
            const response = await this.api.put("/update", staffConfig);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async deleteStaffConfig (staffConfig){
        try {
            const response= await this.api.put("/delete", staffConfig);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
}

export default StaffConfigService;