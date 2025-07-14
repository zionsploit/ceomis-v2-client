import { useContext } from "react";
import { PageTabContext } from "../page.tab.context";
import useGetProjectsTop10byRewards from "@/hooks/component.fetch/useGetProjectsTop10byRewards";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/Response";
import { Paper } from "@/components/Paper";
import { Anchor, Card, Flex, NumberFormatter, Stack } from "@mantine/core";
import { Text } from "@/components/Text";
import Link from "next/link";
import { SessionContext } from "../_home.dashboard";
import { apiURL } from "@/provider/axiosClient";

export default function HomeByRewards() {
    const getIsActive = useContext(PageTabContext)
    const getAuthSession = useContext(SessionContext)
    const { data, isValidating, isLoading, error } = useGetProjectsTop10byRewards(getIsActive.isActive, {
        url: `${apiURL}/projects/top-1o-by-awarded-contractors`,
        headers: {
            auth: getAuthSession?.auth ?? "",
            sid: getAuthSession?.sid ?? ""
        }
    })
    
    if (isValidating) return <LoadingComponent />
    if (isLoading) return <LoadingComponent />
    if (error) return <ErrorComponent />
    if (!data || data.length === 0) return <NoDataComponent />

    return <>
        <Paper my="md">
            <Stack>
                <Text label="Top 10 Contractors by Awarded Project" ft="smallTitle" />
                {data.map((value, index) => 
                    <Card key={index} withBorder radius="md" padding="xl">
                        <Stack>
                            <Anchor component={Link} href={`/dashboard/contractors/${value.constructor_id}/view`} variant="text" fw="bold" underline="never">{value.name}</Anchor>
                            <Stack gap={0}>
                                <Flex justify="space-between">
                                    <Stack gap={0}>
                                        <Text ft="small" label="Appropriation" />
                                        <Text ft="small" label={<NumberFormatter prefix="₱" value={Number(value.total_appropriation)} thousandSeparator />} />
                                    </Stack>
                                    <Stack gap={0} align="end">
                                        <Text ft="small" label="Total Projects" />
                                        <Text ft="small" label={<NumberFormatter value={Number(value.total_projects)} thousandSeparator />} />
                                    </Stack>
                                </Flex>
                            </Stack>
                        </Stack>
                    </Card>
                )}
            </Stack>
        </Paper>
    </>

}