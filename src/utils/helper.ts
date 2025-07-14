import { ProjectStatus } from "@/types/Projects";
import { SessionData } from "@/types/utils";
import { decipher_session_data } from "./crypto";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getSearchResults<T>(data: Array<T>, query: string, property: keyof T): Promise<Array<T>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                query.isEmpty() ? data : data.filter(item => {
                    const value = item[property];
                    return (
                        typeof value == 'string' && value.toLowerCase().includes(query.toLowerCase())
                    )
                })
            )
        }, 500)
    })
}

export function getRandomMantineColor(): string {
    const mantineColors = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']

    return mantineColors[Math.floor(Math.random() * mantineColors.length)]
}

export function getProjectBalance(value: number[], based: number) {
    return based - getProjectsTotalPaid(value)
}

export function getProjectsTotalPaid(value: number[]) {
    return value.reduce((pv, cv) => pv + cv, 0)
}

export function parseProjectsStatus (project_status: string): ProjectStatus {
    switch (project_status) {
        case "Not Yet Started":
            return "NotYetStarted";
        case "Preparation":
            return "Preparation";
        case "Bidding":
            return "Bidding";
        case "Bidded":
            return "Bidded";
        case "On-Going":
            return "OnGoing";
        case "Completed":
            return "Completed";
        default:
            return "Suspended"
    }
}

export function dataPagination<T> (data: Array<T>, page = 1, pageSize = 10) {
    const totalItems = data.length

    const totalPages = Math.ceil(totalItems / pageSize)
    const currentPage = Math.min(Math.max(1, page), totalPages);
  
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    
    const paginatedData = data.slice(start, end);
    
    return {
        currentPage,
        pageSize,
        totalPages,
        totalItems,
        data: paginatedData,
    };
}


export async function get_auth_session(cookies: () => Promise<ReadonlyRequestCookies>): Promise<SessionData | null> {
    const session = await cookies()

    if (session.has("_auth")) {
        const get_auth = session.get("_auth")

        const decipher = decipher_session_data(get_auth?.value ?? "")

        const session_data: SessionData = JSON.parse(decipher) satisfies SessionData

       return session_data
    }

    return null
}