"use client"

import { PageTitleContext, PageTitleContextDefault } from '@/app/dashboard/page.title.context'
import { startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { actionAddSector } from './page.action'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { Form, Formik } from 'formik'
import { Button, Group, TextInput } from '@mantine/core'
import Link from 'next/link'
import { SessionData } from '@/types/utils'

export const sectorSchema = yup.object().shape({
    name: yup.string().required("Type name is required")
})

export default function Content({
    session_data,
}: Readonly<{session_data: SessionData}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddSector, {message: ResponseDefaultMessage.None, response_data: ""})
        const toastIdRef = useRef<string | null>(null)
    
    useEffect(() => {
        pagesTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Project Sector",
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
            initialValues={{ name: "" }}
            validationSchema={sectorSchema}
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
                        label="Type Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
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