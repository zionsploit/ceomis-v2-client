"use client"

import { ResponseSector } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import SectorDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function SectorDeleteContent({
    session_data,
    sectors
}: Readonly<{session_data: SessionData, sectors: ResponseSector}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${sectors.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <SectorDeleteForm session_data={session_data} id={sectors.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}