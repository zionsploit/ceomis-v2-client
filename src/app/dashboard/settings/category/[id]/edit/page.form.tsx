"use client"

import { Text } from "@/components/Text";
import { ResponseCategories } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Group, TextInput } from "@mantine/core";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateCategory } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { SessionData } from "@/types/utils";
import { categorySchema } from "../../add/page.content";

export default function CategoryEditForm({
    session_data,
    category
}: Readonly<{session_data: SessionData, category: ResponseCategories}>) {
    const [state, actionForm, pending] = useActionState(actionUpdateCategory, {message: ResponseDefaultMessage.None, response_data: { id: 0, name: "" }})
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
        <Text label="Edit Category" ft="title" />
        <Formik
            initialValues={{name: category.name}}
            validationSchema={categorySchema}
            onSubmit={(value) => {
                startTransition(() => {
                    actionForm({
                        data: {
                            id: category.id,
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
                        <Button component={Link} href={"/dashboard/settings/category"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}