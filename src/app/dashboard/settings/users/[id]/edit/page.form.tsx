"use client"

import { Text } from "@/components/Text";
import { ResponseUserRoles, ResponseUsersWithFullInfo } from "@/types/Users";
import { useState } from "react";
import UserAccountInfoForm from "./page.form.user_account_info";
import { Box, Divider } from "@mantine/core";
import UserAccount from "./page.form.user_account";
import { SessionData } from "@/types/utils";

export default function UsersEditForm({
    session_data,
    users,
    roles,
}: Readonly<{session_data: SessionData, users: ResponseUsersWithFullInfo, roles: Array<ResponseUserRoles>}>) {
    const [usersData] = useState<ResponseUsersWithFullInfo>(users);

    return <>
        <Box>
            <Text label="User Account Information" ft="title" />
            <UserAccountInfoForm session_data={session_data} usersId={users.user_id} usersInfo={usersData.user_info} />
        </Box>
        <Divider my="md" />
        <Box>
            <Text label="User Account Credentials" ft="title" />
            <UserAccount session_data={session_data} roles={roles} users={usersData} />
        </Box>
    </>
}