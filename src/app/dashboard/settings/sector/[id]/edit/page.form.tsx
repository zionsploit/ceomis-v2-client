"use client"

import { ResponseSector } from "@/types/Settings";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { Form, Formik } from "formik";
import { Button, Group, TextInput } from "@mantine/core";
import Link from "next/link";
import { Text } from "@/components/Text";
import { actionUpdateSector } from "./page.form_action";
import { SessionData } from "@/types/utils";
import { sectorSchema } from "../../add/page.content";

export default function SectorEditForm({
    session_data,
    sector
}: Readonly<{session_data: SessionData, sector: ResponseSector}>) {
    const [state, formAction, pending] = useActionState(actionUpdateSector, { message: ResponseDefaultMessage.None, response_data: { id: 0, name: "" } })
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
        <Text label="Edit Sector" ft="title" />
        <Formik
            initialValues={{name: sector.name}}
            validationSchema={sectorSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: sector.id,
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
                        <Button component={Link} href={"/dashboard/settings/sector"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}