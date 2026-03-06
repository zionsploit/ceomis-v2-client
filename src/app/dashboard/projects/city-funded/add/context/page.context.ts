import { ResponsePrepareAllSettings } from "@/types/Settings";
import { SessionData } from "@/types/utils";
import { createContext } from "react";

export const PageContext = createContext({
    session_data: {} as SessionData ,
    projects_data: {} as ResponsePrepareAllSettings 
})