import { SessionData } from "@/types/utils";
import StatsOverview from "./_home.stats_overview";
import Dashboard from "./_home.dashboard";

export default function Content(session_data: {session: SessionData}) {
    const session = session_data.session
    
    return <>
        <StatsOverview />
        <Dashboard session={session} />
    </>
}
