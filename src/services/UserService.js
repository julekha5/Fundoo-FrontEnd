import AxiosService from '../services/AxiosService';

const baseURL = "http://localhost:8080";

// const header = {
//     headers: {
//         token: localStorage.getItem('token')
//     }
// }


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

    // verfiyToken() {
    //     return (
    //         this.axiosService.get(`${baseURL}/user/verify`, header)
    //     )
    // }


    // /* Note service */
    // addNote(data) {
    //     return (
    //         this.axiosService.post(`${baseURL}/create`, header, data)
    //     )
    // }


    // updateNote(data) {
    //     console.log(data);
    //     return (
    //         this.axiosService.put(`${baseURL}/update`, header, data)
    //     )
    // }

    // deleteNote(data) {
    //     return (
    //         this.axiosService.delete(`${baseURL}/delete/id`, header, data)
    //     )
    // }

    // archiveNote(data) {
    //     return (
    //         this.axiosService.get(`${baseURL}/isArchive`, header, data)
    //     )
    // }

    // getAllNotes(data) {
    //     return (
    //         this.axiosService.get(`${baseURL}/allNote`, header, data)
    //     )
    // }

}