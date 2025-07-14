"use server"

import { get_auth_session } from "@/utils/helper"
import Content from "./page.content"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    return <Content session_data={session_data} />
}