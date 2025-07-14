"use client"

import { Paper } from "@/components/Paper"
import { ResponseSummaryListOfProjects, ResponseSummaryListOfProjectsOverview } from "@/types/Reports"
import { dataPagination } from "@/utils/helper"
import { Button, Card, Flex, Group, NumberFormatter, Pagination, rem, Select, Stack, Table, Text, ThemeIcon } from "@mantine/core"
import { IconPrinter } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { OpenGenerateProjectsSummary } from "./page.modal_generate_projects_summary"
import { SessionData } from "@/types/utils"

export default function PageContent({
    session_data,
    summary_data
}: {session_data: SessionData, summary_data: ResponseSummaryListOfProjectsOverview}) {
    const total_projects = summary_data.total_records
    const total_appropriation = summary_data.total_appropriation
    const total_contract_cost = summary_data.total_contract_cost

    const [projects, setProjects] = useState<ResponseSummaryListOfProjects[]>(summary_data.summary_list_of_reports)
    const [totalPaginate, setTotalPaginate] = useState<number>(0)
    const [currentPageSize, setCurrentPageSize] = useState<string | null>("10")
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        const pages = dataPagination(summary_data.summary_list_of_reports, currentPage, Number(currentPageSize ?? 10))
        setTotalPaginate(pages.totalPages)
        setProjects(pages.data)

    }, [currentPage, currentPageSize, summary_data.summary_list_of_reports])

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Summary List of Projects</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Records</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_projects} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Appropriation</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_appropriation)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Contract Cost</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_contract_cost)} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button 
                        onClick={() => OpenGenerateProjectsSummary(session_data)}
                        leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}
                    >Generate Report</Button>
                </Flex>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>Project Name</Table.Th>
                            <Table.Th>Appropriation</Table.Th>
                            <Table.Th>Contractor</Table.Th>
                            <Table.Th>Source of Fund</Table.Th>
                            <Table.Th>Project Year</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projects.map((project, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{project.project_id}</Table.Td>
                                <Table.Td>{project.project_name}</Table.Td>
                                <Table.Td>
                                    <NumberFormatter value={Number(project.project_appropriation)} thousandSeparator />
                                </Table.Td>
                                <Table.Td>{project.contractor_name ?? "-"}</Table.Td>
                                <Table.Td>{project.sof_name}</Table.Td>
                                <Table.Td>{project.project_year}</Table.Td>
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