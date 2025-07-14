import { axiosClient } from "@/provider/axiosClient";
import { ResponseSustainableDevelopmentGoals } from "@/types/Settings";
import { AxiosResponse } from "axios";
import SdgEditForm from "./page.form";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {params: Promise<{ id: string }>}) {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const { id } = await params;
    const get_data: AxiosResponse<ResponseSustainableDevelopmentGoals> = await axiosClient(session_data).get(`/settings/sdg/${id}`)

    return <SdgEditForm session_data={session_data} sdg={get_data.data} />
}