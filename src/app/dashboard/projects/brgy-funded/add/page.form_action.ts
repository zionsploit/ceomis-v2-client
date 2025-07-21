import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { apiURL, axiosClient } from "@/provider/axiosClient";
import { RequestAddProjects } from "@/types/Projects";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddProjects,
    session_data: SessionData
}

export async function actionAddProjects (state: ActionReturnState<string>, request: Request) {

    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/projects/add", request.data, {
        baseURL: apiURL
    })

    if (response.status == HttpStatusCode.Created) {
        if (String(response.data).isNotEmpty()) {

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