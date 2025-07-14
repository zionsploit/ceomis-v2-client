"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { ResponsePrepareAllSettings, ResponseViewProjectsById } from "@/types/Settings";
import { Box, Button, Divider, Flex, Group, Select, Stack, TextInput, Text as MText, ScrollArea, rem, Grid, Checkbox, Alert, ActionIcon, NumberInput, Textarea,  } from "@mantine/core";
import { FastField, Form, Formik } from "formik";
import Link from "next/link";
import { projectsFormSchema } from "../../add/page.form";
import { DatePickerInput, YearPickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { useListState } from "@mantine/hooks";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { actionUpdateProjects } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { ProjectStatus } from "@/types/Projects";
import { parseProjectsStatus } from "@/utils/helper";
import { SessionData } from "@/types/utils";

export default function UpdateProjects({
    session_data,
    projects_settings,
    projects_data,
}: Readonly<{session_data: SessionData, projects_settings: ResponsePrepareAllSettings, projects_data: ResponseViewProjectsById}>) {
    const [state, formAction, pending] = useActionState(actionUpdateProjects, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)
    
    const projects_data_info = projects_data.projects_info
    const projects_data_info_barangay = projects_data_info.projects_barangay
    const projects_data_info_sdg = projects_data_info.projects_sdg
    const projects_data_info_sector = projects_data_info.projects_sector

    const projectbarangay = projects_settings.s_barangay
    const projectContractor = projects_settings.contractors
    const projectDataType = projects_settings.s_type
    const projectCategories = projects_settings.s_categories
    const projectSourceOfFunds = projects_settings.s_sof
    const projectIncharge = projects_settings.s_incharge
    const projectSdg = projects_settings.s_sdg
    const projectSector = projects_settings.s_sector
    const projectTakers = projects_settings.s_takers

    const [selectedBarangay, setSelectedBarangay] = useListState(projectbarangay.map((value) => {
        return {
            checked: projects_data_info_barangay?.find((val) => val.id == value.id) ? true : false,
            ...value
        }
    }))
    const [selectedSdg, setSelectedSdg] = useListState(projectSdg.map((value) => {
        return {
            checked: projects_data_info_sdg?.find((val) => val.id == value.id) ? true : false,
            ...value
        }
    }))
    const [selectedSector, setSelectedSector] = useListState(projectSector.map((value) => {
        return {
            checked: projects_data_info_sector?.find((val) => val.id == value.id) ? true : false,
            ...value
        }
    }))

    useEffect(() => {
        const stateMessage = state.message

        if (pending) toastIdRef.current = notificationShow()

        if (stateMessage == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (stateMessage == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])


    // const updateHaveAnError = (value: boolean) => setHaveInputError(value)

    return <>
        <Flex align="center" justify="space-between">
            <Text ft="mediumTitle" label={`Update Projects - ${projects_data_info.projects_code}`} />
            <Button variant="light" component={Link} href="/dashboard/projects/brgy-funded">Back</Button>
        </Flex>
        <Paper my="lg">
            <Formik
                initialValues={{
                    ...projectsFormSchema.getDefault(),
                    project_name: projects_data_info.projects_name,
                    project_code: projects_data_info.projects_code,
                    project_year: dayjs().year(projects_data_info.project_year),
                    project_status: parseProjectsStatus(projects_data_info.projects_status),
                    appropriation: projects_data_info.projects_appropriation,
                    approved_budget_contact: projects_data_info.projects_approved_budget_contract ?? 0,
                    contractor_id: String(projectContractor.find((v) => v.name == projects_data_info.contractor_name)?.id),
                    contract_cost: projects_data_info.projects_contract_cost,
                    start_date: projects_data_info.projects_start_date,
                    target_date: projects_data_info.projects_target_date,
                    project_type_id: String(projectDataType.find((v) => v.name == projects_data_info.s_types_name)?.id),
                    project_category_id: String(projectCategories.find((v) => v.name == projects_data_info.s_category_name)?.id),
                    project_sof_id: String(projectSourceOfFunds.find((v) => v.name == projects_data_info.s_sof_name)?.id),
                    project_incharge_id: String(projectIncharge.find((v) => v.name == projects_data_info.s_incharge_name)?.id),
                    project_takers_id: String(projectTakers.find((v) => v.name == projects_data_info.s_takers_name)?.id),
                    accomplished: projects_data_info.projects_accomplished,
                    remarks: projects_data_info.projects_remarks
                }}
                validationSchema={projectsFormSchema}
                onSubmit={(value) => {
                    const barangay = selectedBarangay.filter((data) => data.checked).map((data) => data.id)
                    const sdg = selectedSdg.filter((data) => data.checked).map((data) => data.id)
                    const sector = selectedSector.filter((data) => data.checked).map((data) => data.id)

                    startTransition(() => {
                        formAction({
                            data: {
                                id: projects_data_info.projects_id,
                                project_year: Number(dayjs(value.project_year).year()),
                                project_name: value.project_name,
                                project_code: value.project_code,
                                project_status: value.project_status as ProjectStatus,
                                barangays: barangay,
                                appropriation: value.appropriation,
                                approved_budget_contact: value.approved_budget_contact,
                                contractor_id: Number(value.contractor_id),
                                contract_cost: value.contract_cost,
                                start_date: value.start_date,
                                calendar_days: null,
                                time_extensions: null,
                                target_date: value.target_date,
                                project_type_id: Number(value.project_type_id),
                                project_category_id: Number(value.project_category_id),
                                project_sof_id: Number(value.project_sof_id),
                                project_incharge_id: Number(value.project_incharge_id),
                                sustainable_development_goals: sdg,
                                sector: sector,
                                project_takers_id: Number(value.project_takers_id),
                                accomplished: value.accomplished,
                                remarks: value.remarks,
                                prepared_users_id: Number(session_data.users.id)
                            },
                            session_data: session_data
                        })   
                    })
                }}
            >
                {() => (
                    <Form>
                        <Text label="Project Details" ft="smallTitle" />
                        <Divider label="General Information of the project" labelPosition="left" />
                        <Stack my="md">
                            <FastField name="project_name">
                                {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                         <TextInput
                                                type="text"
                                                label="Project Name"
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue(field.name, value.currentTarget.value)}
                                                onBlur={() => form.setFieldTouched(field.name, true)}
                                                error={meta.touched && meta.error ? meta.error : null}
                                            />
                                    )
                                }
                            </FastField>
                            <Group grow>
                                <FastField name="project_code">
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <TextInput
                                            type="text"
                                            label="Project Code"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value.currentTarget.value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                                <FastField name="project_year">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <YearPickerInput
                                            label="Project Year"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                                <FastField name="project_status">
                                        {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            label="Project Status"
                                            value={field.value || null} // Handle undefined values
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={[
                                                {
                                                    value: "NotYetStarted",
                                                    label: "Not Yet Started"
                                                }, {
                                                    value: "Preparation",
                                                    label: "Preparation"
                                                }, {
                                                    value: "Bidding",
                                                    label: "Bidding"
                                                }, {
                                                    value: "Bidded",
                                                    label: "Bidded"
                                                }, {
                                                    value: "OnGoing",
                                                    label: "On Going"
                                                }, {
                                                    value: "Completed",
                                                    label: "Completed"
                                                }, {
                                                    value: "Suspended",
                                                    label: "Suspended"
                                                }
                                            ]}
                                        />
                                    )}
                                </FastField>
                            </Group>
                            <Stack>
                                <Divider />
                                <Group align="start">
                                    <Box flex={1}>
                                        <MText my="sm">Barangays</MText>
                                        <ScrollArea h={rem("300")}>
                                            <Grid w={rem("90%")}>
                                                {selectedBarangay.map((barangay, index) => <Grid.Col span={3} key={index}>
                                                    <Checkbox 
                                                        label={barangay.name} 
                                                        checked={barangay.checked}
                                                        onChange={(event) => setSelectedBarangay.setItemProp(index, "checked", event.currentTarget.checked)}
                                                    />
                                                </Grid.Col>
                                                )}
                                            </Grid>
                                        </ScrollArea>
                                    </Box>
                                    <Divider orientation="vertical" />
                                    <Box flex={1}>
                                        <MText my="sm">Selected Barangay</MText>
                                        {selectedBarangay.filter((data) => data.checked).length == 0 ? <>
                                            <Alert icon={<IconAlertCircle />} color="yellow">
                                                <MText fz="sm" fw={500}>No Barangay Data Selected</MText>
                                            </Alert>
                                        </> : null}
                                        <Group>
                                            {selectedBarangay.filter((data) => data.checked)
                                            .map((barangay, index) => <Flex gap="xs" align="center" key={index}>
                                                <ActionIcon onClick={() => {
                                                    const getIndex = selectedBarangay.findIndex((value) => value.id == barangay.id)

                                                    setSelectedBarangay.setItemProp(getIndex, "checked", false)
                                                }} variant="light" size="sm">
                                                    <IconX />
                                                </ActionIcon>
                                                <MText>{barangay.name}</MText>
                                            </Flex>)}
                                        </Group>
                                    </Box>
                                </Group>
                                <Divider />
                            </Stack>
                            <Group grow>
                                <FastField name="appropriation">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <NumberInput  
                                            hideControls
                                            label="Appropriation"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                                <FastField name="approved_budget_contact">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <NumberInput 
                                            hideControls
                                            label="Approved Budget Contract"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                            </Group>
                        </Stack>
                        <Box my="lg">
                            <Text label="Contract Details" ft="smallTitle" />
                            <Divider label="It's inclusive dates and amounts relative to the contract" labelPosition="left" />
                        </Box>
                        <Stack gap="md">
                            <Group grow>
                                <FastField name="contractor_id">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            clearable
                                            label="Contractor"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={projectContractor.map((contractor) => {
                                                return {
                                                    label: contractor.name,
                                                    value: String(contractor.id)
                                                }
                                            })}
                                        />
                                    )}
                                </FastField>
                                <FastField name="contract_cost">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <NumberInput 
                                            hideControls
                                            label="Contractor Cost"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                            </Group>
                            <Group grow>
                                <FastField name="start_date">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <DatePickerInput
                                            label="Start Date"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                                <FastField name="target_date">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <DatePickerInput
                                            label="Target Date"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                        />
                                    )}
                                </FastField>
                            </Group>
                        </Stack>
                        <Box my="lg">
                            <Text label="Checklists" ft="smallTitle" />
                            <Divider label="Check the data according to where to project belongs" labelPosition="left" />
                        </Box>
                        <Stack gap="md">
                            <Group grow>
                                <FastField name="project_type_id">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            label="Project Type"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={projectDataType.map((value) => {
                                                return {
                                                    label: value.name,
                                                    value: String(value.id)
                                                }
                                            })}
                                        />
                                    )}
                                </FastField>
                                <FastField name="project_category_id">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            label="Project Categories"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={projectCategories.map((value) => {
                                                return {
                                                    label: value.name,
                                                    value: String(value.id)
                                                }
                                            })}
                                        />
                                    )}
                                </FastField>
                            </Group>
                            <Group grow>
                                <FastField name="project_sof_id">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            label="Project Source of funds"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={projectSourceOfFunds.map((value) => {
                                                return {
                                                    label: value.name,
                                                    value: String(value.id)
                                                }
                                            })}
                                        />
                                    )}
                                </FastField>
                                <FastField name="project_incharge_id">
                                    {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                        <Select
                                            label="Project Mode of implementation"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue(field.name, value)}
                                            onBlur={() => form.setFieldTouched(field.name, true)}
                                            error={meta.touched && meta.error ? meta.error : null}
                                            data={projectIncharge.map((value) => {
                                                return {
                                                    label: value.name,
                                                    value: String(value.id)
                                                }
                                            })}
                                        />
                                    )}
                                </FastField>
                            </Group>
                        </Stack>
                        <Stack>
                            <Divider mt="md" />
                            <Group align="start">
                                <Box flex={1}>
                                    <MText my="sm">Sustainable Development Goals</MText>
                                    <ScrollArea h={rem("300")}>
                                        <Grid w={rem("90%")}>
                                            {selectedSdg.map((sdg, index) => <Grid.Col span={5} key={index}>
                                                <Checkbox 
                                                    label={sdg.name} 
                                                    checked={sdg.checked}
                                                    onChange={(event) => setSelectedSdg.setItemProp(index, "checked", event.currentTarget.checked)}
                                                />
                                            </Grid.Col>
                                            )}
                                        </Grid>
                                    </ScrollArea>
                                </Box>
                                <Divider orientation="vertical" />
                                <Box flex={1}>
                                    <MText my="sm">Selected Development Goals</MText>
                                    {selectedSdg.filter((data) => data.checked).length == 0 ? <>
                                        <Alert icon={<IconAlertCircle />} color="yellow">
                                            <MText fz="sm" fw={500}>No Development Goals Data Selected</MText>
                                        </Alert>
                                    </> : null}
                                    <Group>
                                        {selectedSdg.filter((data) => data.checked)
                                        .map((sdg, index) => <Flex gap="xs" align="center" key={index}>
                                            <ActionIcon onClick={() => {
                                                const getIndex = selectedSdg.findIndex((value) => value.id == sdg.id)

                                                setSelectedSdg.setItemProp(getIndex, "checked", false)
                                            }} variant="light" size="sm">
                                                <IconX />
                                            </ActionIcon>
                                            <MText>{sdg.name}</MText>
                                        </Flex>)}
                                    </Group>
                                </Box>
                            </Group>
                            <Divider />
                        </Stack>
                        <Stack>
                            <Group mt="md" align="start">
                                <Box flex={1}>
                                    <MText my="sm">Sector</MText>
                                    <ScrollArea h={rem("300")}>
                                        <Grid w={rem("90%")}>
                                            {selectedSector.map((sector, index) => <Grid.Col span={5} key={index}>
                                                <Checkbox 
                                                    label={sector.name} 
                                                    checked={sector.checked}
                                                    onChange={(event) => setSelectedSector.setItemProp(index, "checked", event.currentTarget.checked)}
                                                />
                                            </Grid.Col>
                                            )}
                                        </Grid>
                                    </ScrollArea>
                                </Box>
                                <Divider orientation="vertical" />
                                <Box flex={1}>
                                    <MText my="sm">Selected Sector</MText>
                                    {selectedSector.filter((data) => data.checked).length == 0 ? <>
                                        <Alert icon={<IconAlertCircle />} color="yellow">
                                            <MText fz="sm" fw={500}>No Sector Data Selected</MText>
                                        </Alert>
                                    </> : null}
                                    <Group>
                                        {selectedSector.filter((data) => data.checked)
                                        .map((sector, index) => <Flex gap="xs" align="center" key={index}>
                                            <ActionIcon onClick={() => {
                                                const getIndex = selectedSector.findIndex((value) => value.id == sector.id)

                                                setSelectedSector.setItemProp(getIndex, "checked", false)
                                            }} variant="light" size="sm">
                                                <IconX />
                                            </ActionIcon>
                                            <MText>{sector.name}</MText>
                                        </Flex>)}
                                    </Group>
                                </Box>
                            </Group>
                            <Divider />
                        </Stack>
                        <Group my="md" grow>
                            <FastField name="project_takers_id">
                                {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                    <Select
                                        label="Project Takers"
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                        onBlur={() => form.setFieldTouched(field.name, true)}
                                        error={meta.touched && meta.error ? meta.error : null}
                                        data={projectTakers.map((data) => {
                                            return {
                                                label: data.name,
                                                value: String(data.id)
                                            }
                                        })}
                                    />
                                )}
                            </FastField>
                            <FastField name="accomplished">
                                {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                    <NumberInput
                                        label="Accomplished %"
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value)}
                                        onBlur={() => form.setFieldTouched(field.name, true)}
                                        error={meta.touched && meta.error ? meta.error : null}
                                        hideControls
                                        min={0}
                                        max={100}
                                    />
                                )}
                            </FastField>
                        </Group>
                        <FastField name="remarks">
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ({ field, form, meta }: { field: any; form: any; meta: any }) => (
                                <Textarea
                                    label="Remarks"
                                    rows={3}
                                    value={field.value ?? ""}
                                    onChange={(value) => form.setFieldValue(field.name, value.currentTarget.value)}
                                    onBlur={() => form.setFieldTouched(field.name, true)}
                                    error={meta.touched && meta.error ? meta.error : null}
                                />
                            )}
                        </FastField>
                        <Flex my="md" justify="space-between">
                            <Text c="dimmed" ft="small" fs="italic" label={`Prepared By ${session_data.users.email}`} />
                            <Group>
                                {/* {haveInputError ? <Text c="red" label={"Some fields have errors. Please check your input."} /> : null} */}
                                <Button type="submit">Submit</Button>    
                            </Group>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Paper>
    </>
}