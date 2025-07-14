import { startTransition, useActionState, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { actionDeleteSectorById } from './page.form_action'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { Form, Formik } from 'formik'
import { redirect } from 'next/navigation'
import { Button, Flex, PasswordInput } from '@mantine/core'
import Link from 'next/link'
import { SessionData } from '@/types/utils'

const sectorDeleteFormSchema = yup.object().shape({
    user_password: yup.string().required("Password is required")
})

export default function SectorDeleteForm({
    session_data,
    id
}: Readonly<{ session_data: SessionData, id: number }>) {
    const [state, formAction, pending] = useActionState(actionDeleteSectorById, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastRefId = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastRefId.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) {
            updateSuccessNotication(toastRefId.current)
            redirect("/dashboard/settings/sector")
        }
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastRefId.current)

    }, [state, pending])

    return <>
        <Formik
            initialValues={{ user_password: "" }}
            validationSchema={sectorDeleteFormSchema}
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
            {({values, errors, handleBlur, handleChange, touched, handleSubmit}) => (
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
                        <Button component={Link} href={'/dashboard/settings/sector'} variant="outline" size="xs" mt="sm">Cancel</Button>
                        <Button loading={pending} size="xs" mt="sm" onClick={() => handleSubmit()}>Confirm</Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    </>
}