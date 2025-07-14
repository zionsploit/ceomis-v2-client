import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddTakers } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddTakers,
    session_data: SessionData
}

export async function actionAddTakers (state: ActionReturnState<string>, request: Request) {

    const response: AxiosResponse<string | number> = await axiosClient(request.session_data).post("/settings/takers/add", request.data)

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