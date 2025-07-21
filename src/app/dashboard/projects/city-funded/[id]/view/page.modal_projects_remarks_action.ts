import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { apiURL, axiosClient } from "@/provider/axiosClient";
import { ActionReturnState, SessionData } from "@/types/utils";
import { HttpStatusCode } from "axios";


type Data = {
    project_id: number,
    remarks: string,
    remarks_date: string,
    files: File[]
}

type Request = {
    data: Data,
    session_data: SessionData
}

export async function addProjectsRemarks(state: ActionReturnState<string>, request: Request) {

    const formData = new FormData()

    formData.append("project_id", String(request.data.project_id))
    formData.append("remarks", request.data.remarks)
    formData.append("remarks_date", request.data.remarks_date)

    request.data.files.forEach((file) => {
        formData.append(`files`, file)
    })

    const response = await axiosClient(request.session_data).post("/projects-files/remarks", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        baseURL: apiURL
    })

    if (response.status == HttpStatusCode.Created) {
        
        return {
            message: ResponseDefaultMessage.Success,
            response_data: response.data
        } as ActionReturnState<string>
    }

    return {
        message: ResponseDefaultMessage.Failure,
        response_data: ""
    }
}