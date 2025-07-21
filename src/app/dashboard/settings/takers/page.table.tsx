"use client"

import { ResponseTakers } from "@/types/Settings";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { Text } from "@/components/Text";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";

export default function TakersTable({
    takers
}: Readonly<{takers: Array<ResponseTakers>}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [takersData, setTakersData] = useState<Array<ResponseTakers>>(takers)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setTakersData(await getSearchResults(takers, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pagesTitleContext.mutateState({
            title: "Takers",
            description: "A list of all the project takers registered in the system."
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
                disabled={takers.length == 0}
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href="takers/add" size="sm" leftSection={<IconPlus />}>ADD TAKERS</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Name</Table.Th>
                    <Table.Th flex={2}>Contact</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {takersData.length > 0 ? takersData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td fz="xs" fw="bold">{data.name}</Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={1} label={data.contact_number ?? ""} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`takers/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`takers/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
                            </Flex>
                        </Flex>
                    </Table.Td>
                </Table.Tr>
                ): <Table.Tr>
                        <Table.Td align="center" colSpan={3} fz="xs" fw="bold">NO DATA RESULT</Table.Td>
                    </Table.Tr>
                }
            </Table.Tbody>
        </Table>
    </>
}