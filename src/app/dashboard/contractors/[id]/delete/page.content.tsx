"use client"

import { ResponseContractors } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import ConstractorsDeleteForm from "./page.form";
import { Text } from "@/components/Text";
import { SessionData } from "@/types/utils";

export default function ContractorsDeleteContent({
    session_data,
    contractors
}: Readonly<{session_data: SessionData, contractors: ResponseContractors}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Contractors - ${contractors.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Text ft="smallTitle" label="Upon deletion, the contractor will no longer appear in the system. Reactivation can only be done by the system administrator." />
                <Box>
                    <ConstractorsDeleteForm session_data={session_data} id={contractors.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}