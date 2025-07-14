import { axiosClient } from "@/provider/axiosClient";
import { ResponsePrepareAllSettings } from "@/types/Settings";
import { AxiosResponse } from "axios";
import AddProjects from "./page.form";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<ResponsePrepareAllSettings> = await axiosClient(session_data).get("/projects/prepare-add-projects")

    return <AddProjects session_data={session_data} projects_data={response.data} />
}