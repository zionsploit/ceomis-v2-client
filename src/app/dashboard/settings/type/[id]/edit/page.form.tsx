"use client"

import { Text } from "@/components/Text";
import { ResponseTypes } from "@/types/Settings";
import { Button, Group, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateType } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { typesSchema } from "../../add/page.content";
import { SessionData } from "@/types/utils";

export default function TypeEditForm({
    session_data,
    types
}: Readonly<{session_data: SessionData, types: ResponseTypes}>) {
    const [state, formAction, pending] = useActionState(actionUpdateType, { message: ResponseDefaultMessage.None, response_data: { id: 0, name: "" } })
    const toastRefId = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastRefId.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastRefId.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastRefId.current)

    }, [state, pending])

    return <>
        <Text label="Edit Types" ft="title" />
        <Formik
            initialValues={{name: types.name}}
            validationSchema={typesSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: types.id,
                            name: value.name
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({values, errors, touched, handleBlur, handleChange}) => (
                <Form>
                    <TextInput
                        name="name"
                        label="Type Name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched.name && errors.name ? errors.name : null}
                    />
                    <Group mt="md" align="center" justify="end">
                        <Button component={Link} href={"/dashboard/settings/type"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}