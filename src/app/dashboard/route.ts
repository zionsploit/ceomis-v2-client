import { get_auth_session } from "@/utils/helper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET() {
    const session = await get_auth_session(cookies)
    
      if (session !== null) {
          redirect("/dashboard/home")
      }
      redirect("/login")
}