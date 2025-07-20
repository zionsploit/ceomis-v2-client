"use client"

import { ResponseSector } from "@/types/Settings";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import Link from "next/link";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";
import { Text } from "@/components/Text";
import { IconPlus } from "@tabler/icons-react";

export default function SectorsTable({
    sectors
}: Readonly<{sectors: Array<ResponseSector>}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [sectorData, setSectorData] = useState<Array<ResponseSector>>(sectors)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setSectorData(await getSearchResults(sectors, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pagesTitleContext.mutateState({
            title: "Sector",
            description: "A list of all the sectors registered in the system."
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const OnHandlerSearchChange = (value: ChangeEvent<HTMLInputElement>) => {
        setSearchData(value.currentTarget.value)
        OnDebounceHandlerSearchData(value.currentTarget.value.trim())
    }

    return <>
        <Group w={rem("100%")}>
            <TextInput flex={1} 
                disabled={sectors.length == 0}
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href="sector/add" size="sm" leftSection={<IconPlus />}>ADD TYPE</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Sector Name</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {sectorData.length > 0 ? sectorData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={1} label={data.name} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`sector/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`sector/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
                            </Flex>
                        </Flex>
                    </Table.Td>
                </Table.Tr>
                ): <Table.Tr>
                        <Table.Td align="center" colSpan={2} fz="xs" fw="bold">NO DATA RESULT</Table.Td>
                    </Table.Tr>
                }
            </Table.Tbody>
        </Table>
    </>
}