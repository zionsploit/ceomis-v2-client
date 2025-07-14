"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { ResponseProjectsByFund } from "@/types/Settings";
import { dataPagination, getSearchResults } from "@/utils/helper";
import { Anchor, Button, Flex, Group, Loader, NumberFormatter, Pagination, px, rem, Select, Table, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function PageTable({
    projects
}: Readonly<{projects: Array<ResponseProjectsByFund>}>) {
    const [projectsData, setProjectsData] = useState<Array<ResponseProjectsByFund>>([])
    const [projectResultsSearch, setProjectResultsSearch] = useState<Array<ResponseProjectsByFund>>(projects)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")
    const [totalPaginate, setTotalPaginate] = useState<number>(0)
    const [currentPageSize, setCurrentPageSize] = useState<string | null>("10")
    const [currentPage, setCurrentPage] = useState<number>(1)

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setProjectResultsSearch(await getSearchResults(projects, query, "projects_name"))
        setSearchLoading(false)
    }, 500)    

    useEffect(() => {
        const pages = dataPagination(projectResultsSearch, currentPage, Number(currentPageSize ?? 10))
        setTotalPaginate(pages.totalPages)
        setProjectsData(pages.data)

    }, [projectResultsSearch, currentPage, currentPageSize])

    const OnHandlerSearchChange = (value: ChangeEvent<HTMLInputElement>) => {
        setSearchData(value.currentTarget.value)
        OnDebounceHandlerSearchData(value.currentTarget.value.trim())
    }

    
    return <>
        <Text ft="mediumTitle" label={"City Funded Projects"} />
        <Text ft="medium" label={"A list of all the city funded projects entered in the system."} />
        <Paper my="md">
            <Group w={rem("100%")}>
                <TextInput flex={1}
                    placeholder="Search here ..."
                    onChange={OnHandlerSearchChange}
                    value={searchData}
                    rightSection={searchLoading && <Loader size="xs" />}
                />
                <Button component={Link} href="city-funded/add" size="sm" leftSection={<IconPlus />}>ADD CITY FUND PROJECTS</Button>
            </Group>
            <Table mt="xl" highlightOnHoverColor="">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={px("50")}>#</Table.Th>
                        <Table.Th w={px("500")}>Project Name</Table.Th>
                        <Table.Th w={px("300")}>Code</Table.Th>
                        <Table.Th w={px("300")}>Contract Cost</Table.Th>
                        <Table.Th w={px("300")}>Contractor</Table.Th>
                        <Table.Th w={px("400")}>Status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {projectsData.length > 0 ? projectsData.map((data, index) => 
                    <Table.Tr key={index}>
                        <Table.Td fz="xs" fw="bold">{data.projects_id}</Table.Td>
                        <Table.Td flex={1}>
                            <Anchor component={Link} href={`city-funded/${data.projects_id}/view`} fw="bold" underline="never">{data.projects_name}</Anchor>
                        </Table.Td>
                        <Table.Td flex={1}>
                            <Text fw={600} label={data.project_code} ft="medium" />
                        </Table.Td>
                        <Table.Td flex={1}>
                            <Text fw={600} label={<NumberFormatter value={data.contract_cost ?? 0} thousandSeparator />} ft="medium" />
                        </Table.Td>
                        <Table.Td flex={1}>
                            <Text fw={600} label={data.contractor_name ?? "-"} ft="medium" />
                        </Table.Td>
                        <Table.Td flex={1}>
                            <Flex justify="space-between">
                                <Text fw={600} label={data.project_status ?? "NO STATUS"} ft="medium" />
                                <Flex gap="md">
                                    <Anchor component={Link} href={`city-funded/${data.projects_id}/edit`} fz="md" underline="never" fw={500}>Edit</Anchor>
                                </Flex>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    ): <Table.Tr>
                            <Table.Td align="center" colSpan={6} fz="xs" fw="bold">NO SEARCH RESULT</Table.Td>
                        </Table.Tr>
                    }
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
    </>
}