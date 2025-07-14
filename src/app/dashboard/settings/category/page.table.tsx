"use client"

import { ResponseCategories } from "@/types/Settings";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { Text } from "@/components/Text";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";

export default function CategoriesTable({
    categories
}: Readonly<{categories: Array<ResponseCategories>}>) {
    const pageTitleContext = useContext(PageTitleContext)
    const [categoriesData, setCategoriesData] = useState<Array<ResponseCategories>>(categories)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setCategoriesData(await getSearchResults(categories, query, "name"))
        setSearchLoading(false)
    }, 500)

    useEffect(() => {
        pageTitleContext.mutateState({
            title: "Category",
            description: "A list of all the categories registered in the system."
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
            <Button component={Link} href="category/add" size="sm" leftSection={<IconPlus />}>ADD TYPE</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Category Name</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {categoriesData.length > 0 ? categoriesData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={1} label={data.name} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`category/${data.id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`category/${data.id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
                            </Flex>
                        </Flex>
                    </Table.Td>
                </Table.Tr>
                ): <Table.Tr>
                        <Table.Td align="center" colSpan={2} fz="xs" fw="bold">NO SEARCH RESULT</Table.Td>
                    </Table.Tr>
                }
            </Table.Tbody>
        </Table>
    </>
}