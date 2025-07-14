"use client"

import { ResponseProjectRemarks } from "@/types/Settings"
import { Alert, Button, Flex, PasswordInput, rem, Stack, Text } from "@mantine/core"
import { modals } from "@mantine/modals"
import { Form, Formik } from "formik"
import { startTransition, useActionState, useEffect, useRef } from "react"
import * as yup from 'yup'
import { deleteProjectRemarks } from "./page.modal_projects_remarks_delete_action"
import { ResponseDefaultMessage } from "@/entity/Response.enum"
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification"
import { SessionData } from "@/types/utils"

const deleteRemarksSchema = yup.object({
    user_password: yup.string().required("Password is required").default("")
}) 

export const OpenDeleteRemarksModal = (remarks: ResponseProjectRemarks, session_data: SessionData) => modals.open({
    title: <Text>Delete Project Remarks Confirmation</Text>,
    size: rem("1000"),
    children: <DeleteRemarks session_data={session_data} remarks={remarks} />
})

const DeleteRemarks = ({remarks, session_data}: {remarks: ResponseProjectRemarks, session_data: SessionData}) => {
    const [state, formAction, pending] = useActionState(deleteProjectRemarks, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastRefId = useRef<string | null>(null)

    useEffect(() => {

        if (pending) toastRefId.current = notificationShow()

        if (state.message == ResponseDefaultMessage.Success) updateSuccessNotication(toastRefId.current)
        else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastRefId.current)

    }, [state, pending])

    return <>
        <Alert title={`Deleting - # ${remarks.id} - ${remarks.remarks}`}>
            <Text>This action cannot be undone. All data will be lost permanently.</Text>
            <Formik
                initialValues={deleteRemarksSchema.getDefault()}
                validationSchema={deleteRemarksSchema}
                onSubmit={(value) => {
                    startTransition(() => {
                        formAction({
                            data: {
                                id: remarks.id,
                                user_password: value.user_password
                            },
                            session_data: session_data
                        })
                    })
                }}
            >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                    <Form>
                        <Stack mt="md">
                            <PasswordInput
                                label={<Text fz="xs" fw={600} c="dimmed">Please Confirm</Text>}
                                name="user_password"
                                value={values.user_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.user_password && errors.user_password ? errors.user_password : null}
                            />
                            <Flex mt="md" justify="space-between" align="center">
                                <Alert color="cyan" p="xs">
                                    <Text fw={500} fz="sm">After deleting, please refresh the page to see the latest changes.</Text>
                                </Alert>
                                <Button loading={pending} type="submit" variant="light">Delete</Button>
                            </Flex>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Alert>
    </>
}