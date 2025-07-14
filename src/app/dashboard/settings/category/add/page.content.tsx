"use client"

import { PageTitleContext, PageTitleContextDefault } from '@/app/dashboard/page.title.context'
import { startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { actionAddCategory } from './page.action'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { Form, Formik } from 'formik'
import { Button, Group, TextInput } from '@mantine/core'
import Link from 'next/link'
import { SessionData } from '@/types/utils'


export const categorySchema = yup.object().shape({
    name: yup.string().required("Caegory name is required")
})

export default function Content({
    session_data,
}: Readonly<{session_data: SessionData}>) {
    const pagesTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddCategory, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pagesTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Project Category",
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
            validationSchema={categorySchema}
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
                        label="Category Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
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