import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import Content from "./page.content";
import { redirect } from "next/navigation";

export default async function Home() {
    const get_auth = await get_auth_session(cookies)

    if (get_auth == null) {
        redirect("/")
    }

    return <Content session={get_auth} />
}