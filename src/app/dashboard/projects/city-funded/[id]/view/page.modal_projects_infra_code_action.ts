import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpsertProjectsInfraCode } from "@/types/Projects";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpsertProjectsInfraCode,
    session_auth: SessionData
}

export async function upsertProjectsInfraCodeAction(state: ActionReturnState<string>, request: Request) {
    const response: AxiosResponse<string> = await axiosClient(request.session_auth).post("/projects/upsert-projects-info-code", request.data, )

    if (response.status == HttpStatusCode.Created) {
        return {
            message: ResponseDefaultMessage.Success,
            response_data: response.data
        } as ActionReturnState<string>
    }

     return {
        message: ResponseDefaultMessage.Failure,
        response_data: ""
    } as ActionReturnState<string>
}