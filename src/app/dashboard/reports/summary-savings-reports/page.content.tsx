"use client"

import { Paper } from "@/components/Paper";
import { ResponseSummaryProjectSavingsReport, ResponseSummaryProjectSavingsReportOverview } from "@/types/Reports";
import { dataPagination } from "@/utils/helper";
import { Button, Card, Flex, Group, NumberFormatter, Pagination, px, rem, Select, Stack, Table, Text, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { OpenGenerateProjectsSavingsSummary } from "./page.modal_generate_projects_savings_summary";
import { SessionData } from "@/types/utils";

export default function PageContent({
    session_data,
    summary_data
}: { session_data: SessionData, summary_data: ResponseSummaryProjectSavingsReportOverview }) {
    const total_projects = summary_data.total_records
    const total_appropriation = summary_data.total_appropriation
    const total_approved_budget_contract = summary_data.total_abc
    const total_contract_cost = summary_data.total_contract_cost
    const total_savings = summary_data.total_savings

    const [projects, setProjects] = useState<ResponseSummaryProjectSavingsReport[]>(summary_data.data)
    const [totalPaginate, setTotalPaginate] = useState<number>(0)
    const [currentPageSize, setCurrentPageSize] = useState<string | null>("10")
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const pages = dataPagination(summary_data.data, currentPage, Number(currentPageSize ?? 10))
        setTotalPaginate(pages.totalPages)
        setProjects(pages.data)

    }, [currentPage, currentPageSize, summary_data.data])

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Project Savings Report</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="sm" fw="bold" c="dimmed">Total Records</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_projects} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="sm" fw="bold" c="dimmed">Total Appropriation</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_appropriation)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="sm" fw="bold" c="dimmed">Total Approved Budget Contract</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_approved_budget_contract)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="sm" fw="bold" c="dimmed">Total Contract Cost</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_contract_cost)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="sm" fw="bold" c="dimmed">Total Savings</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_savings)} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateProjectsSavingsSummary(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={px("350")}>Project Name</Table.Th>
                            <Table.Th w={px("200")}>Code</Table.Th>
                            <Table.Th w={px("200")}>Contractor</Table.Th>
                            <Table.Th w={px("200")}>Status</Table.Th>
                            <Table.Th>Savings Calculation</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projects.map((project, index) => (
                            <Table.Tr key={index}>
                                <Table.Td fw="bold">{project.project_name}</Table.Td>
                                <Table.Td fw="bold">{project.project_code}</Table.Td>
                                <Table.Td fw="bold">{project.contractor_name}</Table.Td>
                                <Table.Td fw="bold">{project.project_status}</Table.Td>
                                <Table.Td>
                                    <Stack gap={0}>
                                        <Stack gap={0}>
                                            <Text fw="bold" c="dimmed">ABC Cost</Text>
                                            <Text fw="bold"><NumberFormatter value={Number(project.approved_budget_contract)} thousandSeparator /></Text>
                                        </Stack>
                                        <Flex gap="sm" align="center">
                                            <Stack gap={0}>
                                                <Text fw="bold" c="dimmed">Appropriation</Text>
                                                <Text fw="bold"><NumberFormatter value={Number(project.appropriation)} thousandSeparator /></Text>
                                            </Stack>
                                            <Text fw="bold" c="dimmed">{" "}-{" "}</Text>
                                            <Stack gap={0}>
                                                <Text fw="bold" c="dimmed">Contract Cost</Text>
                                                <Text fw="bold"><NumberFormatter value={Number(project.contract_cost)} thousandSeparator /></Text>
                                            </Stack>
                                            <Text fw="bold" c="dimmed">{" "}={" "}</Text>
                                            <Stack gap={0}>
                                                <Text fw="bold" c="dimmed">Savings</Text>
                                                <Text fw="bold" c={Number(project.savings).isNegative() ? 'red' : 'green'}><NumberFormatter value={Number(project.savings)} thousandSeparator /></Text>
                                            </Stack>
                                        </Flex>
                                    </Stack>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <Flex mt="md" justify="space-between">
                    <Pagination total={totalPaginate} onChange={(value) => setCurrentPage(value)} />
                    <Select
                        w={rem("100")}
                        defaultValue={currentPageSize}
                        onChange={(value) => setCurrentPageSize(value)}
                        data={["10", "25", "50", "75", "100"]}
                    />
                </Flex>
            </Paper>
        </Stack>
    </>
}