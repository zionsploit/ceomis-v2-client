import useSWR from "swr";
import { fetcher, FetcherType } from "./utils";
import { ResponseProjectsStatsTypes } from "@/types/Settings";


function useGetProjectsStatsTypes(enabled: boolean, request: FetcherType) {
    return useSWR(enabled ?  request: null, fetcher<Array<ResponseProjectsStatsTypes>>)
}

export default useGetProjectsStatsTypes;