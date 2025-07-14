import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestAddUser } from "@/types/Users";
import { ActionReturnState } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

export async function actionAddAddUser (state: ActionReturnState<string>, data: RequestAddUser) {

    const response: AxiosResponse<string | number> = await axiosClient().post("/users/create", data)

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