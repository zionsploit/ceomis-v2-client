"use client"

import { Text } from "@/components/Text";
import { ResponseSustainableDevelopmentGoals } from "@/types/Settings";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";

export default function SdgTable({
    sdg,
}: {sdg: Array<ResponseSustainableDevelopmentGoals>}) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [sdgData, setSdgData] = useState<Array<ResponseSustainableDevelopmentGoals>>(sdg)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setSdgData(await getSearchResults(sdg, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pagesTitleContext.mutateState({
            title: "Sustainable Development Goals",
            description: "A list of all the sustainable development goals registered in the system."
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
                disabled={sdg.length == 0}
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href={'sdg/add'} size="sm" leftSection={<IconPlus />} >ADD SDG</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Name</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {sdgData.length > 0 ? sdgData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={1} label={data.name} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`sdg/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`sdg/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
                            </Flex>
                        </Flex>
                    </Table.Td>
                </Table.Tr>
                ): <Table.Tr>
                        <Table.Td align="center" colSpan={2} fz="xs" fw="bold">NO DATA RESULT</Table.Td>
                    </Table.Tr>}
            </Table.Tbody>
        </Table>
    </>
}