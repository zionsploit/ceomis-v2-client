import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestUpdateTypes, ResponseTypes } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateTypes,
    session_data: SessionData
}

export async function actionUpdateType(state: ActionReturnState<ResponseTypes>, request: Request) {
    
    const response: AxiosResponse<ResponseTypes> = await axiosClient(request.session_data).post("/settings/type/update", request.data);

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty() && response.data.id.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: {id: 0, name: ""}
        }
    }

    return {
        message: ResponseDefaultMessage.None,
        response_data: {id: 0, name: ""}
    }
}