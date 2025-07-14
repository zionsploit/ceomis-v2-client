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
    const { id } = await params
    const auth_session = await get_auth_session(cookies)

    if (auth_session == null) {
        redirect("/")
    }

    const response: AxiosResponse<ResponseViewProjectsById> = await axiosClient(auth_session).get(`/projects/${id}`)

    return <PageContent session_auth={auth_session} projects={response.data} />
}