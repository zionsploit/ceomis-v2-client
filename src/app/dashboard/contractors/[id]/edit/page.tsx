import { axiosClient } from "@/provider/axiosClient";
import { ResponseContractors } from "@/types/Settings";
import { AxiosResponse } from "axios";
import ContractorsEditForm from "./page.form";
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
    const response: AxiosResponse<ResponseContractors> = await axiosClient(session_data).get(`/contractors/${id}`)

    return <ContractorsEditForm session_data={session_data} contractors={response.data} />
}