import { axiosClient } from "@/provider/axiosClient";
import { ResponseUserRoles } from "@/types/Users";
import { AxiosResponse } from "axios";
import UsersAddForm from "./page.form";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const get_data: AxiosResponse<Array<ResponseUserRoles>> = await axiosClient(session_data).get("/users/get-all-roles")

    return <UsersAddForm usersRoles={get_data.data} />
}