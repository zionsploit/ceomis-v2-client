"use client"

import { ResponseUserRoles } from "@/types/Users";
import { startTransition, useActionState, useContext, useEffect, useRef, useState } from "react";
import { PageTitleContext, PageTitleContextDefault } from "../../../page.title.context";
import { Button, Group, PasswordInput, Select, TextInput } from "@mantine/core";
import Link from "next/link";
import * as yup from "yup"
import { Form, Formik } from "formik";
import { actionAddAddUser } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";

export const addUsersSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    user_role: yup.string().required("User role is required")
})

export default function UsersAddForm({
    usersRoles
}: Readonly<{usersRoles: Array<ResponseUserRoles>}>) {
    const [usersRolesData] = useState<Array<ResponseUserRoles>>(usersRoles)
    const pagesTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddAddUser, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pagesTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Users",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            initialValues={{ email: "", password: "", user_role: "" }}
            validationSchema={addUsersSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        ...value,
                        user_role: parseInt(value.user_role),
                    })
                })
            }}
        >
            {({ values, errors, touched, handleBlur, handleChange, setValues }) => (
                <Form>
                    <Group grow>
                        <TextInput
                            type="email"
                            name="email"
                            label="Email Address"
                            value={values.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.email && errors.email ? errors.email : null}
                        />
                        <PasswordInput
                            type="password"
                            name="password"
                            label="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && errors.password ? errors.password : null}
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
                            data={usersRolesData.map((data) => {
                                return {
                                    label: `${data.name.toString()} ${data.name == "System Admin" ? "(Not Allowed)" : ""}`,
                                    value: data.id.toString(),
                                    disabled: data.name == "System Admin"
                                }
                            })}
                        />
                    </Group>
                    <Group mt="md" align="center" justify="end">
                        <Button component={Link} href={"/dashboard/settings/users"} variant="outline">Cancel</Button>
                        <Button loading={pending} type="submit" variant="filled">Submit</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}