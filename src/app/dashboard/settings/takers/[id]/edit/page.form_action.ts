import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpdateTakers, ResponseTakers } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";


type Request = {
    data: RequestUpdateTakers,
    session_data: SessionData
}

export async function actionUpdateTakers(state: ActionReturnState<ResponseTakers>, request: Request) {

    const response: AxiosResponse<ResponseTakers> = await axiosClient(request.session_data).post("/settings/takers/update", request.data, )

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty()) {

            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: {name: "", id: 0, contact_number: ""}       }
    }

    return {
        message: ResponseDefaultMessage.None,
        response_data: {name: "", id: 0, contact_number: ""}
    }

}