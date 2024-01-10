import axios, { AxiosInstance } from "axios";
import apiConfiguration from "../global/apiConfiguration.json";

export class AppointmentService{
    
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: apiConfiguration.API_BASE_URL + "/api/appointments"
        });
    }

    async getAllAppointments(){
        try {
            const response = await this.api.get("/getall");
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getAllAcceptedAppointmentsByStaff(staffId: string){
        try {
            const response = await this.api.get(`/getallaccepted/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getAllAcceptedAndWaitingAppointmentsByStaff(staffId: string){
        try {
            const response = await this.api.get(`/getallwaitingandaccepted/staff/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    };

    async getTotalEarningsByStaff(staffId: string){
        try {
            const response = await this.api.get(`/check-total-earning/${staffId}`);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setAppointmentAccepted(appointment){
        try {
            const response = await this.api.put(`/setstatusaccepted`, appointment);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setAppointmentWaiting(appointment){
        try {
            const response = await this.api.put(`/setstatuswaiting`, appointment);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setAppointmentDeclined(appointment){
        try {
            const response = await this.api.put(`/setstatusdeclined`, appointment);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

    async setAppointmentCancelled(appointment){
        try {
            const response = await this.api.put(`/setstatuscancelled`, appointment);
            return response.data;
        } catch (error) {
            console.log("API error: ", error);
            throw error;
        }
    }

}

export default AppointmentService;