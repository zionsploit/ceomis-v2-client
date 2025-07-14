import useSWR from "swr";
import { fetcher, FetcherType } from "./utils";
import { ResponseProjectsSectorWithAppropriation } from "@/types/Settings";

function useGetProjectsAppropriationBySector(enabled: boolean, request: FetcherType) {
    return useSWR(enabled ? request : null, fetcher<Array<ResponseProjectsSectorWithAppropriation>>)
}

export default useGetProjectsAppropriationBySector