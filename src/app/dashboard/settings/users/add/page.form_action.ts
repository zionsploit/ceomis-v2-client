import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddUser } from "@/types/Users";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddUser,
    session_data: SessionData
}

export async function actionAddAddUser (state: ActionReturnState<string>, request: Request) {

    const response: AxiosResponse<string | number> = await axiosClient(request.session_data).post("/users/create", request.data)

    if (response.status == HttpStatusCode.Created) {
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