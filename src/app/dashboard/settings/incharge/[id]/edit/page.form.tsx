"use client"

import { Text } from "@/components/Text";
import { ResponseIncharge } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Group, TextInput } from "@mantine/core";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateIncharge } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { inchargeSchema } from "../../add/page.content";
import { SessionData } from "@/types/utils";

export default function InchargeEditForm({
    session_data,
    incharge
}: Readonly<{session_data: SessionData, incharge: ResponseIncharge}>) {
    const [state, formAction, pending] = useActionState(actionUpdateIncharge, {message: ResponseDefaultMessage.None, response_data: { id: 0, name: "" }})
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
        <Text label="Edit Incharge" ft="title" />
        <Formik
            initialValues={{name: incharge.name}}
            validationSchema={inchargeSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: incharge.id,
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
                        <Button component={Link} href={"/dashboard/settings/incharge"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}