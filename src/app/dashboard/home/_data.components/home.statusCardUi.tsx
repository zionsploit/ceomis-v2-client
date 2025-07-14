'use client'

import { Paper } from "@/components/Paper"
import { Text } from "@/components/Text"
import { ResponseProjectsOverview } from "@/types/Settings"
import { Flex, Group, rem, Stack, ThemeIcon } from "@mantine/core"
import { IconActivity, IconBan, IconCircleCheck, IconGavel, IconHammer, IconPackage } from "@tabler/icons-react"

export const StatusCard = ({
    statsOverview
}: Readonly<{statsOverview: ResponseProjectsOverview}>) => {

    return <>
        <Group grow w={rem("100%")}>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Total Projects" fz="sm" />
                        <ThemeIcon color="cyan" variant="light" ><IconPackage /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_projects.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Unimplemented" fz="sm" />
                        <ThemeIcon color="red" variant="light" ><IconBan /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_unimplemented.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Preparing" fz="sm" />
                        <ThemeIcon color="orange" variant="light" ><IconHammer /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_preparing.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Bidding" fz="sm" />
                        <ThemeIcon color="blue" variant="light" ><IconGavel /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_bidding.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Biddded" fz="sm" />
                        <ThemeIcon color="blue" variant="light" ><IconGavel /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_bidded.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="On-Going" fz="sm" />
                        <ThemeIcon color="green" variant="light" ><IconActivity /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_ongoing.toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Completed" fz="sm" />
                        <ThemeIcon color="violet" variant="light" ><IconCircleCheck /></ThemeIcon>
                    </Flex>
                    <Text label={statsOverview.total_completed.toString()} fz="h2" />
                </Stack>
            </Paper>
        </Group>
    </>
}