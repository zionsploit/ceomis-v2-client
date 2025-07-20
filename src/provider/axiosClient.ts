import axios from "axios";

export const apiURL = process.env.NEXT_PUBLIC_API_URL

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