import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestDeleteProjectRemarks } from "@/types/Projects";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestDeleteProjectRemarks,
    session_data: SessionData
}

export async function deleteProjectRemarks(state: ActionReturnState<string>, request: Request) {

    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/projects/delete-project-remarks", request.data, )

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