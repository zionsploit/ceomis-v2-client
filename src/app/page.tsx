import "@/utils/string"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { get_auth_session } from "@/utils/helper";


export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/login")
    } else {
        redirect("/dashboard/home")
    }
}
