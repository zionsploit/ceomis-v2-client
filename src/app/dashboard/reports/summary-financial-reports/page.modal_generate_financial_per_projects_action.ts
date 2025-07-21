import { apiURL, axiosClient } from "@/provider/axiosClient";
import { SessionData } from "@/types/utils";

export async function generateFinancialPerProjects (state: string, session_data: SessionData) {
   const response = await axiosClient(session_data).post("/generate-reports/reports_financial_per_projects", null, {
      responseType: 'blob',
      baseURL: apiURL
    });

    const filename = "reports-financial-per-projects.pdf";

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