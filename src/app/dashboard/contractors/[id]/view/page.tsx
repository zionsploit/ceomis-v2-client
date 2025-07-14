import { axiosClient } from "@/provider/axiosClient";
import { ResponseContractorsWithProjects } from "@/types/Settings";
import { AxiosResponse } from "axios";
import ContractorViewPage from "./page.content";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: Readonly<{params: Promise<{id: string}>}>) {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const { id } = await params
    const response: AxiosResponse<ResponseContractorsWithProjects> = await axiosClient(session_data).get(`/contractors/${id}`)

    return <ContractorViewPage session_data={session_data} contractor={response.data} />
}