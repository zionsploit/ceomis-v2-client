"use client"

import { useAppSelector } from "@/provider/reactRedux/hooks";
import { ResponsePrepareAllSettings } from "@/types/Settings";
import { SessionData } from "@/types/utils";
import { PageContext } from "./context/page.context";
import AddProjects from "./page.form";
import { RequiredComponents } from "@/components/Response";
import { Button, Flex } from "@mantine/core";
import { Text } from "@/components/Text";
import Link from "next/link";

export default function PageContent ({
    session_data,
    projects_data
}: Readonly<{session_data: SessionData, projects_data: ResponsePrepareAllSettings}>) {

    const userDetails = useAppSelector((state) => state.userDetailsReducer.userDetails)

    return <>
        <Flex align="center" justify="space-between">
            <Text ft="mediumTitle" label={"Add Projects"} />
            <Button variant="light" component={Link} href="/dashboard/projects/city-funded">Back</Button>
        </Flex>
        {userDetails.data?.info_id == null ? <RequiredComponents /> : <>
            <PageContext.Provider value={{
                projects_data: projects_data,
                session_data: session_data
            }}>
                <AddProjects />
            </PageContext.Provider>
        </>}
    </>
}