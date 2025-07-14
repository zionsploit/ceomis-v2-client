"use client"

import { Tabs } from "@/components/Tabs";
import { Box } from "@mantine/core";
import HomeByAppropriation from "./_data.components/home.by_appropriation";
import { PageTabContext } from "./page.tab.context";
import HomeDashboardAnalytics from "./_home.dashboard.analytics";
import HomeByRewards from "./_data.components/home.by_projects_rewards";
import { SessionData } from "@/types/utils";
import { createContext } from "react";

export default function Dashboard (session_data: {session: SessionData}) {

    const Tab_name = [
        "Analytics",
        "Top 10 Projects By Appropriation",
        "Top 10 Contractors By Awarded Project"
    ]

    return <>
        <SessionContext.Provider value={session_data.session}>
            <Box mt="lg">
                <Tabs props={{tabs_name: Tab_name, tabs_component: [
                    (({isActive}) => <>
                        <PageTabContext.Provider value={{isActive: isActive}}>
                            <HomeDashboardAnalytics />
                        </PageTabContext.Provider>
                    </>),
                    (({isActive}) => <PageTabContext.Provider value={{isActive: isActive}}>
                        <HomeByAppropriation />
                    </PageTabContext.Provider>),
                    (({isActive}) => <>
                        <PageTabContext.Provider value={{isActive: isActive}}>
                            <HomeByRewards />
                        </PageTabContext.Provider>
                    </>)
                ]}}  />
            </Box>
        </SessionContext.Provider>
    </>
}

export const SessionContext = createContext(null as SessionData | null)