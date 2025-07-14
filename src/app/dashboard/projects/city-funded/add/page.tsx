import { axiosClient } from "@/provider/axiosClient";
import { ResponsePrepareAllSettings } from "@/types/Settings";
import { AxiosResponse } from "axios";
import AddProjects from "./page.form";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const auth_session = await get_auth_session(cookies)

    if (auth_session == null) {
        redirect('/')
    }

    const response: AxiosResponse<ResponsePrepareAllSettings> = await axiosClient(auth_session).get("/projects/prepare-add-projects")

    return <AddProjects users_data={auth_session.users} projects_data={response.data} />
}