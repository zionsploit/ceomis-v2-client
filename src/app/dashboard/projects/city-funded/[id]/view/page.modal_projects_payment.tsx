"use client"

import { ResponseProjectsById } from "@/types/Settings";
import { Alert, Badge, Button, Divider, Flex, Group, NumberInput, rem, Stack, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { startTransition, useActionState, useEffect, useRef } from "react";
import * as yup from "yup"
import { actionAddProjectsPayment } from "./page.modal_projects_payment_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { SessionData } from "@/types/utils";

export const OpenAddProjectsPaymentModal = (projects: ResponseProjectsById, session_data: SessionData) => modals.open({
    title: <Text fz="lg" fw="bold" c="dimmed">ADD PROJECTS PAYMENT</Text>,
    size: rem("1000"),
    children: <AddProjectsPayment session_data={session_data} projects={projects} />
})

const addProjectsPaymentSchema = yup.object({
    billing_date: yup.string().required("Billing Date is required").default(dayjs().toDate().toDateString()),
    processed_by: yup.string().required("Processed By is required").default(""),
    amount_due: yup.string().required("Amount Due is required").default(dayjs().toDate().toDateString()),
    amount_paid: yup.number().nullable().required("Amount Paid is required").default(null),
    reference_no: yup.string().required("Reference No is required").default(""),
    payment_date: yup.string().required("Payment date is required").default(dayjs().toDate().toDateString()),
})

const AddProjectsPayment = ({projects, session_data}: {projects: ResponseProjectsById, session_data: SessionData}) => {
    const [state, formAction, pending] = useActionState(actionAddProjectsPayment, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastRefId = useRef<string | null>(null)

    useEffect(() => {
        if (pending) toastRefId.current = notificationShow()

        if (state.message == ResponseDefaultMessage.Success) updateSuccessNotication(toastRefId.current)
        else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastRefId.current)

    }, [state, pending])

    return <>
        <Stack>
            <Stack gap={0}>
                <Text fz="lg" fw={500}>{projects.projects_name}</Text>
                <Badge size="lg" radius="md" variant="dot">{projects.projects_status}</Badge>
            </Stack>
            <Divider />
            <Formik
                initialValues={addProjectsPaymentSchema.getDefault()}
                validationSchema={addProjectsPaymentSchema}
                onSubmit={(value) => {
                    startTransition(() => {
                        formAction({
                            data: {
                                ...value,
                                project_id: projects.projects_id,
                                amount_paid: Number(value.amount_paid)
                            },
                            session_data: session_data
                        })
                    })
                }}
            >
                {({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
                    <Form>
                        <Stack>
                            <Group grow>
                                <DatePickerInput
                                    label="Billing Date"
                                    name="billing_date"
                                    value={values.billing_date}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.billing_date && errors.billing_date ? errors.billing_date : null}
                                />
                                <DatePickerInput
                                    label="Amount Due"
                                    name="amount_due"
                                    value={values.amount_due}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.amount_due && errors.amount_due ? errors.amount_due : null}
                                />
                                <DatePickerInput
                                    label="Payment Date"
                                    name="payment_date"
                                    value={values.payment_date}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.payment_date && errors.payment_date ? errors.payment_date : null}
                                />
                            </Group>
                            <Group grow>
                                <TextInput
                                    label="Processed By"
                                    name="processed_by"
                                    value={values.processed_by}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.processed_by && errors.processed_by ? errors.processed_by : null}
                                />
                                <NumberInput
                                    hideControls
                                    label="Amount Paid"
                                    name="amount_paid"
                                    value={values.amount_paid ?? ""}
                                    onBlur={handleBlur}
                                    onChange={(values) => setFieldValue("amount_paid", values.toString())}
                                    error={touched.amount_paid && errors.amount_paid ? errors.amount_paid : null}
                                />
                                <TextInput
                                    label="Reference No."
                                    name="reference_no"
                                    value={values.reference_no}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.reference_no && errors.reference_no ? errors.reference_no : null}
                                />
                            </Group>
                             <Flex mt="md" justify="space-between" align="center">
                                <Alert color="cyan" p="xs">
                                    <Text fw={500} fz="sm">After making updates, please refresh the page to see the latest changes.</Text>
                                </Alert>
                                <Button loading={pending} type="submit" variant="light">Submit</Button>
                            </Flex>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    </>
}