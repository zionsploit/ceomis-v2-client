"use client"

import { ResponseTakers } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import TakersDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function TakersDeleteContent({
    session_data,
    takers
}: Readonly<{session_data: SessionData, takers: ResponseTakers}>) {


    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${takers.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <TakersDeleteForm session_data={session_data} id={takers.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}