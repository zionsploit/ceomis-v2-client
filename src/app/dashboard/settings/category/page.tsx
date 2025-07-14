import { axiosClient } from "@/provider/axiosClient";
import { ResponseCategories } from "@/types/Settings";
import { AxiosResponse } from "axios";
import CategoriesTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<Array<ResponseCategories>> = await axiosClient(session_data).get("/settings/categories")

    return <CategoriesTable categories={response.data} />
}