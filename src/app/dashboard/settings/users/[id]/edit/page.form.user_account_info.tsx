import { ResponseAccountInfoForUsersWithFullInfo } from "@/types/Users";
import { Button, Group, TextInput } from "@mantine/core";
import { Form, Formik } from "formik";
import { startTransition, useActionState, useEffect, useRef } from "react";
import * as yup from "yup"
import { updateUserAccountInfo } from "./page.form_action.user_account_info";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { SessionData } from "@/types/utils";

export const usersInfoSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    middle_name: yup.string().required("Middle Name is required"),
    last_name: yup.string().required("Last Name is required")
})


export default function UserAccountInfoForm({
    session_data,
    usersInfo,
    usersId
}: Readonly<{session_data: SessionData, usersInfo: ResponseAccountInfoForUsersWithFullInfo | null, usersId: number}>) {
    const [state, formAction, pending] = useActionState(updateUserAccountInfo, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRef.current = notificationShow()
        }

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])

    return <>
        <Formik
            initialValues={{ 
                first_name: usersInfo?.user_info_first_name ?? "", 
                middle_name: usersInfo?.user_info_middle_name ?? "",
                last_name: usersInfo?.user_info_last_name ?? ""
            }}
            validationSchema={usersInfoSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            id: usersInfo?.user_info_id ?? null,
                            first_name: value.first_name,
                            middle_name: value.middle_name,
                            last_name: value.last_name,
                            user_id: usersId
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                    <Group grow align="flex-start">
                        <TextInput
                            label="First Name"
                            name="first_name"
                            value={values.first_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.first_name && touched.first_name ? errors.first_name : null}
                        />
                        <TextInput
                            label="Middle Name"
                            name="middle_name"
                            value={values.middle_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.middle_name && touched.middle_name ? errors.middle_name : null}
                        />
                        <TextInput
                            label="Last Name"
                            name="last_name"
                            value={values.last_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.last_name && touched.last_name ? errors.last_name : null}
                        />
                    </Group>
                    <Button loading={pending} type="submit" mt="md">Update</Button>
                </Form>
            )}
        </Formik>
    </>
}