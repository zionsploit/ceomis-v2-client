"use client"

import { ResponseProjectsById } from "@/types/Settings";
import { Alert, Badge, Button, Divider, Flex, rem, Stack, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Form, Formik } from "formik";
import { ReactNode, startTransition, useActionState, useEffect, useRef } from "react";
import * as yup from "yup"
import { upsertProjectsInfraCodeAction } from "./page.modal_projects_infra_code_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import useGetProjectsInfraCodeByProjectsId from "@/hooks/component.fetch/useGetProjectsInfraCodeByProjectsId";
import { LoadingComponent } from "@/components/Response";
import { SessionData } from "@/types/utils";

export const OpenUpdateInfraCodeModal = (projects: ResponseProjectsById, session_data: SessionData) => modals.open({
    title: <Text fz="lg" fw="bold" c="dimmed">UPDATE INFRA CODE</Text>,
    size: rem("1000"),
    children: <UpdateInfraCode session_data={session_data} projects={projects} />
})

const upsertInfraCodeSchema = yup.object({
    id: yup.number().nullable().notRequired().default(null),
    projects_id: yup.number().nonNullable().required().default(null),
    projects_code: yup.string().required("Projects Infra Code is required").default("")
})

const UpdateInfraCode = ({projects, session_data}: {projects: ResponseProjectsById, session_data: SessionData}): ReactNode => {
    const [state, formAction, pending] = useActionState(upsertProjectsInfraCodeAction, {message: ResponseDefaultMessage.None, response_data: ""})
    const toastIdRef = useRef<string | null>(null)
    const { data, isValidating, isLoading } = useGetProjectsInfraCodeByProjectsId(true, projects.projects_id)

    useEffect(() => {
        if (pending) toastIdRef.current = notificationShow()

        if (state.message == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)
    }, [state, pending])

    if (isLoading || isValidating) return <LoadingComponent />

    return <>
        <Stack>
            <Stack gap={0}>
                <Text fz="lg" fw={500}>{projects.projects_name}</Text>
                <Badge size="lg" radius="md" variant="dot">{projects.projects_status}</Badge>
            </Stack>
            <Divider />
            <Formik
                initialValues={{
                    id: data?.id ?? null,
                    projects_id: Number(projects.projects_id),
                    projects_code: data?.project_code ?? ""
                }}
                validationSchema={upsertInfraCodeSchema}
                onSubmit={(value) => {
                    startTransition(() => {
                        formAction({
                            data: value,
                            session_data: session_data,
                        })
                    })
                }}
            >
                {({ errors, values, touched, handleBlur, handleChange }) => (
                    <Form>
                        <TextInput
                            label="Infra Code"
                            name="projects_code"
                            value={values.projects_code}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.projects_code && errors.projects_code ? errors.projects_code : null}
                        />
                        <Flex mt="md" justify="space-between" align="center">
                            <Alert color="cyan" p="xs">
                                <Text fw={500} fz="sm">After making updates, please refresh the page to see the latest changes.</Text>
                            </Alert>
                            <Button loading={pending} type="submit" variant="light">Submit</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Stack>
    </>
}