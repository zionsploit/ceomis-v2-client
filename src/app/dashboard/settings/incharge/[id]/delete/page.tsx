import { axiosClient } from "@/provider/axiosClient";
import { ResponseIncharge } from "@/types/Settings";
import { AxiosResponse } from "axios";
import InchargeDeleteContent from "./page.content";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const { id } = await params;
    const get_data: AxiosResponse<ResponseIncharge> = await axiosClient(session_data).get(`settings/incharge/${id}`)

    return <InchargeDeleteContent session_data={session_data} incharge={get_data.data} />
}