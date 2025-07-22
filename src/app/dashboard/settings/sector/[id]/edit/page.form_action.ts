import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpdateSector, ResponseSector } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateSector,
    session_data: SessionData
}

export async function actionUpdateSector(state: ActionReturnState<ResponseSector>, request: Request) {

    const response: AxiosResponse<ResponseSector> = await axiosClient(request.session_data).post("/settings/sector/update", request.data, )

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