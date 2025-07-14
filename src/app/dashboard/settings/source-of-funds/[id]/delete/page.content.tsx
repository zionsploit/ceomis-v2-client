import { ResponseSourceOfFunds } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import SofDeleteForm from "./page.form";
import { IconInfoCircle } from "@tabler/icons-react";
import { SessionData } from "@/types/utils";

export default function SofDeleteContent({
    session_data,
    sof,
}: Readonly<{session_data: SessionData, sof: ResponseSourceOfFunds}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${sof.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <SofDeleteForm session_data={session_data} id={sof.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}