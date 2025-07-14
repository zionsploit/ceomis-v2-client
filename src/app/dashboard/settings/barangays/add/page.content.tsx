"use client"

import { PageTitleContext, PageTitleContextDefault } from '@/app/dashboard/page.title.context'
import { startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { actionAddBarangay } from './page.action'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { Form, Formik } from 'formik'
import { Button, Checkbox, Group, Radio, Stack, TextInput } from '@mantine/core'
import Link from 'next/link'
import { SessionData } from '@/types/utils'


export const barangaySchema = yup.object().shape({
    name: yup.string().required("Type name is required"),
    is_poblacion: yup.boolean().notRequired().default(false),
    barangay_type: yup.string().notRequired().default("None")
})

export default function Content({
    session_data,
}: Readonly<{session_data: SessionData}>) {

    const pageTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddBarangay, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pageTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Project Barangay",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const stateMessage = state.message

        if (pending) toastIdRef.current = notificationShow()

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])
    
    return <>
        <Formik
            initialValues={{ name: "", is_poblacion: false, barangay_type: "None" }}
            validationSchema={barangaySchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
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