import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestAddProjectPayment } from "@/types/Projects";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddProjectPayment,
    session_data: SessionData
}

export async function actionAddProjectsPayment (state: ActionReturnState<string>, request: Request ) {
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/projects/add-payment", request.data, )
    
    if (response.status == HttpStatusCode.Created) {
        return {
            message: ResponseDefaultMessage.Success,
            response_data: response.data
        } as ActionReturnState<string>
    }

    return {
        message: ResponseDefaultMessage.Failure,
        response_data: ""
    } as ActionReturnState<string>
}