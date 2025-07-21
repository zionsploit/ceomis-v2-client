import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { apiURL, axiosClient, AxiosClientRequestHeaders } from "@/provider/axiosClient";
import { RequestAddUpdateUserInfoById } from "@/types/Users";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestAddUpdateUserInfoById,
    session_data: SessionData
}

export async function updateUserAccountInfo(state: ActionReturnState<string>, request: Request) {
    
    const requestHeaders: AxiosClientRequestHeaders = {
        auth: request.session_data.auth,
        sid: request.session_data.sid
    }

    const response: AxiosResponse<string> = await axiosClient(requestHeaders).post("/users/update-user-info-by-id", request.data, {
        baseURL: apiURL
    })

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