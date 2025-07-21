"use client"

import { ResponseBarangays } from "@/types/Settings";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { Text } from "@/components/Text";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";

export default function BarangayTable({
    barangays
}: Readonly<{barangays: Array<ResponseBarangays>}>) {
    const pageTitleContext = useContext(PageTitleContext)
    const [barangayData, setBarangayData] = useState<Array<ResponseBarangays>>(barangays)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setBarangayData(await getSearchResults(barangays, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pageTitleContext.mutateState({
            title: "Barangays",
            description: "A list of all the barangays registered in the system."
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
                disabled={barangays.length == 0}
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href="barangays/add" size="sm" leftSection={<IconPlus />}>ADD BARANGAY</Button>
        </Group>
        <Table mt="xl" highlightOnHoverColor="">
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Barangay</Table.Th>
                    <Table.Th w={px("500")}>Type</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {barangayData.length > 0 ? barangayData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td flex={1}>
                        <Flex gap="xs" align="center">
                            <Text fw={600} label={data.name} ft="medium" />
                            <Text fz="sm" c="gray" component="span" label={data.is_poblacion ? "(Poblacion)" : ""} />
                        </Flex>
                    </Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={2} label={data.barangay_type ?? ""} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`barangays/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`barangays/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
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