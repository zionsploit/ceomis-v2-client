import { ResponseDefaultMessage } from "@/entity/Response.enum"
import { apiURL, axiosClient } from "@/provider/axiosClient"
import { RequestDeleteSustainableDevelopmentGoals } from "@/types/Settings"
import { SessionData } from "@/types/utils"
import { AxiosResponse, HttpStatusCode } from "axios"

type State = {
    message: ResponseDefaultMessage,
    response_data: string
}

type Request = {
    data: RequestDeleteSustainableDevelopmentGoals,
    session_data: SessionData
}

export async function actionDeleteSdgById(state: State, request: Request) {

    const response: AxiosResponse<string | null> = await axiosClient(request.session_data).post("/settings/sdg/delete", request.data, {
        baseURL: apiURL
    });

    if (response.status == HttpStatusCode.Ok) {
        if (response.data?.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
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