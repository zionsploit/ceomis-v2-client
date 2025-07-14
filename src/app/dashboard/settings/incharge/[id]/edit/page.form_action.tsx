import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { axiosClient } from "@/provider/axiosClient";
import { RequestUpdateIncharge, ResponseIncharge } from "@/types/Settings";
import { ActionReturnState, SessionData } from "@/types/utils";
import { AxiosResponse, HttpStatusCode } from "axios";

type Request = {
    data: RequestUpdateIncharge,
    session_data: SessionData
}

export async function actionUpdateIncharge(state: ActionReturnState<ResponseIncharge>, request: Request) {

    const response: AxiosResponse<ResponseIncharge> = await axiosClient(request.session_data).post("/settings/incharge/update", request.data);

    if (response.status == HttpStatusCode.Ok) {
        if (response.data.name.isNotEmpty() && response.data.id.toString().isNotEmpty()) {
            return {
                message: ResponseDefaultMessage.Success,
                response_data: response.data
            }
        }

        return {
            message: ResponseDefaultMessage.Failure,
            response_data: {id: 0, name: ""}
        }
    }

    return {
        message: ResponseDefaultMessage.None,
        response_data: {id: 0, name: ""}
    }

}