"use client"

import { Text } from "@/components/Text";
import { ResponseUsersWithFullInfo } from "@/types/Users";
import { Alert, Button, Divider, Group } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionDeleteUser } from "./page.content_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SessionData } from "@/types/utils";

export default function UserDeleteContent({
    session_data,
    user
}: Readonly<{session_data: SessionData, user: ResponseUsersWithFullInfo}>) {
    const [state, formAction, pending] = useActionState(actionDeleteUser, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null) 

    useEffect(() => {
        
        if (pending) {
            toastIdRef.current = notificationShow()
        }

        if (state.message == ResponseDefaultMessage.Success) {
            updateSuccessNotication(toastIdRef.current)
            redirect("/dashboard/settings/users")
        } else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)
        
    }, [state, pending])

    return <>
        <Alert variant="light" color="red" title={`Deleting User - ${user.user_email}`} icon={<IconInfoCircle />}>
            <Text ft="smallTitle" label="Upon deletion, the user will no longer appear in the system. Reactivation can only be done by the system administrator." />
            <Divider my="lg" />
            <Group>
                <Button component={Link} href={"/dashboard/settings/users"} variant="filled">Back</Button>
                <Button loading={pending} onClick={() => {
                    startTransition(() => {
                        formAction({
                            data: {
                                id: user.user_id
                            },
                            session_data: session_data
                        })
                    })
                }} variant="outline">Delete</Button>
            </Group>
        </Alert>
    </>
}