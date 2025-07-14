"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { ResponseCategories, ResponseContractors, ResponseIncharge, ResponsePrepareAllSettings, ResponseSourceOfFunds, ResponseTakers, ResponseTypes } from "@/types/Settings";
import { Button, Divider, Flex, Group, Select, Stack, TextInput, Text as MText, Checkbox, Grid, rem, ScrollArea, Box, ActionIcon, Alert, NumberInput, Textarea } from "@mantine/core";
import { DatePickerInput, YearPickerInput } from '@mantine/dates';
import { useListState } from "@mantine/hooks";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { FastField, Form, Formik } from "formik";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import * as yup from "yup"
import { actionAddProjects } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { ProjectStatus } from "@/types/Projects";
import dayjs from "dayjs";
import { UsersData } from "@/types/utils";

export const projectsFormSchema = yup.object().shape({
    project_year: yup.date().required("Project year is required").default(new Date()),
    project_name: yup.string().required("Project name is required").default(""),
    project_code: yup.string().required("Project code is required").default(""),
    project_status: yup.string().required("Project status is required").default(""),
    appropriation: yup.number().required("Appropriation is required").default(0),
    approved_budget_contact: yup.number().required("Approved Budget contract is required").default(0),
    contractor_id: yup.string().required("Contractors is required").default(""),
    contract_cost: yup.number().required("Contractor cost is required").default(0),
    start_date: yup.string().nullable().required("Start Date is required").default(null),
    target_date: yup.string().nullable().required("Target Date is required").default(null),
    project_type_id: yup.string().required("Project type is required").default(""),
    project_category_id: yup.string().required("Project categories is required").default(""),
    project_sof_id: yup.string().required("Project Source of funds is required").default(""),
    project_incharge_id: yup.string().required("Project Incharge is required").default(""),
    project_takers_id: yup.string().required("Project takers is required").default(""),
    accomplished: yup.number().required("Accomplished is required").default(0),
    remarks: yup.string().required("Remarks is required").default("")
})

export default function AddProjects({
    users_data,
    projects_data
}: Readonly<{users_data: UsersData, projects_data: ResponsePrepareAllSettings}>) {
    const [state, formAction, pending] = useActionState(actionAddProjects, {message: ResponseDefaultMessage.None, response_data: ""})
    const [projectTakersData] = useState<Array<ResponseTakers>>(projects_data.s_takers)
    const [projectInchargeData] = useState<Array<ResponseIncharge>>(projects_data.s_incharge)
    const [projectSourceOfFundsData] = useState<Array<ResponseSourceOfFunds>>(projects_data.s_sof)
    const [projectCategoriesData] = useState<Array<ResponseCategories>>(projects_data.s_categories)
    const [projectTypeData] = useState<Array<ResponseTypes>>(projects_data.s_type)
    const [constractorsData] = useState<Array<ResponseContractors>>(projects_data.contractors)
    const [selectedSector, setSelectedSector] = useListState(projects_data.s_sector.map((value) => {
        return {
            checked: false,
            ...value
        }
    }))
    const [selectedSdg, setSelectedSdg] = useListState(projects_data.s_sdg.map((value) => {
        return {
            checked: false,
            ...value
        }
    }))
    const [selectedBarangay, setSelectedBarangay] = useListState(projects_data.s_barangay.map((value) => {
        return {
            checked: false,
            ...value
        }
    }))
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
        <Flex align="center" justify="space-between">
            <Text ft="mediumTitle" label={"Add Projects"} />
            <Button variant="light" component={Link} href="/dashboard/projects/city-funded">Back</Button>
        </Flex>
        <Paper my="lg">
            <Formik
                initialValues={projectsFormSchema.getDefault()}
                validationSchema={projectsFormSchema}
                onSubmit={(value) => {
                    const barangay = selectedBarangay.filter((data) => data.checked).map((data) => data.id)
                    const sdg = selectedSdg.filter((data) => data.checked).map((data) => data.id)
                    const sector = selectedSector.filter((data) => data.checked).map((data) => data.id)

                    startTransition(() => {
                        formAction({
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
                            prepared_users_id: Number(users_data.id)
                        })   
                    })
                }}
            >
                {() => (
                    <Form>
                        <Stack gap={0}>
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
                                    )}
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
                                                data={constractorsData.map((contractor) => {
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
                                                data={projectTypeData.map((value) => {
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
                                                data={projectCategoriesData.map((value) => {
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
                                                data={projectSourceOfFundsData.map((value) => {
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
                                                data={projectInchargeData.map((value) => {
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
                                            data={projectTakersData.map((data) => {
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
                                        value={field.value}
                                        onChange={(value) => form.setFieldValue(field.name, value.currentTarget.value)}
                                        onBlur={() => form.setFieldTouched(field.name, true)}
                                        error={meta.touched && meta.error ? meta.error : null}
                                    />
                                )}
                            </FastField>
                            <Flex my="md" justify="space-between">
                                <Text c="dimmed" ft="small" fs="italic" label={`Prepared By ${users_data.email}`} />
                                <Button type="submit">Submit</Button>
                            </Flex>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Paper>
    </>
}