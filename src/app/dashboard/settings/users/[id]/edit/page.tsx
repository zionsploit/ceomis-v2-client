import { axiosClient } from "@/provider/axiosClient"
import { ResponseUserRoles, ResponseUsersWithFullInfo } from "@/types/Users"
import { AxiosResponse } from "axios"
import UsersEditForm from "./page.form"
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

    const response: [AxiosResponse<ResponseUsersWithFullInfo>, AxiosResponse<Array<ResponseUserRoles>>] = await Promise.all([
        axiosClient(session_data).get(`/users/get-full-users/${id}`),
        axiosClient(session_data).get("/users/get-all-roles")
    ])


    return <UsersEditForm session_data={session_data} roles={response[1].data} users={response[0].data} />
}