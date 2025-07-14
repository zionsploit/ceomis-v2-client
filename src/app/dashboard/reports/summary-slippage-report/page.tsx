import { axiosClient } from "@/provider/axiosClient";
import { ResponseSummarySlippageReportOverview } from "@/types/Reports";
import { AxiosResponse } from "axios";
import PageContent from "./page.content";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }
    
    const response: AxiosResponse<ResponseSummarySlippageReportOverview> = await axiosClient(session_data).get("/reports/summary_slippage_report")

    return <PageContent session_data={session_data} summary_data={response.data} />
}