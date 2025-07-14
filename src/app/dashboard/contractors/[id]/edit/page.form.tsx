"use client"

import { ResponseContractors } from "@/types/Settings";
import { Form, Formik } from "formik";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { Text } from "@/components/Text";
import { startTransition, useActionState, useContext, useEffect, useRef } from "react";
import { PageTitleContext, PageTitleContextDefault } from "@/app/dashboard/page.title.context";
import Link from "next/link";
import { actionUpdateContractor } from "./page.form_action";
import { ResponseDefaultMessage } from "@/entity/Response.enum";
import { notificationShow, updateFailureNotification, updateSuccessNotication } from "@/components/Notification";
import { contractorsSchema } from "../../add/page.content";
import { SessionData } from "@/types/utils";

export default function ContractorsEditForm({
    session_data,
    contractors
}: Readonly<{session_data: SessionData, contractors: ResponseContractors}>) {
    const pageTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionUpdateContractor, { message: ResponseDefaultMessage.Success, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pageTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Edit Contractor",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        
        if (pending) toastIdRef.current = notificationShow()

        if (state.message == ResponseDefaultMessage.Success) updateSuccessNotication(toastIdRef.current)
        else if (state.message == ResponseDefaultMessage.Failure) updateFailureNotification(toastIdRef.current)

    }, [state, pending])

    return <>
        <Formik
            initialValues={contractors}
            validationSchema={contractorsSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: {
                            ...value,
                            id: contractors.id
                        },
                        session_data: session_data
                    })
                })
            }}
        >
            {({ values, errors, touched, handleBlur, handleChange }) => (
                <Form>
                    <Stack gap={0}>
                        <Text label="Personal Information" ft="smallTitle" />
                        <Text label="Use a permanent address where you can receive mail." ft="small" />
                    </Stack>
                    <Stack my="xl">
                        <Group grow>
                            <TextInput
                                label="Contractor / Company Name"
                                name="name"
                                value={values?.name ?? ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.name && touched.name ? errors.name : null}
                            />
                            <TextInput
                                type="email"
                                label="Email Address"
                                name="email_address"
                                value={values.email_address ?? ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.email_address && touched.email_address ? errors.email_address : null}
                            />
                        </Group>
                        <Group grow>
                            <TextInput
                                label="Street / Purok"
                                name="address_street"
                                value={values.address_street ?? ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.address_street && touched.address_street ? errors.address_street : null}
                            />
                            <TextInput
                                label="Barangay"
                                name="address_barangay"
                                value={values.address_barangay}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.address_barangay && touched.address_barangay ? errors.address_barangay : null}
                            />
                        </Group>
                        <Group grow>
                            <TextInput
                                label="City/Municipality"
                                name="address_municipality"
                                value={values.address_municipality}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.address_municipality && touched.address_municipality ? errors.address_municipality : null}
                            />
                            <TextInput
                                label="State/Province"
                                name="address_province"
                                value={values.address_province}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.address_province && touched.address_province ? errors.address_province : null}
                            />
                        </Group>
                        <Textarea 
                            label="About"
                            description="Optional"
                            name="about"
                            value={values.about ?? ""}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.about && touched.about ? errors.about : null}
                            rows={5}
                        />
                    </Stack>
                    <Stack gap={0}>
                        <Text label="Contact Information" ft="smallTitle" />
                        <Text label="This person will be contact during emergency." ft="small" />
                    </Stack>
                    <Stack my="xl">
                        <Group grow>
                            <TextInput
                                label="Full Name"
                                name="contact_full_name"
                                value={values.contact_full_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.contact_full_name && touched.contact_full_name ? errors.contact_full_name : null}
                            />
                            <TextInput
                                label="Postion"
                                name="contact_position"
                                value={values.contact_position}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.contact_position && touched.contact_position ? errors.contact_position : null}
                            />
                            <TextInput
                                label="Mobile Number"
                                name="contact_number"
                                value={values.contact_number}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.contact_number && touched.contact_number ? errors.contact_number : null}
                            />
                        </Group>
                    </Stack>
                    <Group>
                        <Button component={Link} href={"/dashboard/contractors"} variant="light">Back</Button>
                        <Button loading={pending} type="submit">Save</Button>
                    </Group>
                </Form>
            )}
        </Formik>
    </>
}