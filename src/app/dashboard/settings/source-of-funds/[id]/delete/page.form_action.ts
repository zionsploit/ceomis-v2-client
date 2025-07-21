import { ResponseDefaultMessage } from "@/entity/Response.enum"
import { apiURL, axiosClient } from "@/provider/axiosClient"
import { RequestDeleteSourceOfFunds } from "@/types/Settings"
import { SessionData } from "@/types/utils"
import { AxiosResponse, HttpStatusCode } from "axios"

type State = {
    message: ResponseDefaultMessage,
    response_data: string
}

type Request = {
    data: RequestDeleteSourceOfFunds,
    session_data: SessionData
}

export async function actionDeleteSofById(state: State, request: Request) {

    const response: AxiosResponse<string | null> = await axiosClient(request.session_data).post("/settings/sof/delete", request.data, {
        baseURL: apiURL
    })

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