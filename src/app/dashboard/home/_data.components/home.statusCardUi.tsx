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
                    <Text label={Number(statsOverview.total_projects ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Unimplemented" fz="sm" />
                        <ThemeIcon color="red" variant="light" ><IconBan /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_unimplemented ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Preparing" fz="sm" />
                        <ThemeIcon color="orange" variant="light" ><IconHammer /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_preparing ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Bidding" fz="sm" />
                        <ThemeIcon color="blue" variant="light" ><IconGavel /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_bidding ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Biddded" fz="sm" />
                        <ThemeIcon color="blue" variant="light" ><IconGavel /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_bidded ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="On-Going" fz="sm" />
                        <ThemeIcon color="green" variant="light" ><IconActivity /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_ongoing ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Flex justify="space-between">
                        <Text label="Completed" fz="sm" />
                        <ThemeIcon color="violet" variant="light" ><IconCircleCheck /></ThemeIcon>
                    </Flex>
                    <Text label={Number(statsOverview.total_completed ?? 0).toString()} fz="h2" />
                </Stack>
            </Paper>
        </Group>
    </>
}