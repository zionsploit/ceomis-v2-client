import { axiosClient } from "@/provider/axiosClient";
import { ResponsePrepareAllSettings, ResponseViewProjectsById } from "@/types/Settings";
import { AxiosResponse } from "axios";
import UpdateProjects from "./page.form";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_auth = await get_auth_session(cookies)

    if (session_auth == null) {
        redirect('/')
    }

    const { id } = await params
    const [response_prepare_add, response_get_projects]: [AxiosResponse<ResponsePrepareAllSettings>, AxiosResponse<ResponseViewProjectsById>] = await Promise.all([
        axiosClient(session_auth).get("/projects/prepare-add-projects"),
        axiosClient(session_auth).get(`/projects/${id}`)
    ])

    return <UpdateProjects session_data={session_auth} projects_settings={response_prepare_add.data} projects_data={response_get_projects.data} />
}