import { ResponseDefaultMessage } from "@/entity/Response.enum";
import {  axiosClient } from "@/provider/axiosClient";
import { RequestUpdateBarangay, ResponseBarangays } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateBarangay,
    session_data: SessionData
}

export async function actionUpdateBarangay (state: ActionReturnState<ResponseBarangays>, request: Request) {

    const response: AxiosResponse<ResponseBarangays> = await axiosClient(request.session_data).post("/settings/barangay/update", request.data, )

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: {
                name: "",
                barangay_type: null,
                id: 0,
                is_poblacion: false
            }
        }
    }

    return {
        message: ResponseDefaultMessage.None,
        response_data: {
            name: "",
            barangay_type: null,
            id: 0,
            is_poblacion: false
        }
    }

}