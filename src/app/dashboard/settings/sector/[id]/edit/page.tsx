import { axiosClient } from "@/provider/axiosClient"
import { ResponseSector } from "@/types/Settings"
import { AxiosResponse } from "axios"
import SectorEditForm from "./page.form"
import { get_auth_session } from "@/utils/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page({
    params,
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const { id } = await params
    const get_data: AxiosResponse<ResponseSector> = await axiosClient(session_data).get(`/settings/sector/${id}`)

    return <SectorEditForm session_data={session_data} sector={get_data.data} />
}