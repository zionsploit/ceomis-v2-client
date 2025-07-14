import { axiosClient } from "@/provider/axiosClient";
import { ResponseProjectsByFund } from "@/types/Settings";
import { AxiosResponse } from "axios";
import PageTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const get_auth = await get_auth_session(cookies)

    if (get_auth == null) {
        redirect('/')
    }

    const response: AxiosResponse<Array<ResponseProjectsByFund>> = await axiosClient(get_auth).get("/projects/get-by-fund/0")

    return <PageTable projects={response.data} />

}