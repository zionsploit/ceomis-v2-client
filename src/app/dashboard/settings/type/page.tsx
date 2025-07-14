import { axiosClient } from "@/provider/axiosClient";
import TypeTable from "./page.table";
import { AxiosResponse } from "axios";
import { ResponseTypes } from "@/types/Settings";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<Array<ResponseTypes>> = await axiosClient(session_data).get("/settings/type")



    return <TypeTable stypes={response.data} />
}