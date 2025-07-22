import { ResponseDefaultMessage } from "@/entity/Response.enum"
import {  axiosClient } from "@/provider/axiosClient"
import { RequestAddSustainableDevelopmentGoals } from "@/types/Settings"
import { SessionData } from "@/types/utils"
import { AxiosResponse, HttpStatusCode } from "axios"

type State = {
    message: ResponseDefaultMessage,
    response_data: string
}
type Request = {
    data: RequestAddSustainableDevelopmentGoals,
    session_data: SessionData
}

export async function actionAddSdg (state: State, request: Request) {
    const response: AxiosResponse<string | number> = await axiosClient(request.session_data).post("/settings/sdg/add", request.data, )

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data.toString()
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: ""
        }
    }

    return {
        message: ResponseDefaultMessage.None,
        response_data: ""
    }
}