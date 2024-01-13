import axios, { AxiosInstance } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";

export class PermissionService{
    
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/permissions"
        });
    }

    async getAllPermissions(){
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
            const response = await this.api.get(`/staff/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getAllAcceptedPermissionsByStaff(staffId: string){
        try {
            const response = await this.api.get(`/getallaccepted/staff/${staffId}`);
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

    async setStatusAccepted(permission){
        try {
            const response = await this.api.put(`/setAccepted`, permission);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setStatusWaiting(permission){
        try {
            const response = await this.api.put(`/setWaiting`, permission);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setStatusDeclined(permission){
        try {
            const response = await this.api.put(`/setDeclined`, permission);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setStatusCancelled(permission){
        try {
            const response = await this.api.put(`/setCancelled`, permission);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }


}

export default PermissionService;