'use client'

import { Paper } from "@/components/Paper";
import { ResponseSummaryImplementationByYearFullOverview } from "@/types/Reports";
import { Button, Card, Flex, Group, NumberFormatter, rem, Stack, Table, Text, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { OpenGenerateProjectsImplementationSummary } from "./page.modal_generate_projects_implementation_summary";
import { SessionData } from "@/types/utils";

export default function Content({
    session_data,
    summary_data
}: {session_data: SessionData, summary_data: ResponseSummaryImplementationByYearFullOverview}) {
    const total_status = summary_data.total_status
    const total_projects = summary_data.total_projects
    const total_appropriation = summary_data.total_appropriation
    const projects_data = summary_data.projects_data
    const projects_year = projects_data.map((v) => v.year).sort()

    const [notYetStartedTotalShares, setNotYetStartedTotalShares] = useState<number>(0.0)
    const [preparationTotalShares, setPreparationTotalShares] = useState<number>(0.0)
    const [biddingTotalShares, setBiddingTotalShares] = useState<number>(0.0)
    const [bidddedTotalShares, setBiddedTotalShares] = useState<number>(0.0)
    const [onGoingTotalShares, setOnGoingTotalShares] = useState<number>(0.0)
    const [completedTotalShares, setCompletedTotalShares] = useState<number>(0.0)
    const [suspendedTotalShares, setSuspendedTotalShares] = useState<number>(0.0)

    useEffect(() => {
        const parse_project = projects_data.map((v) => v.data)

        {
            const parse_project_by_not_yet_started = parse_project.map((v) => v.filter(v => v.project_status == "Not Yet Started")[0])
            const total_projects_by_not_yet_started = parse_project_by_not_yet_started.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)

            const not_yet_started_average = (total_projects_by_not_yet_started / Number(total_projects)) * 100
            setNotYetStartedTotalShares(not_yet_started_average)
        }

        {
            const parse_project_by_preparation = parse_project.map((v) => v.filter(v => v.project_status == "Preparation")[0])
            const total_projects_by_preparation = parse_project_by_preparation.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const prepration_averate = (total_projects_by_preparation / Number(total_projects)) * 100
            setPreparationTotalShares(prepration_averate)
        }

        {
            const parse_project_by_bidding = parse_project.map((v) => v.filter(v => v.project_status == "Bidding")[0])
            const total_projects_by_bidding = parse_project_by_bidding.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const bidding_averate = (total_projects_by_bidding / Number(total_projects)) * 100
            setBiddingTotalShares(bidding_averate)
        }

        {
            const parse_project_by_bidded = parse_project.map((v) => v.filter(v => v.project_status == "Bidded")[0])
            const total_project_by_bidded = parse_project_by_bidded.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const bidded_average = (total_project_by_bidded / Number(total_projects)) * 100
            setBiddedTotalShares(bidded_average)
        }

        {
            const parse_project_by_on_going = parse_project.map((v) => v.filter(v => v.project_status == "On-Going")[0])
            const total_project_by_on_going = parse_project_by_on_going.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const on_going_average = (total_project_by_on_going / Number(total_projects)) * 100
            setOnGoingTotalShares(on_going_average)
        }

        {
            const parse_project_by_completed = parse_project.map((v) => v.filter(v => v.project_status == "Completed")[0])
            const total_project_by_completed = parse_project_by_completed.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const completed_average = (total_project_by_completed / Number(total_projects)) * 100
            setCompletedTotalShares(completed_average)
        }

        {
            const parse_project_by_suspended = parse_project.map((v) => v.filter(v => v.project_status == "Suspended")[0])
            const total_project_by_suspended = parse_project_by_suspended.reduce((pv, cv) => pv + Number(cv?.total_projects ?? 0) , 0)
            
            const suspended_average = (total_project_by_suspended / Number(total_projects)) * 100
            setSuspendedTotalShares(suspended_average)
        }
        
    }, [projects_data, total_projects])

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Status of Project Implementation by Year</Text>
            <Group grow gap="xl">
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">No. of status</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={total_status} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Total no. of projects</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter value={Number(total_projects)} thousandSeparator /></Text>
                </Card>
                <Card withBorder shadow="md">
                    <Text fz="lg" fw="bold" c="dimmed">Total Appropriation</Text>
                    <Text fz="xl" fw="bolder"><NumberFormatter prefix="₱" value={Number(total_appropriation)} thousandSeparator /></Text>
                </Card>
            </Group>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateProjectsImplementationSummary(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
                <Table.ScrollContainer minWidth={rem("1000")}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Status of projects</Table.Th>
                                {projects_year.map((project, index) => (
                                    <Table.Th key={index}>{project}</Table.Th>
                                ))}
                                 <Table.Th>Percentage Shares.</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td fw="bold">Not Yet Started</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Not Yet Started")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={notYetStartedTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">Preparation</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Preparation")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={preparationTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">Bidding</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Bidding")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={biddingTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">Bidded</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Bidded")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={bidddedTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">On-Going</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "On-Going")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={onGoingTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">Completed</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Completed")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={completedTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw="bold">Suspended</Table.Td>
                                {projects_year.map((project, index) => {
                                    const get_project = projects_data.filter((v) => v.year == project)[0]
                                    const get_data = get_project.data.filter((v) => v.project_status == "Suspended")[0]

                                    return <Table.Td key={index}>
                                        <Stack gap={0}>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Projects: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_projects ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                            <Flex align="center" gap="xs">
                                                <Text fw="bold" c="dimmed">Appropriation: </Text>
                                                <Text fw="bold">
                                                    <NumberFormatter value={Number(get_data?.total_appropriation ?? 0)} thousandSeparator />
                                                </Text>
                                            </Flex>
                                        </Stack>
                                    </Table.Td>
                                })}
                                <Table.Td fw="bold">
                                    <NumberFormatter value={suspendedTotalShares.toFixed(2)} /> %
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Paper>
        </Stack>
    </>
}