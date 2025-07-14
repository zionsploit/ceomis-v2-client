import { Anchor, Button, Checkbox, Flex, PasswordInput, Stack, TextInput, ThemeIcon } from "@mantine/core"
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { actionLogin } from "./login.form_action"
import { RequestUserLogin } from "@/types/Users"
import { startTransition, useActionState, useEffect, useRef } from "react"
import { ResponseLoginMessage } from "@/entity/Response.enum"
import { notifications } from "@mantine/notifications"
import { IconAlertTriangle, IconClock, IconX } from '@tabler/icons-react';
import { redirect } from "next/navigation"

const loginSchema = yup.object().shape({
    email: yup.string().email('@ is required').required('Email is required.'),
    password: yup.string().required('Password is required')
})


export const LoginForm = () => {
    const toastIdRef = useRef<string | null>(null);
    const [state, formAction, pending] = useActionState(actionLogin,
        { message: ResponseLoginMessage.NoResponse, response: "" }
    );

    useEffect(() => {
        const stateMessage = state.message

        if (pending) {
            toastIdRef.current = notifications.show({
                loading: true,
                title: 'Loading',
                message: "Please wait... we're logging you in.",
                icon: <IconClock />,
                autoClose: true,
                withCloseButton: false,
            });
        }

        if (stateMessage != ResponseLoginMessage.NoResponse && !pending) {
            if (stateMessage == ResponseLoginMessage.LoginSuccess) {
                redirect("/dashboard/home")

            } else if (stateMessage == ResponseLoginMessage.InvalidCredentials) {
                notifications.update({
                    id: toastIdRef.current ?? undefined,
                    title: 'INVALID CREDENTIALS',
                    message: 'Oops! Your email or password is incorrect. Please try again.',
                    icon: <ThemeIcon variant="white" size="lg" color="red"><IconX stroke={5} /></ThemeIcon>,
                    loading: false,
                    autoClose: 5000,
                });
            } else if (stateMessage == ResponseLoginMessage.SomethingWentWrong) {
                notifications.update({
                    id: toastIdRef.current ?? undefined,
                    title: 'SOMETHING WENT WRONG',
                    message: 'An unexpected error occurred. Please try again later.',
                    loading: false,
                    icon: <ThemeIcon variant="white" size="xl" color="yellow"><IconAlertTriangle /></ThemeIcon>,
                    autoClose: 5000,
                });
            }

            toastIdRef.current = null; // Reset

        }
    }, [state, pending])

    return <>
        <Formik
            initialValues={{email: '', password: ''} as RequestUserLogin}
            validationSchema={loginSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction(value)
                })
            }}
        >
            {({values, handleChange, handleBlur, touched, errors}) => (
                <Form>
                    <Stack>
                        <TextInput
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email ? errors.email : null}
                            value={values.email}
                        />
                        <PasswordInput
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && errors.password ? errors.password : null}
                            value={values.password}
                        />
                        <Flex justify="space-between" align="center">
                            <Checkbox label="Remember Me" />
                            <Anchor underline="never" fw={"bold"} fz="sm">Forgot your password?</Anchor>
                        </Flex>
                        <Button loading={pending} type="submit">Sign In</Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    </>
}