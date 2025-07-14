'use client'

import { Text } from "@/components/Text";
import { ResponseSourceOfFunds } from "@/types/Settings";
import { Button, Group, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateSof } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { sdgSchema } from "../../../sdg/add/page.content";
import { SessionData } from "@/types/utils";

export default function SofEditForm({
    session_data,
    sof,
}: Readonly<{session_data: SessionData, sof: ResponseSourceOfFunds}>) {
    const [state, formAction, pending] = useActionState(actionUpdateSof, {message: ResponseDefaultMessage.None, response_data: {id: 0, name: ""}})
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRef.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])

    return <>
        <Text label="Edit Source Of Funds Goal" ft="title" />
        <Formik
            initialValues={{ name: sof.name }}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: sof.id,
                            name: value.name
                        },
                        session_data: session_data
                    })
                })
            }}
            validationSchema={sdgSchema}
        >
            {({values, errors, touched, handleBlur, handleChange}) => (
                <Form>
                    <TextInput
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && errors.name ? errors.name : null}
                    />
                    <Group mt="md" align="center" justify="end">
                        <Button component={Link} href={"/dashboard/settings/source-of-funds"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}