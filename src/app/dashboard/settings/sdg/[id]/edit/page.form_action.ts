import { ResponseDefaultMessage } from "@/entity/Response.enum"
import { axiosClient } from "@/provider/axiosClient"
import { RequestUpdateSustainableDevelopmentGoals, ResponseSustainableDevelopmentGoals } from "@/types/Settings"
import { SessionData } from "@/types/utils"
import { AxiosResponse, HttpStatusCode } from "axios"

type State = {
    message: ResponseDefaultMessage,
    response_data: ResponseSustainableDevelopmentGoals
}

type Request = {
    data: RequestUpdateSustainableDevelopmentGoals,
    session_data: SessionData
}

export async function actionUpdateSdg(state: State, request: Request) {
    const response: AxiosResponse<ResponseSustainableDevelopmentGoals> = await axiosClient(request.session_data).post("/settings/sdg/update", request.data);

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty() && response.data.id.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }
        
        return {
            message: ResponseDefaultMessage.Failure,
            response_data: { id: 0, name: "" }
        }
    }
    
    return {
        message: ResponseDefaultMessage.None,
        response_data: { id: 0, name: "" }
    }
}