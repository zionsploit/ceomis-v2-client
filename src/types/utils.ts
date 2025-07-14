import { ResponseDefaultMessage } from "@/entity/Response.enum"

export type ActionReturnState<T> = {
    message: ResponseDefaultMessage,
    response_data: T
}

export interface ReportsEventsMessage {
    id: string,
    message: string,
    progress: number,
    status: string
}

export interface UsersData {id: string, email: string, timestamp: string}

export type SessionData = {
    users: UsersData,
    auth: string,
    sid: string
}