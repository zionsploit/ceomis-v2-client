import { apiURL } from "@/provider/axiosClient";
import useSWR from "swr";
import { fetcher } from "./utils";
import { ResponseProjectInfraCode } from "@/types/Settings";

function useGetProjectsInfraCodeByProjectsId(enabled: boolean, projects_id: number) {
    return useSWR(enabled ? `${apiURL}/projects/get-infra-code-by-project-id/${projects_id}` : null, fetcher<ResponseProjectInfraCode>)
}

export default useGetProjectsInfraCodeByProjectsId