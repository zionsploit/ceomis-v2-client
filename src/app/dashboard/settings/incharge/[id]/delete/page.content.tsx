"use client"

import { ResponseIncharge } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import InchargeDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function InchargeDeleteContent({
    session_data,
    incharge
}: Readonly<{session_data: SessionData, incharge: ResponseIncharge}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${incharge.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <InchargeDeleteForm session_data={session_data} id={incharge.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}