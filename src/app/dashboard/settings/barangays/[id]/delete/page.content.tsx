"use client"

import { ResponseBarangays } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import BarangayDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function BarangayDeleteContent({
    session_data,
    barangay
}: Readonly<{session_data: SessionData, barangay: ResponseBarangays}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Barangay - ${barangay.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <BarangayDeleteForm session_data={session_data} id={barangay.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}