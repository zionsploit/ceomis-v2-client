import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestDeleteUserById } from "@/types/Users";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestDeleteUserById,
    session_data: SessionData
}

export async function actionDeleteUser(state: ActionReturnState<string>, request: Request) {
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/users/delete-user-by-id", request.data, )

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