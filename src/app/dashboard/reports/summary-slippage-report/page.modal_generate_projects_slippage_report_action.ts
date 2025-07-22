import {  axiosClient } from "@/provider/axiosClient";
import { SessionData } from "@/types/utils";

export async function generateProjectsSlippageReports (state: string, session_data: SessionData) {
   const response = await axiosClient(session_data).post("/generate-reports/reports_slippage_projects", null, {
      responseType: 'blob',
      
    });

    const filename = "projects-slippage.pdf";

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