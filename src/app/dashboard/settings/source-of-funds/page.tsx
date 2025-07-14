import { axiosClient } from "@/provider/axiosClient"
import { ResponseSourceOfFunds } from "@/types/Settings"
import { AxiosResponse } from "axios"
import SofTable from "./page.table"
import { get_auth_session } from "@/utils/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const get_data: AxiosResponse<Array<ResponseSourceOfFunds>> = await axiosClient(session_data).get("/settings/sof")

    return <SofTable sof={get_data.data} />
}