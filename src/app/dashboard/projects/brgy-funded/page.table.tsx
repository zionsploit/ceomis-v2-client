"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { ResponseProjectsByFund } from "@/types/Settings";
import { getSearchResults } from "@/utils/helper";
import { Anchor, Button, Flex, Group, Loader, NumberFormatter, px, rem, Table, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function PageTable({
    projects
}: Readonly<{projects: Array<ResponseProjectsByFund>}>) {
    const [projectsData, setProjectsData] = useState<Array<ResponseProjectsByFund>>(projects)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setProjectsData(await getSearchResults(projects, query, "projects_name"))
        setSearchLoading(false)
    }, 500)    

    const OnHandlerSearchChange = (value: ChangeEvent<HTMLInputElement>) => {
        setSearchData(value.currentTarget.value)
        OnDebounceHandlerSearchData(value.currentTarget.value.trim())
    }

    
    return <>
        <Text ft="mediumTitle" label={"Brgy Funded Projects"} />
        <Text ft="medium" label={"A list of all the brgy funded projects entered in the system."} />
        <Paper my="md">
            <Group w={rem("100%")}>
                <TextInput flex={1}
                    disabled={projects.length == 0}
                    placeholder="Search here ..."
                    onChange={OnHandlerSearchChange}
                    value={searchData}
                    rightSection={searchLoading && <Loader size="xs" />}
                />
                <Button component={Link} href="brgy-funded/add" size="sm" leftSection={<IconPlus />}>ADD BRGY FUND PROJECTS</Button>
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
                        <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                        <Table.Td flex={1}>
                            <Anchor component={Link} href={`brgy-funded/${data.projects_id}/view`} fw="bold" underline="never">{data.projects_name}</Anchor>
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
                                    <Anchor component={Link} href={`brgy-funded/${data.projects_id}/edit`} fz="md" underline="never" fw={500}>Edit</Anchor>
                                </Flex>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    ): <Table.Tr>
                            <Table.Td align="center" colSpan={6} fz="xs" fw="bold">NO DATA RESULT</Table.Td>
                        </Table.Tr>
                    }
                </Table.Tbody>
            </Table>
        </Paper>
    </>
}