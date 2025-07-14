import Content from "./page.content";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { get_auth_session } from "@/utils/helper";


export default async function Login() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/dashboard/home")
    }

    return <Content />
}