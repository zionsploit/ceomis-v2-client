"use client"

import { ResponseUsersWithRoles } from "@/types/Users";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PageTitleContext } from "../../page.title.context";
import { Anchor, Button, Flex, Group, Loader, px, rem, Table, TextInput } from "@mantine/core";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { useDebouncedCallback } from "@mantine/hooks";
import { getSearchResults } from "@/utils/helper";
import { Text } from "@/components/Text";

export default function UsersWithRolesTable({
    usersWithRoles
}: Readonly<{usersWithRoles: Array<ResponseUsersWithRoles>}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [usersData, setUsersData] = useState<Array<ResponseUsersWithRoles>>(usersWithRoles)
    const [searchLoading, setSearchLoading] = useState<boolean>(false)
    const [searchData, setSearchData] = useState<string>("")

    const OnDebounceHandlerSearchData = useDebouncedCallback(async (query: string) => {
        setSearchLoading(true)
        setUsersData(await getSearchResults(usersWithRoles, query, "email"))
        setSearchLoading(false)
    }, 500)


    useEffect(() => {
        pagesTitleContext.mutateState({
            title: "Users",
            description: "A list of all the users registered in the system."
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
                disabled={usersWithRoles.length == 0}
                placeholder="Search here ..."
                onChange={OnHandlerSearchChange}
                value={searchData}
                rightSection={searchLoading && <Loader size="xs" />}
            />
            <Button component={Link} href="users/add" size="sm" leftSection={<IconPlus />}>ADD USERS</Button>
        </Group>
        <Table mt="xl" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th w={px("50")}>#</Table.Th>
                    <Table.Th flex={1}>Email Address</Table.Th>
                    <Table.Th flex={2}>Office</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {usersData.length > 0 ? usersData.map((data, index) => 
                <Table.Tr key={index}>
                    <Table.Td fz="xs" fw="bold">{index + 1}</Table.Td>
                    <Table.Td>
                        <Text fw={600} flex={1} label={data.email} ft="medium" />
                    </Table.Td>
                    <Table.Td>
                        <Flex>
                            <Text fw={600} flex={2} label={data.user_roles?.name ?? ""} ft="medium" />
                            <Flex gap="md">
                                <Anchor component={Link} href={`users/${data.user_id}/edit`} fz="md" fw={600} underline="never">Edit</Anchor>
                                <Anchor component={Link} href={`users/${data.user_id}/delete`} fz="md" fw={600} underline="never">Delete</Anchor>
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