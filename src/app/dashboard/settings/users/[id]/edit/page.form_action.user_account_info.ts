import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddUpdateUserInfoById } from "@/types/Users";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddUpdateUserInfoById,
    session_data: SessionData
}

export async function updateUserAccountInfo(state: ActionReturnState<string>, request: Request) {
    const response: AxiosResponse<string> = await axiosClient(request.session_data).post("/users/update-user-info-by-id", request.data)

    if (response.status == HttpStatusCode.Created) {

        if (response.data.isNotEmpty()) {
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