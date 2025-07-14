"use server"

import SdgTable from "./page.table"
import { axiosClient } from "@/provider/axiosClient"
import { ResponseSustainableDevelopmentGoals } from "@/types/Settings"
import { get_auth_session } from "@/utils/helper"
import { AxiosResponse } from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const get_data: AxiosResponse<Array<ResponseSustainableDevelopmentGoals>> = await axiosClient(session_data).get('/settings/sdg')

    return <SdgTable sdg={get_data.data} />
}