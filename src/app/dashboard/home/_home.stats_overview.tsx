import { axiosClient } from "@/provider/axiosClient";
import { ResponseProjectsOverview } from "@/types/Settings";
import { AxiosResponse } from "axios";
import { StatusCard } from "./_data.components/home.statusCardUi";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";

export default async function StatsOverview() {
    const get_auth = await get_auth_session(cookies)

    const response: AxiosResponse<ResponseProjectsOverview> = await axiosClient({
        auth: get_auth?.auth ?? "",
        sid: get_auth?.sid ?? ""
    }).get("/projects/stats-overview")


    return <StatusCard statsOverview={response.data} />
}