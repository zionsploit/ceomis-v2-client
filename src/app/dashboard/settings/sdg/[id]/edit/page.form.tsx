'use client'

import { ResponseSustainableDevelopmentGoals } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Group, TextInput } from "@mantine/core";
import Link from "next/link";
import { Text } from "@/components/Text";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateSdg } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { sdgSchema } from "../../add/page.content";
import { SessionData } from "@/types/utils";

export default function SdgEditForm({
    session_data,
    sdg,
}: { session_data: SessionData, sdg: ResponseSustainableDevelopmentGoals }) {
    const [state, formAction, pending] = useActionState(actionUpdateSdg, {
        message: ResponseDefaultMessage.None, response_data: {id: 0, name: ""}
    })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRef.current = notificationShow()
        }

        if (stateMessage != ResponseDefaultMessage.None) {
            if (stateMessage == ResponseDefaultMessage.Success) {
                updateSuccessNotication(toastIdRef.current)
            } else {
                updateFailureNotification(toastIdRef.current)
            }
        }
    }, [state, pending])

    return <>
        <Text label="Edit Sustainable Development Goal" ft="title" />
       <Formik
            initialValues={{name: sdg.name}}
            validationSchema={sdgSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: sdg.id,
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
                    <Group mt="md" align="center" justify="end">
                        <Button component={Link} href={"/dashboard/settings/sdg"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}