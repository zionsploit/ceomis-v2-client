import { get_auth_session, get_user_details } from "@/utils/helper";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const get_auth = await get_auth_session(cookies)
    const get_user = await get_user_details(cookies)

    if (get_auth == null) {
        return NextResponse.json(null)
    }

    return NextResponse.json(get_user)
}