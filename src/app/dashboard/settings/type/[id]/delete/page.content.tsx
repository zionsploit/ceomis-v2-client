"use client"

import { ResponseTypes } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import TypeDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function TypeDeleteContent({
    session_data,
    stypes
}: Readonly<{session_data: SessionData, stypes: ResponseTypes}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${stypes.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <TypeDeleteForm session_data={session_data} id={stypes.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}