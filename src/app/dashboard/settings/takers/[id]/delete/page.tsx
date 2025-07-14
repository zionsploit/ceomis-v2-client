import { axiosClient } from "@/provider/axiosClient"
import { ResponseTakers } from "@/types/Settings"
import { AxiosResponse } from "axios"
import TakersDeleteContent from "./page.content"
import { get_auth_session } from "@/utils/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page({
    params
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const { id } = await params
    const get_data: AxiosResponse<ResponseTakers> = await axiosClient(session_data).get(`/settings/takers/${id}`)

    return <TakersDeleteContent session_data={session_data} takers={get_data.data} />
}