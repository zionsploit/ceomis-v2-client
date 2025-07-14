import { useContext } from "react"
import { PageTabContext } from "../page.tab.context"
import useGetProjectsStatsTypes from "@/hooks/component.fetch/useGetProjectsStatsTypes"
import { Stack } from "@mantine/core"
import { Text } from "@/components/Text"
import { BarChart } from "@mantine/charts"
import { Paper } from "@/components/Paper"
import { getRandomMantineColor } from "@/utils/helper"
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/Response"
import { apiURL } from "@/provider/axiosClient"
import { SessionContext } from "../_home.dashboard"

export default function ProjectTypes() {
    const getIsActive = useContext(PageTabContext)
    const getAuthSession = useContext(SessionContext)
    const {data, isValidating, isLoading, error} = useGetProjectsStatsTypes(getIsActive.isActive, {
        url: `${apiURL}/projects/stats-types`,
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
                <Text label="Project by Type" ft="smallTitle" />
                <BarChart
                    h={1000}
                    data={data}
                    dataKey="name"
                    orientation="vertical"
                    yAxisProps={{ width: 150 }}
                    xAxisLabel="Total Projects"
                    series={[{ name: 'projects_total', color: getRandomMantineColor(), label: "Projects Total" }]}
                />
            </Stack>
        </Paper>
    </>
}