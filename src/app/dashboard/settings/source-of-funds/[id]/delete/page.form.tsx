"use client"

import { Button, Flex, PasswordInput } from "@mantine/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import * as yup from "yup"
import { actionDeleteSofById } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { redirect } from "next/navigation";
import { SessionData } from "@/types/utils";

const sofDeleteFormSchema = yup.object().shape({
    user_password: yup.string().required("Password is required")
})


export default function SofDeleteForm({
    session_data,
    id,
}: Readonly<{session_data: SessionData, id: number }>) {
    const [state, formAction, pending] = useActionState(actionDeleteSofById, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastIdRed = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRed.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) {
            updateSuccessNotication(toastIdRed.current)
            redirect('/dashboard/settings/source-of-funds')
        }
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRed.current)

    }, [state, pending])

    return <>
        <Formik
            initialValues={{ user_password: "" }}
            validationSchema={sofDeleteFormSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: id,
                            user_password: value.user_password
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
                <Form>
                    <PasswordInput
                        description="Please confirm."
                        placeholder="Enter your password"
                        name="user_password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.user_password}
                        error={touched.user_password && errors.user_password ? errors.user_password : null}
                    />
                    <Flex gap="md">
                        <Button component={Link} href={'/dashboard/settings/source-of-funds'} variant="outline" size="xs" mt="sm">Cancel</Button>
                        <Button loading={pending} size="xs" mt="sm" onClick={() => handleSubmit()}>Confirm</Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    </>
}