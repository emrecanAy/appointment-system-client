import axios, { AxiosInstance } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";

export class PermissionService{
    
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/permissions"
        });
    }

    async getAllByStaff(staffId: string){
        try {
            const response = await this.api.get(`/staff/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async deletePermission(permission){
        try {
            const response = await this.api.put(`/delete`, permission);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }


}