"use client"

import { ResponseBarangays } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Checkbox, Group, Radio, Stack, TextInput } from "@mantine/core";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateBarangay } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { SessionData } from "@/types/utils";
import { barangaySchema } from "../../add/page.content";

export default function BarangayEditForm({
    session_data,
    barangay
}: Readonly<{session_data: SessionData, barangay: ResponseBarangays}>) {
    const [state, formAction, pending] = useActionState(actionUpdateBarangay, {
        message: ResponseDefaultMessage.None,
        response_data: {name: "", id: 0, barangay_type: null, is_poblacion: false}
    })
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
            initialValues={{ name: barangay.name, is_poblacion: barangay.is_poblacion, barangay_type: barangay.barangay_type != null ? barangay.barangay_type : "None" }}
            validationSchema={barangaySchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: barangay.id,
                            name: value.name,
                            barangay_type: value.barangay_type == "None" 
                                ? null 
                                : value.barangay_type == "Rural" 
                                    ? "Rural" : "Urban",
                            is_poblacion: value.is_poblacion
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({values, handleChange, handleBlur, touched, errors, setValues}) => (
                <Form>
                    <Stack gap="xl">
                        <TextInput
                            name="name"
                            label="Barangay Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={touched.name && errors.name ? errors.name : null}
                        />
                        <Radio.Group
                            label="What type of barangay?"
                            name="barangay_type"
                            value={values.barangay_type}
                            onChange={(value) => setValues({
                                    ...values,
                                    barangay_type: value
                                })}
                            onBlur={handleBlur}

                        >
                            <Stack gap="xs">
                                <Radio value={"Rural"} label="Rural" />
                                <Radio value={"Urban"} label="Urban" />
                                <Radio value={"None"} label="None" />
                            </Stack>
                        </Radio.Group>
                        <Checkbox
                            label="Is the barangay a Poblacion?"
                            description="If so, please tick the box."
                            checked={values.is_poblacion}
                            onChange={(event) => setValues({
                                ...values,
                                is_poblacion: event.currentTarget.checked,
                            })}
                        />
                        <Group mt="md" align="center" justify="end">
                            <Button component={Link} href={"/dashboard/settings/barangays"} variant="outline">Cancel</Button>
                            <Button loading={pending} type="submit" variant="filled">Submit</Button>
                        </Group>
                    </Stack>
                </Form>
            )}
        </Formik>
    </>
}