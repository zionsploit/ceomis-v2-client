import { useContext } from "react";
import { PageTabContext } from "../page.tab.context";
import useGetProjectsAppropriationBySector from "@/hooks/component.fetch/useGetProjectsAppropriationBySector";
import { Paper } from "@/components/Paper";
import { Divider, Flex, NumberFormatter, Stack, Text as MText } from "@mantine/core";
import { Text } from "@/components/Text";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/Response";
import { SessionContext } from "../_home.dashboard";
import { apiURL } from "@/provider/axiosClient";

export default function ProjectAppropriationBySector() {
    const getIsActive = useContext(PageTabContext)
    const getAuthSession = useContext(SessionContext)
    const {data, isValidating, isLoading, error} = useGetProjectsAppropriationBySector(getIsActive.isActive, {
        url: `${apiURL}/projects/appropriation-by-sector`,
        headers: {
            auth: getAuthSession?.auth ?? "",
            sid: getAuthSession?.sid ?? ""
        }
    })

    if (isValidating) return <LoadingComponent />
    if (isLoading) return <LoadingComponent />
    if (error) return <ErrorComponent />
    if (!data || data.length === 0) return <>
        <Paper my="md">
            <Text label="Sectoral Analysis" ft="smallTitle" />
            <NoDataComponent />
        </Paper>
    </>

    return <>
        <Paper my="md">
            <Stack>
                <Text label="Sectoral Analysis" ft="smallTitle" />
                {data.map((value, index) => <Stack gap={0} key={index}>
                    <Divider label={value.name} labelPosition="left" />
                    <Paper p="sm">
                        <Flex justify="space-between">
                            <Stack gap={0}>
                                <MText fz="lg" fw="bolder" c="gray" lts={1.2}>
                                    <NumberFormatter value={value.value} thousandSeparator prefix="₱" />
                                </MText>
                                {/* TODO ENHANCE  */}
                                {/* <MText fz="xs" fw="bolder" c="green" lts={1.2}>
                                    + <NumberFormatter value={13123} thousandSeparator prefix="₱" />
                                </MText> */}
                            </Stack>
                            {/* TODO ENHANCE  */}
                            {/* <Stack gap={0} align="end">
                                <Flex gap="sm" align="end">
                                    <MText fz="sm" c="green" fw={600}>10%</MText>
                                    <ThemeIcon c="green" color="gray" variant="light">
                                        <IconTrendingUp />
                                    </ThemeIcon>
                                </Flex>
                                <Text ft="small" c="dimmed" label="% from last year" />
                            </Stack> */}
                        </Flex>
                    </Paper>
                </Stack>)}
            </Stack>
        </Paper>
    </>
}