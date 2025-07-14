"use client"

import { ResponseSummaryFinancialStatusProjects, ResponseSummaryFinancialStatusProjectsOverview } from "@/types/Reports";
import { dataPagination } from "@/utils/helper";
import { Button, Card, Flex, Group, NumberFormatter, Pagination, Paper, rem, Select, Stack, Table, Text, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { OpenGenerateFinancialPerProjects } from "./page.modal_generate_financial_per_projects";
import { SessionData } from "@/types/utils";

export default function PageContent({
    session_data,
    summary_data
}: { session_data: SessionData, summary_data: ResponseSummaryFinancialStatusProjectsOverview }) {

    const total_records = summary_data.total_records
    const total_contract_cost = summary_data.total_contract_cost
    const total_paid = summary_data.total_paid
    const total_balance = summary_data.total_balance

    const [projects, setProjects] = useState<ResponseSummaryFinancialStatusProjects[]>(summary_data.data)
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
            <Text fz="h2" fw="bold">Financial Status per Project</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Records</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_records} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Contract Cost</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_contract_cost)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Paid</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_paid)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Balance</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_balance)} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateFinancialPerProjects(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Project Name</Table.Th>
                            <Table.Th>Code</Table.Th>
                            <Table.Th>Contractor</Table.Th>
                            <Table.Th>Taker</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Start Date</Table.Th>
                            <Table.Th>Target Date</Table.Th>
                            <Table.Th>Contract Cost</Table.Th>
                            <Table.Th>Paid</Table.Th>
                            <Table.Th>Balance</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projects.map((project, index) => (
                            <Table.Tr key={index}>
                                <Table.Td fw="bold">{project.project_name}</Table.Td>
                                <Table.Td fw="bold">{project.project_code}</Table.Td>
                                <Table.Td fw="bold">{project.contractor_name}</Table.Td>
                                <Table.Td fw="bold">{project.taker_name}</Table.Td>
                                <Table.Td fw="bold">{project.project_status}</Table.Td>
                                <Table.Td fw="bold">{project.project_start_date}</Table.Td>
                                <Table.Td fw="bold">{project.project_target_date}</Table.Td>
                                <Table.Td fw="bold">
                                    <NumberFormatter value={Number(project.project_contract_cost)} thousandSeparator />
                                </Table.Td>
                                <Table.Td fw="bold">
                                    <NumberFormatter value={Number(project.project_paid)} thousandSeparator />
                                </Table.Td>
                                <Table.Td fw="bold">
                                    <NumberFormatter value={Number(project.project_contract_cost) - Number(project.project_paid)} thousandSeparator />
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