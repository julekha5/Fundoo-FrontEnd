import AxiosService from '../services/AxiosService';

const baseURL = "http://localhost:8080";

const token = localStorage.getItem('token');

export class UserService {

    axiosService = new AxiosService();

    register(data) {
        return (
            this.axiosService.post(`${baseURL}/user`, data, ''));
    }

    login(data) {
        return (
            this.axiosService.post(`${baseURL}/user/login`, data, ''));
    }

    forgotPassword(data) {
        return (
            this.axiosService.post(`${baseURL}/user/forgot_password`, data, ''));
    }

    resetPassword(data,token) {
        return (
            this.axiosService.put(`${baseURL}/user/reset_password/`+token, data, ''));
    }

    verfiyToken() {
        return (
            this.axiosService.get(`${baseURL}/user/verify`, {token})
        )
    }
    
     /* Note service */

    addNote(data) {
        return (
            this.axiosService.post(`${baseURL}/note/create`, data, {token})
        )
    }

    getAllNotes(archive, trash) { 
        return (  
            this.axiosService.get(`${baseURL}/note/allNote?isArchive=${archive}&isTrash=${trash}`, {token})           
        )
    }

    updateNote(data) {
        console.log(data);
        return (
            this.axiosService.put(`${baseURL}/note/update`, data, {token})
        )
    }

     archiveNote(noteId) {
        console.log(noteId);
        return (
            this.axiosService.get(`${baseURL}/note/isArchive?noteId=${noteId}`,{token})
        )
    }

    deleteNote(noteId){
        console.log(noteId);
        return (
            this.axiosService.delete(`${baseURL}/note/delete?noteId=${noteId}`,{token})
        )

    }
    
}