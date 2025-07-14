import { axiosClient } from "@/provider/axiosClient"
import { ResponseUsersWithFullInfo } from "@/types/Users"
import { AxiosResponse } from "axios"
import UserDeleteContent from "./page.content"
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
    const users_data: AxiosResponse<ResponseUsersWithFullInfo> = await axiosClient(session_data).get(`/users/get-full-users/${id}`)
    
    return <UserDeleteContent session_data={session_data} user={users_data.data} />
}