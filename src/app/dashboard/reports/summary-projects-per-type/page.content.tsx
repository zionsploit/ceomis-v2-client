"use client"

import { Paper } from "@/components/Paper";
import { ResponseSummaryProjectsPerTypeOverview } from "@/types/Reports";
import { Button, Card, Flex, Group, NumberFormatter, Stack, Table, Text, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { OpenGenerateProjectsPerTypeSummary } from "./page.modal_generate_projects_per_type_summary";
import { SessionData } from "@/types/utils";

export default function PageContent({
    session_data,
    summary_data
}: {session_data: SessionData, summary_data: ResponseSummaryProjectsPerTypeOverview}) {
    const total_type = summary_data.total_types
    const total_projects = summary_data.total_projects
    const total_appropriation = summary_data.total_appropriation
    const projects_data = summary_data.data

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Summary of Projects per Type</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">No. Type</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_type} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">No. Projects</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_projects)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Total Appropriation</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_appropriation)} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateProjectsPerTypeSummary(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th>Number of projects</Table.Th>
                            <Table.Th>Appropriation</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            projects_data.map((data, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td fw="bold">{index + 1}</Table.Td>
                                    <Table.Td fw="bold">{data.project_type}</Table.Td>
                                    <Table.Td fw="bold">{data.total_projects}</Table.Td>
                                    <Table.Td fw="bold">
                                        <NumberFormatter value={Number(data.total_appropriation)} thousandSeparator />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    </>
}