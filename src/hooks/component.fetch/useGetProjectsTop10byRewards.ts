import useSWR from "swr";
import { fetcher, FetcherType } from "./utils";
import { ResponseProjectsTop10Awared } from "@/types/Settings";

function useGetProjectsTop10byRewards(enabled: boolean, request: FetcherType) {
    return useSWR(enabled ?  request : null, fetcher<Array<ResponseProjectsTop10Awared>>)
}

export default useGetProjectsTop10byRewards;