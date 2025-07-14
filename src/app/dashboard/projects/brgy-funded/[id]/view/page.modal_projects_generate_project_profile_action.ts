import { axiosClient } from "@/provider/axiosClient";
import { RequestGenerateProjectsProfile } from "@/types/Projects";
import { SessionData } from "@/types/utils";

type Request = {
  data: {
      projects_profile: RequestGenerateProjectsProfile, 
      file_name: string
  },
  session_data: SessionData
}

export async function generateProjectsProfileAction (state: string, request: Request) {
   const response = await axiosClient(request.session_data).post("/generate-reports/projects-by-id", request.data.projects_profile, {
      responseType: 'blob',
    });

    const filename = request.data.file_name + ".pdf";

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    return "Download started";

}