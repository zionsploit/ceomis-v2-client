"use client"

import { ResponseContractors } from "@/types/Settings";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { Text } from "@/components/Text";

export default function ContractorsTable({
    contractors,
}: Readonly<{contractors: Array<ResponseContractors>}>) {
    const pageTitleContext = useContext(PageTitleContext)
    const [contractorsData, setContractorsData] = useState<Array<ResponseContractors>>(contractors)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setContractorsData(await getSearchResults(contractors, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pageTitleContext.mutateState({
            title: "Contractor",
            description: "A list of all the contractors registered in the system."
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
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href="contractors/add" size="sm" leftSection={<IconPlus />}>ADD CONTRACTOR</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th w={px("700")}>Contractor Name</Table.Th>
                    <Table.Th>Address</Table.Th>
                    <Table.Th>Contact Information</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {contractorsData.length > 0 ? contractorsData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td>
                        <Anchor component={Link} href={`contractors/${data.id}/view`} fz="md" fw={600} underline="never">{data.name }</Anchor>
                    </Table.Td>
                    <Table.Td>
                        <Text fz={data.address_municipality.isEmpty() ? "xs" : "md"} label={data.address_municipality.isEmpty() ? "No Address" : data.address_municipality} />
                    </Table.Td>
                    <Table.Td>
                        <Flex justify="space-between">
                            <Text fz={data.contact_number.isEmpty() ? "xs" : "md"} label={data.contact_number.isEmpty() ? "No Contact" : data.contact_number} />
                            <Flex gap="md">
                                <Anchor component={Link} href={`contractors/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`contractors/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
                            </Flex>
                        </Flex>
                    </Table.Td>
                </Table.Tr>
                ): <Table.Tr>
                        <Table.Td align="center" colSpan={4} fz="xs" fw="bold">NO SEARCH RESULT</Table.Td>
                    </Table.Tr>
                }
            </Table.Tbody>
        </Table>
    </>
}