import useSWR from "swr";
import { fetcher, FetcherType } from "./utils";
import { ResponseProjectsStatsCategory } from "@/types/Settings";

// 

function useGetProjectsStatsCategory(enabled: boolean, request: FetcherType) {
    return useSWR(enabled ?  request: null, fetcher<Array<ResponseProjectsStatsCategory>>)   
}

export default useGetProjectsStatsCategory;