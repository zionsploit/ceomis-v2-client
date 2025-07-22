import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpdateUser } from "@/types/Users";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateUser,
    session_data: SessionData
}

export async function updateUserAccount(state: ActionReturnState<string>, request: Request) {
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/users/update-user-by-id", request.data, )

    if (response.status == HttpStatusCode.Created) {
        return {
            message: ResponseDefaultMessage.Success,
            response_data: response.data
        }
    } else if (response.status == HttpStatusCode.NotFound) {
        return {
            message: ResponseDefaultMessage.Failure,
            response_data: ""
        }
    } else {
        return {
            message: ResponseDefaultMessage.None,
            response_data: ""
        }
    }
}