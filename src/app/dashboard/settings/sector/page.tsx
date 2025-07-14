import { axiosClient } from "@/provider/axiosClient";
import { ResponseSector } from "@/types/Settings";
import { AxiosResponse } from "axios";
import SectorsTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<Array<ResponseSector>> = await axiosClient(session_data).get("/settings/sector")

    return <SectorsTable sectors={response.data} />
}