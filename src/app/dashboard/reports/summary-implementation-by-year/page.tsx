import { axiosClient } from "@/provider/axiosClient";
import { ResponseSummaryImplementationByYearFullOverview } from "@/types/Reports";
import { AxiosResponse } from "axios";
import Content from "./page.content";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<ResponseSummaryImplementationByYearFullOverview> = await axiosClient(session_data).get("/reports/summary_implementation_by_year")

    return <Content session_data={session_data} summary_data={response.data} />
}