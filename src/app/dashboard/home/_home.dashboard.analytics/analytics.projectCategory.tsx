import { useContext } from "react";
import { PageTabContext } from "../page.tab.context";
import useGetProjectsStatsCategory from "@/hooks/component.fetch/useGetProjectsStatsCategory";
import { Paper } from "@/components/Paper";
import { Group, List, Stack, ThemeIcon } from "@mantine/core";
import { Text } from "@/components/Text";
import { DonutChart } from "@mantine/charts";
import { getRandomMantineColor } from "@/utils/helper";
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/Response";
import { SessionContext } from "../_home.dashboard";
import { apiURL } from "@/provider/axiosClient";


export default function ProjectCategory() {
    const getIsActive = useContext(PageTabContext)
    const getAuthSession = useContext(SessionContext)
    const { data, isValidating, isLoading, error } = useGetProjectsStatsCategory(getIsActive.isActive, {
        url: `${apiURL}/projects/stats-category`,
        headers: {
            auth: getAuthSession?.auth ?? "",
            sid: getAuthSession?.sid ?? ""
        }
    })

    if (isValidating) return <LoadingComponent />
    if (isLoading) return <LoadingComponent />
    if (error) return <ErrorComponent />
    if (!data || data.length === 0) return <NoDataComponent />
    

    const dataValue = data.map((value) => {
        return {
            name: value.name,
            value: Number(value.projects_total),
            color: getRandomMantineColor()
        }
    })

    return <>
        <Paper my="md">
            <Stack>
                <Text label="Project By Category" ft="smallTitle" />
                <Group align="start">
                    <DonutChart
                        withLabels
                        withLabelsLine
                        labelsType="value"
                        data={dataValue}
                    />
                    <List spacing="sm">
                        {dataValue.map((dataVal, index) => 
                            <List.Item 
                                icon={<ThemeIcon p="md" radius="xl" color={dataVal.color}>
                                    <Text label={dataVal.value.toString()} />
                                </ThemeIcon>}
                                key={index}
                            >
                                {dataVal.name}
                            </List.Item>
                        )}
                    </List>
                </Group>
            </Stack>
        </Paper>
    </>
}