import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";
import { CareService } from "./models/CareService";

export class CareServiceService{

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/care-services"
        });
    }

    
    async getAllCareServices(){
        try {
            const response: AxiosResponse<CareService> = await this.api.get("/getall");
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };
    
    async getCareServiceById(careServiceId: string): Promise<CareService>{
        try {
            const response: AxiosResponse<CareService> = await this.api.get(`/${careServiceId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
    async createCareService (careService: CareService): Promise<CareService>{
        try {
            const response: AxiosResponse<CareService> = await this.api.post("/add", careService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async updateCareService (careService: CareService): Promise<CareService>{
        try {
            const response: AxiosResponse<CareService> = await this.api.put("/update", careService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async deleteCareService (careService: CareService): Promise<CareService>{
        try {
            const response: AxiosResponse<CareService> = await this.api.put("/delete", careService);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }
    
}

/*
    DELETE isteği url'de yanlış gidiyor. ...8080// tek / olması gerekirken 2 tane // var.

*/

export default CareServiceService;