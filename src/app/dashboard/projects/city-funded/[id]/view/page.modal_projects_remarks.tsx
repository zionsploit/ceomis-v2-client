"use cliet"

import { ResponseProjectsById } from "@/types/Settings"
import { ActionIcon, Alert, Badge, Box, Button, Divider, Flex, Group, Image, rem, SimpleGrid, Stack, Text, Textarea } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { modals } from "@mantine/modals"
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react"
import { useListState } from "@mantine/hooks"
import NextImage from 'next/image'
import * as yup from "yup"
import { Form, Formik } from "formik"
import { startTransition, useActionState, useEffect, useRef } from "react"
import { addProjectsRemarks } from "./page.modal_projects_remarks_action"
import { ResponseDefaultMessage } from "@/entity/Response.enum"
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification"
import { SessionData } from "@/types/utils"

const addAddMonitoringSchema = yup.object({
    remarks_date: yup.string().nullable().required("Remarks Date is required").default(null),
    remarks: yup.string().required("Remarks is required").default(""),
})

export const OpenUpdateRemarksModal = (projects: ResponseProjectsById, session_data: SessionData) => modals.open({
    title: <Text>UPDATE MONITORING</Text>,
    size: rem("2000"),
    children: <UpdateRemarks session_data={session_data} projects={projects} />
})

const UpdateRemarks = ({projects, session_data}: {projects: ResponseProjectsById, session_data: SessionData}) => {
    const [files, setFilesHandler] = useListState<FileWithPath[]>([]);
    const [state, formAction, pending] = useActionState(addProjectsRemarks, { message: ResponseDefaultMessage.None, response_data: "" })
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
                initialValues={addAddMonitoringSchema.getDefault()}
                validationSchema={addAddMonitoringSchema}
                onSubmit={(value) => {
                    startTransition(() => {
                        formAction({
                            data: {
                                remarks: value.remarks,
                                remarks_date: value.remarks_date ?? "",
                                project_id: projects.projects_id,
                                files: files.map((file) => file[0])
                            },
                            session_data: session_data
                        })
                    })
                }}
            >
                {({ values, errors, handleBlur, handleChange, touched, setFieldValue }) => (
                    <Form>
                        <DatePickerInput
                            label="Date"
                            name="remarks_date"
                            value={values.remarks_date}
                            onChange={(value) => setFieldValue("remarks_date", value)}
                            onBlur={handleBlur}
                            error={touched.remarks_date && errors.remarks_date ? errors.remarks_date : null}
                        />
                        <Textarea
                            rows={6}
                            label="Remarks"
                            name="remarks"
                            value={values.remarks}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.remarks && errors.remarks ? errors.remarks : null}
                        />
                        <Divider my="md" />
                        <Dropzone
                            onDrop={(files) => setFilesHandler.append(files)}
                            onReject={(files) => console.log('rejected files: ', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            <Group justify="center" gap="xl" mih={100} style={{ pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                                </Dropzone.Idle>

                                <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text>
                                </div>
                            </Group>
                        </Dropzone>
                        <Divider />
                        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={files.length > 0 ? 'xl' : 0}>
                            {files.map((files, index) => {
                                const file = files[0]

                                const imageUrl = URL.createObjectURL(file);
                                return <Box pos={"relative"} key={index}>
                                    <ActionIcon pos="absolute" top={-10} left={-10} color="red" onClick={() => setFilesHandler.remove(index)} radius="xl"><IconX /></ActionIcon>
                                    <Image component={NextImage} width={100} height={100} loading="lazy" alt={file.name} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
                                </Box>;
                                
                            })}
                        </SimpleGrid>
                        <Divider my="md" />
                        <Flex mt="md" justify="space-between" align="center">
                            <Alert color="cyan" p="xs">
                                <Text fw={500} fz="sm">After making updates, please refresh the page to see the latest changes.</Text>
                            </Alert>
                            <Button loading={pending} type="submit">Submit</Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Stack>
    </>
}