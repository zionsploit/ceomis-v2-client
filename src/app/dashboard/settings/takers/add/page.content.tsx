"use client"

import { PageTitleContext, PageTitleContextDefault } from '@/app/dashboard/page.title.context'
import { startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { actionAddTakers } from './page.action'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { Form, Formik } from 'formik'
import { Button, Group, TextInput } from '@mantine/core'
import Link from 'next/link'
import { SessionData } from '@/types/utils'

export const takersSchema = yup.object().shape({
    name: yup.string().required("Takers name is required"),
    contact_number: yup.string().nullable()
})

export default function Content({
    session_data,
}: Readonly<{session_data: SessionData}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddTakers, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pagesTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Project Takers",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const stateMessage = state.message

        if (pending) toastIdRef.current = notificationShow()

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [pending, state])

    return <>
        <Formik
            initialValues={{ name: "", contact_number: "" }}
            validationSchema={takersSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: value,
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
                        value={values.contact_number}
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