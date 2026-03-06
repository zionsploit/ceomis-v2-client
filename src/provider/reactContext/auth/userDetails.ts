import { UserDetails } from "@/types/utils";
import { createContext } from "react";

export const UserDetailsContext = createContext({
    userDetails: null as UserDetails | null
})