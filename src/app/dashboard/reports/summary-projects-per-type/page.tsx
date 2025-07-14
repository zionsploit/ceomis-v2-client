import { axiosClient } from "@/provider/axiosClient";
import { ResponseSummaryProjectsPerTypeOverview } from "@/types/Reports";
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

    const response: AxiosResponse<ResponseSummaryProjectsPerTypeOverview> = await axiosClient(session_data).get("/reports/summary_projects_per_type")

    return <PageContent session_data={session_data} summary_data={response.data} />
}