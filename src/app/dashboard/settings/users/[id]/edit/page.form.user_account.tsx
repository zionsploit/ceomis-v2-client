import { ResponseUserRoles, ResponseUsersWithFullInfo } from "@/types/Users";
import { Form, Formik } from "formik";
import { Button, Group, PasswordInput, Select, TextInput } from "@mantine/core";
import * as yup from "yup"
import { startTransition, useActionState, useEffect, useRef } from "react";
import { updateUserAccount } from "./page.form_action.user_account";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import Link from "next/link";
import { SessionData } from "@/types/utils";


export const updateUsersSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    user_role: yup.string().required("User role is required")
})

export default function UserAccount({
    session_data,
    users,
    roles
}: Readonly<{ session_data: SessionData, users: ResponseUsersWithFullInfo, roles: Array<ResponseUserRoles> }>) {
    const [state, formAction, pending] = useActionState(updateUserAccount, { message: ResponseDefaultMessage.None, response_data: "" })
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
        initialValues={{email: users.user_email, password: "", user_role: users.user_roles?.role_id.toString() }}
        validationSchema={updateUsersSchema}
        onSubmit={(value) => {
            startTransition(() => {
                formAction({
                    data: {
                        id: users.user_id,
                        email: value.email,
                        password: value.password ?? null,
                        user_role: Number(value.user_role),
                    },
                    session_data: session_data
                })
            })
        }}
       >
        {({ errors, values, touched, handleBlur, handleChange, setValues }) => (
            <Form>
                <Group grow align="end">
                    <TextInput
                        label="Email"
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.email && touched.email ? errors.email : null}
                    />
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <Select
                        name="user_role"
                        label="Roles"
                        value={values.user_role}
                        onChange={(_, option) => setValues({
                            ...values,
                            user_role: option.value
                        })}
                        onBlur={handleBlur}
                        error={touched.user_role && errors.user_role ? errors.user_role : null}
                        data={roles.map((data) => {
                            return {
                                label: `${data.name.toString()} ${data.name == "System Admin" ? "(Not Allowed)" : ""}`,
                                value: data.id.toString(),
                                disabled: data.name == "System Admin"
                            }
                        })}
                    />
                </Group>
                <Group my="md">
                    <Button component={Link} href={"/dashboard/settings/users"} variant="light">Back</Button>
                    <Button type="submit" loading={pending}>Update</Button>
                </Group>
            </Form>
        )}
       </Formik>
    </>
}