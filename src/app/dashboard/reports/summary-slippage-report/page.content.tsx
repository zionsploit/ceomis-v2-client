"use client"

import { Paper } from "@/components/Paper";
import { ResponseSummarySlippageReportOverview } from "@/types/Reports";
import { Button, Card, Flex, Group, NumberFormatter, Stack, Table, Text, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { OpenGenerateProjectSlippageReports } from "./page.modal_generate_projects_slippage_report";
import { SessionData } from "@/types/utils";

export default function PageContent({
    session_data,
    summary_data
}: { session_data: SessionData, summary_data: ResponseSummarySlippageReportOverview }) {
    const total_records = summary_data.total_records
    const projects = summary_data.data

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Slippage Reports</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Records</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_records} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateProjectSlippageReports(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Project Name</Table.Th>
                            <Table.Th>Contractor</Table.Th>
                            <Table.Th>Taker</Table.Th>
                            <Table.Th>Start Date</Table.Th>
                            <Table.Th>Target Date</Table.Th>
                            <Table.Th>No. of Days Lapsed</Table.Th>
                            <Table.Th>Remarks</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projects.map((project, index) => (
                            <Table.Tr key={index}>
                                <Table.Td fw="bold">{project.project_name}</Table.Td>
                                <Table.Td fw="bold">{project.contractor_name}</Table.Td>
                                <Table.Td fw="bold">{project.taker_name}</Table.Td>
                                <Table.Td fw="bold">{project.start_date}</Table.Td>
                                <Table.Td fw="bold">{project.target_date}</Table.Td>
                                <Table.Td fw="bold">{project.days_lapse} Days</Table.Td>
                                <Table.Td fw="bold">{project.remarks}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    </>
}