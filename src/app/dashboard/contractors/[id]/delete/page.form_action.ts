import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { apiURL, axiosClient } from "@/provider/axiosClient";
import { RequestDeleteContractorsById } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestDeleteContractorsById,
    session_data: SessionData
}

export async function actionDeleteContractorById (state: ActionReturnState<string>, request: Request) {
    
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/contractors/delete", request.data, {
        baseURL: apiURL
    })

    if (response.status == HttpStatusCode.Created) {
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