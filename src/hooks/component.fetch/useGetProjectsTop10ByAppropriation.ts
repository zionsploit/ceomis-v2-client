import useSWR from "swr";
import { fetcher, FetcherType } from "./utils";
import { ResponseProjectsTop10Appropriation } from "@/types/Settings";

function useGetProjectsTop10ByAppropriation(enabled: boolean, request: FetcherType) {
    return useSWR(enabled ?  request : null, fetcher<Array<ResponseProjectsTop10Appropriation>>)
}

export default useGetProjectsTop10ByAppropriation;