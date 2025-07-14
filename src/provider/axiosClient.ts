import axios from "axios";

export const apiURL = "http://127.0.0.1:3001/api"

export const axiosClient = (headers: { auth: string, sid: string}) => {

    return axios.create({
        baseURL: apiURL,
        timeout: 100000,
        fetchOptions: {
            caches: 'no-store'
        },
        headers: {
            Authorization: `Bearer ${headers.auth}`,
            '_SID': headers.sid
        }
    })
}