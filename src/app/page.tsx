import "@/utils/string"
import { cookies } from "next/headers";
import { decipher_session_data } from "@/utils/crypto";
import { SessionData } from "@/types/utils";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await cookies()
  
    if (session.has("_auth")) {
        const get_auth = session.get("_auth")

        const decipher = decipher_session_data(get_auth?.value ?? "")

        const session_data: SessionData = JSON.parse(decipher) satisfies SessionData

        if (session_data.auth.isNotEmpty()) {
            redirect("/dashboard/home")
        }
    }

    redirect("/login")
}
