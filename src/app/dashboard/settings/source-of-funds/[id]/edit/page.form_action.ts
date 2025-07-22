import { ResponseDefaultMessage } from "@/entity/Response.enum"
import {  axiosClient } from "@/provider/axiosClient"
import { RequestUpdateSourceOfFunds, ResponseSourceOfFunds } from "@/types/Settings"
import { SessionData } from "@/types/utils"
import { AxiosResponse, HttpStatusCode } from "axios"

type State = {
    message: ResponseDefaultMessage,
    response_data: ResponseSourceOfFunds
}

type Request = {
    data: RequestUpdateSourceOfFunds,
    session_data: SessionData
}

export async function actionUpdateSof(state: State, request: Request) {
    const response: AxiosResponse<ResponseSourceOfFunds> = await axiosClient(request.session_data).post("/settings/sof/update", request.data, );

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty() && response.data.id.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: response.data
        }
    }

    return {
        message: ResponseDefaultMessage.Failure,
        response_data: {id: 0, name: ""}
    }
}