import { axiosClient } from "@/provider/axiosClient"
import { ResponseViewProjectsById } from "@/types/Settings"
import { AxiosResponse } from "axios"
import PageContent from "./page.content"
import { get_auth_session } from "@/utils/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ViewProjects({
    params,
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_auth = await get_auth_session(cookies)

    if (session_auth == null) {
        redirect("/")
    }

    const { id } = await params

    const response: AxiosResponse<ResponseViewProjectsById> = await axiosClient(session_auth).get(`/projects/${id}`)

    return <PageContent session_data={session_auth} projects={response.data} />
}