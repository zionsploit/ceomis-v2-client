"use client"

import { ResponseTakers } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Group, TextInput } from "@mantine/core";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateTakers } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import Link from "next/link";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { takersSchema } from "../../add/page.content";
import { SessionData } from "@/types/utils";

export default function TakersEditForm({
    session_data,
    takers
}: Readonly<{session_data: SessionData, takers: ResponseTakers}>) 
{
    const [state, formAction, pending] = useActionState(actionUpdateTakers, {message: ResponseDefaultMessage.None, response_data: {name: "", id: 0, contact_number: ""}})
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRef.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [pending, state])

    return <>
        <Formik
            initialValues={{ name: takers.name, contact_number: takers.contact_number ?? "" }}
            validationSchema={takersSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: takers.id,
                            contact_number: value.contact_number,
                            name: value.name
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({values, handleChange, handleBlur, touched, errors}) => (
                <Form>
                    <TextInput
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && errors.name ? errors.name : null}
                    />
                    <TextInput
                        name="contact_number"
                        label="Contact No."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact_number ?? ""}
                    />
                    <Group mt="md" align="center" justify="end">
                        <Button component={Link} href={"/dashboard/settings/takers"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}