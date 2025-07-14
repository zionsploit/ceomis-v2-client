'use client'

import { ResponseSustainableDevelopmentGoals } from "@/types/Settings";
import { Alert, Box, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import SdgDeleteForm from "./page.form";
import { SessionData } from "@/types/utils";

export default function SdgDeleteContent({
    session_data,
    sdg,
}: Readonly<{session_data: SessionData, sdg: ResponseSustainableDevelopmentGoals}>) {

    return <>
        <Alert variant="light" color="red" title={`Deleting Project Settings - ${sdg.name}`} icon={<IconInfoCircle />}>
            <Stack>
                {/* <Text component="p" fz="md" fw={500}>
                    Deleting the project settings <b>{sdg.name}</b> will remove it from your project list and impact any other projects that rely on its data.
                </Text>
                <Text component="p" fz="md" fw={500}>
                    This action is <b>permanent</b> and cannot be undone.
                </Text>
                <Text mt="lg" component="h2" fz="md" fw="bold">Projects Affected:</Text>
                <List
                    center
                    spacing={"sm"}
                    icon={<ThemeIcon variant="light" color="red" radius="xl"><IconInfoTriangle size={15} /></ThemeIcon>}
                >
                    <List.Item><Badge rightSection={<ActionIcon variant="transparent" size="xs"><IconEditCircle /></ActionIcon>} variant="light">Q1 Social Media Push</Badge></List.Item>
                    <List.Item><Badge rightSection={<ActionIcon variant="transparent" size="xs"><IconEditCircle /></ActionIcon>} variant="light">SEO Optimization 2024</Badge></List.Item>
                    <List.Item><Badge rightSection={<ActionIcon variant="transparent" size="xs"><IconEditCircle /></ActionIcon>} variant="light">Annual Marketing Report</Badge></List.Item>
                    <List.Item><Badge rightSection={<ActionIcon variant="transparent" size="xs"><IconEditCircle /></ActionIcon>} variant="light">Client Outreach Strategy</Badge></List.Item>
                </List>
                <Text component="p" fz="md" fw={500}>
                    These projects contain references that must be updated before you can delete this project.
                </Text> */}
                <Box>
                    <SdgDeleteForm session_data={session_data} id={sdg.id} />
                </Box>
            </Stack>
        </Alert>
    </>
}