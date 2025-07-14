import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddContractors } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddContractors,
    session_data: SessionData
}

export async function actionAddContractor(state: ActionReturnState<string>, request: Request) {
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/contractors/add", request.data)

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