"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { ResponseContractorsWithProjects } from "@/types/Settings";
import { Anchor, Button, Divider, Flex, Group, NumberFormatter, rem, Stack, Table, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import Link from "next/link";
import { OpenGenerateContractorsReport } from "./page.content_modal_generate_contractors_reports";
import { SessionData } from "@/types/utils";

export default function ContractorViewPage({
    session_data,
    contractor
}: Readonly<{session_data: SessionData, contractor: ResponseContractorsWithProjects}>) {
    const contractors_info = contractor.contractor
    const contractors_project = contractor.projects

    return <>
        <Paper my="md">
            <Stack>
                <Flex justify="space-between" align="flex-end">
                    <Stack gap={0}>
                        <Text label="Contractor Details" ft="smallTitle" />
                        <Text label="Information of the contractors" ft="small" />
                    </Stack>
                    <Group>
                        <Button leftSection={<ThemeIcon><IconPrinter /></ThemeIcon>} onClick={() => OpenGenerateContractorsReport(contractors_info, session_data)}>Generate Report</Button>
                        <Button component={Link} href={"/dashboard/contractors"} variant="light">Back</Button>
                    </Group>
                </Flex>
                <Divider />
                <Text label="Address Information" ft="smallTitle" />
                <Group grow>
                    <Stack gap={0}>
                        <Text label="State/Province" ft="small" />
                        <Text label={contractors_info.address_province.isEmpty() ? "N/A" : contractors_info.address_province} ft={contractors_info.address_province.isEmpty() ? "small" : "medium"} />
                    </Stack>
                    <Stack gap={0}>
                        <Text label="City/Municipality" ft="small" />
                        <Text label={contractors_info.address_municipality.isEmpty() ? "N/A" : contractors_info.address_municipality} ft={contractors_info.address_municipality.isEmpty() ? "small" : "medium"} />
                    </Stack>
                </Group>
                <Group grow>
                    <Stack gap={0}>
                        <Text label="Barangay" ft="small" />
                        <Text label={contractors_info.address_barangay.isEmpty() ? "N/A" : contractors_info.address_barangay} ft={contractors_info.address_barangay.isEmpty() ? "small" : "medium"} />
                    </Stack>
                    <Stack gap={0}>
                        <Text label="Street/Purok" ft="small" />
                        <Text label={contractors_info.address_street.isEmpty() ? "N/A" : contractors_info.address_street} ft={contractors_info.address_street.isEmpty() ? "small" : "medium"} />
                    </Stack>
                </Group>
                <Divider />
                <Stack gap={0}>
                    <Text label="Contact Information" ft="smallTitle" />
                </Stack>
                <Group grow>
                    <Stack gap={0}>
                        <Text label="Contact person" ft="small" />
                        <Text label={contractors_info.contact_full_name.isEmpty() ? "N/A" : contractors_info.contact_full_name} ft={contractors_info.contact_full_name.isEmpty() ? "small" : "medium"} />
                    </Stack>
                    <Stack gap={0}>
                        <Text label="Position" ft="small" />
                        <Text label={contractors_info.contact_position.isEmpty() ? "N/A" : contractors_info.contact_position} ft={contractors_info.contact_position.isEmpty() ? "small" : "medium"} />
                    </Stack>
                </Group>
                <Group grow>
                    <Stack gap={0}>
                        <Text label="Contact no." ft="small" />
                        <Text label={contractors_info.contact_number.isEmpty() ? "N/A" : contractors_info.contact_number} ft={contractors_info.contact_number.isEmpty() ? "small" : "medium"} />
                    </Stack>
                    <Stack gap={0}>
                        <Text label="Email" ft="small" />
                        <Text label={contractors_info.email_address.isEmpty() ? "N/A" : contractors_info.email_address} ft={contractors_info.email_address.isEmpty() ? "small" : "medium"} />
                    </Stack>
                </Group>
            </Stack>
        </Paper>
        <Text label="Awarded Projects" />
        <Paper my="md">
            <Table highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={rem("100")}>Project Name</Table.Th>
                        <Table.Th w={rem("100")}>Project Code</Table.Th>
                        <Table.Th w={rem("100")}>Project Status</Table.Th>
                        <Table.Th w={rem("100")}>Project Taker</Table.Th>
                        <Table.Th w={rem("100")}>Project Appropriation</Table.Th>
                        <Table.Th w={rem("100")}>Project Contract Cost</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                     {contractors_project.length > 0 ? contractors_project.map((project, index) => (
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Anchor fw="bold" underline="never">{project.project_name}</Anchor>
                            </Table.Td>
                            <Table.Td>
                                <Text label={project.project_code} />
                            </Table.Td>
                            <Table.Td>
                                <Text label={project.project_status ?? ""} />
                            </Table.Td>
                            <Table.Td>
                                <Text label={project.project_takers ?? ""} />
                            </Table.Td>
                            <Table.Td>
                                <Text label={<NumberFormatter value={project.project_appropriation} thousandSeparator />} />
                            </Table.Td>
                            <Table.Td>
                                <Text label={<NumberFormatter value={project.project_contract_cost} thousandSeparator />} />
                            </Table.Td>
                        </Table.Tr>
                    )) : null}
                </Table.Tbody>
            </Table>
        </Paper>
    </>
}