import { axiosClient } from "@/provider/axiosClient";
import { ResponseUsersWithRoles } from "@/types/Users";
import { AxiosResponse } from "axios";
import UsersWithRolesTable from "./page.table";
import { get_auth_session } from "@/utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const session_data = await get_auth_session(cookies)

    if (session_data == null) {
        redirect("/")
    }

    const response: AxiosResponse<Array<ResponseUsersWithRoles>> = await axiosClient(session_data).get("/users/get-all-users-with-roles")

    return <UsersWithRolesTable usersWithRoles={response.data} />

}