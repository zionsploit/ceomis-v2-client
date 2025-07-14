import { axiosClient } from "@/provider/axiosClient";
import { ResponseProjectsByFund } from "@/types/Settings";
import { AxiosResponse } from "axios";
import PageTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

    const session_auth = await get_auth_session(cookies)

    if (session_auth == null) {
        redirect('/')
    }

    const response: AxiosResponse<Array<ResponseProjectsByFund>> = await axiosClient(session_auth).get("/projects/get-by-fund/18")

    return <PageTable projects={response.data} />

}