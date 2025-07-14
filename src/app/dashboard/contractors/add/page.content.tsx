"use client"

import { startTransition, useActionState, useContext, useEffect, useRef } from 'react'
import * as yup from 'yup'
import { PageTitleContext, PageTitleContextDefault } from '../../page.title.context'
import { actionAddContractor } from './page.action'
import { notificationShow, updateFailureNotification, updateSuccessNotication } from '@/components/Notification'
import { ResponseDefaultMessage } from '@/entity/Response.enum'
import { Form, Formik } from 'formik'
import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core'
import { Text } from '@/components/Text'
import Link from 'next/link'
import { SessionData } from '@/types/utils'

export const contractorsSchema = yup.object().shape({
    name: yup.string().required("Contractor / Company name is required").default(""),
    email_address: yup.string().email("Email Address must be valid").required("Email Address is required").default(""),
    address_street: yup.string().required("Street address is required").default(""),
    address_barangay: yup.string().required("Barangay address is required").default(""),
    address_municipality: yup.string().required("Municipality address is required").default(""),
    address_province: yup.string().required("Province address is required").default(""),
    about: yup.string().optional().default(""),
    contact_full_name: yup.string().required("Contact Full Name is required").default(""),
    contact_position: yup.string().required("Contact Position is required").default(""),
    contact_number: yup.string().required("Contact number is required").default("")
})

export default function Content({
    session_data
}: Readonly<{session_data: SessionData}>) {
    
    const pageTitleContext = useContext(PageTitleContext)
    const [state, formAction, pending] = useActionState(actionAddContractor, { message: ResponseDefaultMessage.None, response_data: "" })
    const toastIdRef = useRef<string | null>(null)

    useEffect(() => {
        pageTitleContext.mutateState({
            ...PageTitleContextDefault,
            title: "Add Contractor",
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
            initialValues={contractorsSchema.getDefault()}
            validationSchema={contractorsSchema}
            onSubmit={(value) => {
                startTransition(() => {
                    formAction({
                        data: value,
                        session_data: session_data
                    })
                })
            }}
        >
            {({errors, touched, handleBlur, handleChange, values}) => (
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