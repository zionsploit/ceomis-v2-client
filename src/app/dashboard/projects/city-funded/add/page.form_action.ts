import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddProjects } from "@/types/Projects";
import { ActionReturnState } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

export async function actionAddProjects (state: ActionReturnState<string>, data: RequestAddProjects) {

    const response: AxiosResponse<string> = await axiosClient().post("/projects/add", data)

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