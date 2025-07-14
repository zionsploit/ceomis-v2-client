import { axiosClient } from "@/provider/axiosClient";

export type FetcherType = {
    url: string,
    headers: {
        auth: string,
        sid: string
    }
}

export const fetcher = <T>(request: FetcherType): Promise<T> => axiosClient({auth: request.headers.auth, sid: request.headers.sid}).get(request.url).then(res => res.data)