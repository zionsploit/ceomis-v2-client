"use client"

import { Paper } from "@/components/Paper";
import { ResponseSummaryFinancialStatusReportsOverview } from "@/types/Reports";
import { Button, Divider, Flex, Group, NumberFormatter, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconBuildingBank, IconBuildingCog, IconBusinessplan, IconCloudDollar, IconCoin, IconMoneybag, IconPrinter } from "@tabler/icons-react";
import { OpenGenerateFinancialStatusReport } from "./page.modal_generate_financial_status_report";
import { SessionData } from "@/types/utils";

export default function PageContent ({
    session_data,
    summary_data
}: { session_data: SessionData, summary_data: ResponseSummaryFinancialStatusReportsOverview }) {
    const data_implemented = summary_data.data_implemented
    const data_unimplemented = summary_data.data_unimplemented
    const data_suspended = summary_data.data_suspended
    const data_overview = summary_data.data_summary

    return <>
        <Stack>
            <Text fz="h2" fw="bold">Financial Status Summary Report</Text>
            <Paper my="md">
                <Flex my="md">
                    <Button onClick={() => OpenGenerateFinancialStatusReport(session_data)} leftSection={<ThemeIcon variant="transparent" c="white"><IconPrinter /></ThemeIcon>}>Generate Report</Button>
                </Flex>
            <Divider my="md" />
                <Text fw="bold">Implemented (Preparation, Bidded, Bidding, On-Going, Completed)</Text>
                <Stack my="md" gap="sm">
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingCog /></ThemeIcon>
                            <Text fw="bold">No. Projects</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">{data_implemented.total_projects}</Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingBank /></ThemeIcon>
                            <Text fw="bold">Appropriation</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_implemented.total_appropriation)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBusinessplan /></ThemeIcon>
                            <Text fw="bold">Contract Cost</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_implemented.total_contract_cost)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCoin /></ThemeIcon>
                            <Text fw="bold">Paid</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_implemented.total_paid)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCloudDollar /></ThemeIcon>
                            <Text fw="bold">Balance</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_implemented.total_balance)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconMoneybag /></ThemeIcon>
                            <Text fw="bold">Savings</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_implemented.total_savings)} thousandSeparator />
                        </Text>
                    </Group>
                </Stack>
                <Divider my="md" />
                <Text fw="bold">Unimplemented (Not Yet Started)</Text>
                <Stack my="md" gap="sm">
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingCog /></ThemeIcon>
                            <Text fw="bold">No. Projects</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">{data_unimplemented.total_projects}</Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingBank /></ThemeIcon>
                            <Text fw="bold">Appropriation</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_unimplemented.total_appropriation)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBusinessplan /></ThemeIcon>
                            <Text fw="bold">Contract Cost</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_unimplemented.total_contract_cost)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCoin /></ThemeIcon>
                            <Text fw="bold">Paid</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_unimplemented.total_paid)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCloudDollar /></ThemeIcon>
                            <Text fw="bold">Balance</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_unimplemented.total_balance)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconMoneybag /></ThemeIcon>
                            <Text fw="bold">Savings</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_unimplemented.total_savings)} thousandSeparator />
                        </Text>
                    </Group>
                </Stack>
                <Divider my="md" />
                <Text fw="bold">Suspended</Text>
                <Stack my="md" gap="sm">
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingCog /></ThemeIcon>
                            <Text fw="bold">No. Projects</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">{data_suspended.total_projects}</Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingBank /></ThemeIcon>
                            <Text fw="bold">Appropriation</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_suspended.total_appropriation)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBusinessplan /></ThemeIcon>
                            <Text fw="bold">Contract Cost</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_suspended.total_contract_cost)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCoin /></ThemeIcon>
                            <Text fw="bold">Paid</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_suspended.total_paid)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCloudDollar /></ThemeIcon>
                            <Text fw="bold">Balance</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_suspended.total_balance)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconMoneybag /></ThemeIcon>
                            <Text fw="bold">Savings</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_suspended.total_savings)} thousandSeparator />
                        </Text>
                    </Group>
                </Stack>
                <Divider my="md" />
                <Text fw="bold">Overview</Text>
                <Stack my="md" gap="sm">
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingCog /></ThemeIcon>
                            <Text fw="bold">Total No. Projects</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">{data_overview.total_projects}</Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBuildingBank /></ThemeIcon>
                            <Text fw="bold">Total Appropriation</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_overview.total_appropriation)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconBusinessplan /></ThemeIcon>
                            <Text fw="bold">Total Contract Cost</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_overview.total_contract_cost)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCoin /></ThemeIcon>
                            <Text fw="bold">Total Paid</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_overview.total_paid)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconCloudDollar /></ThemeIcon>
                            <Text fw="bold">Total Balance</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_overview.total_balance)} thousandSeparator />
                        </Text>
                    </Group>
                    <Group grow>
                        <Flex gap="md" align="center">
                            <ThemeIcon variant="transparent"><IconMoneybag /></ThemeIcon>
                            <Text fw="bold">Total Savings</Text>
                        </Flex>
                        <Divider />
                        <Text fw="bold">
                            <NumberFormatter prefix="₱" value={Number(data_overview.total_savings)} thousandSeparator />
                        </Text>
                    </Group>
                </Stack>
            </Paper>
        </Stack>
    </>
}