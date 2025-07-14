import { axiosClient } from "@/provider/axiosClient";
import { ResponseTakers } from "@/types/Settings";
import { AxiosResponse } from "axios";
import TakersTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<Array<ResponseTakers>> = await axiosClient(session_data).get("/settings/takers")

    return <TakersTable takers={response.data} />

}