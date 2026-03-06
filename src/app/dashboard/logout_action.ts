"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    ((await cookies()).delete('_auth').delete('_user_details'))
    redirect("/")
}