"use client"

import { Paper } from "@/components/Paper";
import { ResponseViewProjectsById } from "@/types/Settings";
import { ActionIcon, Alert, Anchor, Avatar, AvatarGroup, Badge, Button, Card, Center, Divider, Flex, Group, NumberFormatter, PasswordInput, Stack, Table, Text } from "@mantine/core";
import { IconAlertTriangle, IconPrinter } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import * as yup from "yup"
import { disposedActionProject } from "./page.dispose_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { redirect } from "next/navigation";
import { OpenUpdateInfraCodeModal } from "./page.modal_projects_infra_code";
import { OpenUpdateRemarksModal } from "./page.modal_projects_remarks";
import { OpenDeleteRemarksModal } from "./page.modal_projects_remarks_delete";
import { OpenAddProjectsPaymentModal } from "./page.modal_projects_payment";
import { getProjectBalance, getProjectsTotalPaid } from "@/utils/helper";
import { OpenDeletePaymentModal } from "./page.modal_projects_payment_delete";
import { OpenGenerateProjectsProfileModal } from "./page.modal_projects_generate_project_profile";
import { OpenGenerateProjectsRemarksModal } from "./page.modal_projects_generate_project_remarks";
import { SessionData } from "@/types/utils";

const disposeProjectSchema = yup.object({
    user_password: yup.string().required("Password is required").default("")
})

export default function PageContent({
    session_auth,
    projects,
}: Readonly<{session_auth: SessionData,projects: ResponseViewProjectsById}>) {
    const projects_info = projects.projects_info
    const projects_remarks_img = projects.projects_remarks_image
    const projects_remarks = projects.projects_remarks
    const project_payments = projects.projects_payment
    
    const [state, formAction, pending] = useActionState(disposedActionProject, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {

        if (pending) toastIdRef.current = notificationShow()

        if (state.message == ResponseDefaultMessage.Success) {
            updateSuccessNotication(toastIdRef.current)
            redirect("/dashboard/projects/city-funded")
        } else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])


    return <>
        <Stack>
            <Group align="end">
                <Stack flex={1} gap={0}>
                    <Text fz="h2" fw="bold" c="mis-orange">{projects_info.projects_name}</Text>
                    <Badge radius="md" size="lg" variant="dot" color="cyan">{projects_info.projects_status}</Badge>
                </Stack>
                <Flex gap="sm" justify="flex-end" flex={1}>
                    <ActionIcon size="lg">
                        <IconPrinter onClick={() => OpenGenerateProjectsProfileModal(projects_info, session_auth)} />
                    </ActionIcon>
                    <Button>Get Started</Button>
                    <Button component={Link} href={"/dashboard/projects/city-funded"}>Back</Button>
                </Flex>
            </Group>
            <Paper>
                <Stack gap={0}>
                    <Text fz="lg" fw="bold">Project Information</Text>
                    <Text fz="sm" c="dimmed">Project details & document</Text>
                </Stack>
                <Divider my="md" />
                <Stack gap={"xl"}>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Code</Text>
                            <Text fz="lg" fw={400}>{projects_info.projects_code ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Barangay</Text>
                            <Group>
                                {(projects_info.projects_barangay != undefined && projects_info.projects_barangay.length > 0) ? projects_info?.projects_barangay?.map((barangay, index) => <Badge variant="outline" size="lg" key={index} my={5}>{barangay.name}</Badge>) : <Badge color="red" variant="outline" size="lg" my={5}>None</Badge>}
                            </Group>
                        </Stack>
                    </Group>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Appropriation</Text>
                            <Text fz="lg" fw={400}><NumberFormatter value={Number(projects_info.projects_appropriation ?? 0)} thousandSeparator /></Text>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Approved Budget Contract</Text>
                            <Text fz="lg" fw={400}><NumberFormatter value={Number(projects_info.projects_approved_budget_contract ?? 0)} thousandSeparator /></Text>
                        </Stack>
                    </Group>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Project type</Text>
                            <Text fz="lg" fw={400}>{projects_info.s_types_name ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Category</Text>
                            <Text fz="lg" fw={400}>{projects_info.s_category_name ?? "None"}</Text>
                        </Stack>
                    </Group>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Source of funds</Text>
                            <Text fz="lg" fw={400}>{projects_info.s_sof_name ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Mode of implementation</Text>
                            <Text fz="lg" fw={400}>{projects_info.s_incharge_name ?? "None"}</Text>
                        </Stack>
                    </Group>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Sustainable development goal</Text>
                            <Group>
                                {(projects_info.projects_sdg != undefined && projects_info.projects_sdg.length > 0 ) ? projects_info?.projects_sdg?.map((sdg, index) => <Badge variant="outline" size="lg" key={index} my={5}>{sdg.name}</Badge>) : <Badge color="red" variant="outline" size="lg" my={5}>None</Badge>}
                            </Group>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Sector</Text>
                            <Group>
                                {(projects_info.projects_sector != undefined && projects_info.projects_sector.length > 0) ? projects_info?.projects_sector?.map((sector, index) => <Badge variant="outline" size="lg" key={index} my={5}>{sector.name}</Badge>) : <Badge color="red" variant="outline" size="lg" my={5}>None</Badge>}
                            </Group>
                        </Stack>
                    </Group>
                </Stack>
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Text fz="lg" fw="bold">Contract Details</Text>
                    <Text fz="sm" c="dimmed">Contract details of the project</Text>
                </Stack>
                <Divider my="md" />
                <Stack gap={"xl"}>
                    <Group align="start" grow>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Contractor</Text>
                            <Text fz="lg" fw={400}>{projects_info.contractor_name ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0}>
                            <Text fz="md" fw={600} c="dimmed">Contract cost</Text>
                            <Text fz="lg" fw={400}><NumberFormatter value={Number(projects_info.projects_contract_cost ?? 0)} thousandSeparator /></Text>
                        </Stack>
                    </Group>
                    <Group align="start">
                        <Stack gap={0} flex={2}>
                            <Text fz="md" fw={600} c="dimmed">Start date</Text>
                            <Text fz="lg" fw={400}>{projects_info.projects_start_date ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0} flex={1}>
                            <Text fz="md" fw={600} c="dimmed">Target date</Text>
                            <Text fz="lg" fw={400}>{projects_info.projects_target_date ?? "None"}</Text>
                        </Stack>
                        <Stack gap={0} flex={1}>
                            <Text fz="md" fw={600} c="dimmed">Number Of Days</Text>
                            <Text fz="lg" fw={400}>{projects_info.projects_target_date ? dayjs(projects_info.projects_target_date).diff(projects_info.projects_start_date, "day").toString() : "None"}</Text>
                        </Stack>
                    </Group>
                </Stack>
            </Paper>
            <Paper>
                <Flex align="center" justify="space-between">
                    <Stack gap={0}>
                        <Text fz="lg" fw="bold">Infra Code</Text>
                        <Text fz="sm" c="dimmed">{projects_info.infra_code ?? "None"}</Text>
                    </Stack>
                    <Button onClick={() => OpenUpdateInfraCodeModal(projects_info, session_auth)}>Assign Infra Code</Button>
                </Flex>
            </Paper>
            <Paper>
                <Flex mb="md" align="center" justify="space-between">
                    <Stack gap={0}>
                        <Text fz="lg" fw="bold">Monitoring remarks</Text>
                    </Stack>
                    <Group>
                        <ActionIcon disabled={projects_remarks.length == 0} size="lg">
                            <IconPrinter onClick={() => OpenGenerateProjectsRemarksModal(projects_info, session_auth)} />
                        </ActionIcon>
                        <Button onClick={() => OpenUpdateRemarksModal(projects_info, session_auth)}>Add Remarks</Button>
                    </Group>
                </Flex>
                {projects_remarks.length == 0 ? <Alert>
                    <Center>NONE</Center>
                </Alert> : projects_remarks.map((remarks, index) => (
                    <Card withBorder my="sm" key={index}>
                        <Flex align="center" justify="space-between">
                            <Stack gap={0}>
                                <Text>{remarks.remarks}</Text>
                                <Group align="center" gap="xs">
                                    <Text fz="xs" c="dimmed" fw={600}>{remarks.remarks_date}</Text>
                                    <Anchor onClick={() => OpenDeleteRemarksModal(remarks, session_auth)} fz="xs" fw="bolder" underline="never">Remove</Anchor>
                                </Group>
                            </Stack>
                            <AvatarGroup>
                                {projects_remarks_img.filter((project) => project.remarks_id == remarks.id).map((img, index) => (
                                    <Avatar key={index} src={`http://projects-images.s3.web.garage.localhost:3902/${img.images_key}`} />
                                ))}
                            </AvatarGroup>
                        </Flex>
                    </Card>
                ))}
            </Paper>
            <Paper>
                <Stack gap={0}>
                    <Text fz="lg" fw="bold">Courses of action</Text>
                </Stack>
                <Divider my="md" />
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Processed By</Table.Th>
                            <Table.Th>Date & time</Table.Th>
                            <Table.Th>Remarks</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td colSpan={4} align="center">
                                <Alert>NO DATA</Alert>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Paper>
            <Paper>
                <Flex align="center" justify="space-between">
                    <Stack gap={0}>
                        <Text fz="lg" fw="bold">Payments</Text>
                    </Stack>
                    <Button onClick={() => OpenAddProjectsPaymentModal(projects_info, session_auth)}>Add Payments</Button>
                </Flex>
                <Divider my="md" />
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Billing Date</Table.Th>
                            <Table.Th>Processed by</Table.Th>
                            <Table.Th>Amount Due</Table.Th>
                            <Table.Th>Amount Paid</Table.Th>
                            <Table.Th>Reference No.</Table.Th>
                            <Table.Th>Date of Payment</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {project_payments.length > 0 ? project_payments.map((payment, index) => <Table.Tr key={index}>
                            <Table.Td>
                                {payment.billing_date}
                            </Table.Td>
                            <Table.Td>
                                {payment.processed_by}
                            </Table.Td>
                            <Table.Td>
                                {payment.amount_due}
                            </Table.Td>
                            <Table.Td>
                                <NumberFormatter value={payment.amount_paid} thousandSeparator />
                            </Table.Td>
                            <Table.Td>
                                {payment.reference_no}
                            </Table.Td>
                            <Table.Td>
                                {payment.payment_date}
                            </Table.Td>
                            <Table.Td>
                                <Anchor onClick={() => OpenDeletePaymentModal(payment, session_auth)} underline="never" fw="bold" fz="sm">Remove</Anchor>
                            </Table.Td>
                        </Table.Tr>) : <Table.Tr>
                            <Table.Td colSpan={7} align="center">
                                <Alert>NO DATA</Alert>
                            </Table.Td>
                        </Table.Tr>}
                    </Table.Tbody>
                </Table>
                <Divider my="md" />
                <Group>
                    <Text c="green" fw={"bold"} fz="sm">
                        Total Amount:{" "}
                        <NumberFormatter value={projects_info.projects_contract_cost ?? 0} thousandSeparator />
                    </Text>
                    <Divider orientation="vertical" />
                     <Text c="green" fw={"bold"} fz="sm">
                        Total Balance:{" "}
                        <NumberFormatter value={getProjectBalance(project_payments.map((val) => val.amount_paid), projects_info.projects_contract_cost ?? 0)} thousandSeparator />
                    </Text>
                    <Divider orientation="vertical" />
                    <Text c="green" fw={"bold"} fz="sm">
                        Total Paid:{" "}
                        <NumberFormatter value={getProjectsTotalPaid(project_payments.map((val) => val.amount_paid))} thousandSeparator />
                    </Text>
                </Group>
            </Paper>
            <Paper>
                <Stack gap="md">
                    <Text fz="lg" fw="bold">Dispose Projects?</Text>
                    <Text fz="sm" c="dimmed">Archiving these projects will remove them from active lists. To restore disposed projects in the future, you must contact IT or your database administrator.</Text>
                    <Alert title="Warning" icon={<IconAlertTriangle />}>
                        <Text fz="sm" c="dimmed">Disposal is irreversible without admin assistance. Ensure you no longer need these projects before proceeding.</Text>
                    </Alert>
                </Stack>
                <Formik
                    initialValues={disposeProjectSchema.getDefault()}
                    validationSchema={disposeProjectSchema}
                    onSubmit={(value) => {
                        startTransition(() => {
                            formAction({
                                session_data: session_auth,
                                data: {
                                    id: projects_info.projects_id,
                                    user_password: value.user_password
                                }
                            })
                        })
                    }}
                >
                    {({values, touched, errors, handleBlur, handleChange}) => (
                        <Form>
                            <Group my="md" align="end" justify="space-between">
                                <PasswordInput
                                    flex={1}
                                    label="Enter your password"
                                    name="user_password"
                                    value={values.user_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.user_password && errors.user_password ? errors.user_password : null}
                                />
                                <Button loading={pending} type="submit" color="red">Dispose</Button>
                            </Group>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Stack>
    </>
}