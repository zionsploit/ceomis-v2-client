"use client"

import { ResponseCategories } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import CategoryDeleteForm from "./page.form";
import { IconInfoCircle } from "@tabler/icons-react";
import { SessionData } from "@/types/utils";

export default function CategoryDeleteContent({
    session_data,
    category
}: Readonly<{session_data: SessionData, category: ResponseCategories}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${category.name}`} icon={<IconInfoCircle />}>
            <Stack>
                <Box>
                    <CategoryDeleteForm session_data={session_data} id={category.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}