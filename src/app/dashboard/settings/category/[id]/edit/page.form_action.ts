import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpdateCategories, ResponseCategories } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateCategories,
    session_data: SessionData
}

export async function actionUpdateCategory(state: ActionReturnState<ResponseCategories>, request: Request) {

    const response: AxiosResponse<ResponseCategories> = await axiosClient(request.session_data).post("/settings/categories/update", request.data, )

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty() && response.data.id.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Success,
            response_data: {id: 0, name: ""}
        }
    }

    return {
        message: ResponseDefaultMessage.Success,
        response_data: {id: 0, name: ""}
    }
}