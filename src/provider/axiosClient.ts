import axios from "axios";

export const apiURL = process.env.NEXT_PUBLIC_API_URL
export const apiDockerURL = process.env.NEXT_PUBLIC_DOCKER_API_URL

export type AxiosClientRequestHeaders = { auth: string, sid: string}

export const axiosClient = (headers: AxiosClientRequestHeaders) => {

    const instance = axios.create({
        baseURL: apiDockerURL,
        timeout: 100000,
        fetchOptions: {
            caches: 'no-store'
        },
        headers: {
            Authorization: `Bearer ${headers.auth}`,
            '_SID': headers.sid
        },
    })

    return instance
}