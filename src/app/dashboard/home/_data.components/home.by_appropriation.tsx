import { Card, Stack, Flex, NumberFormatter, Progress, Group } from "@mantine/core"
import { useContext } from "react"
import { PageTabContext } from "../page.tab.context"
import useGetProjectsTop10ByAppropriation from "@/hooks/component.fetch/useGetProjectsTop10ByAppropriation"
import { ErrorComponent, LoadingComponent, NoDataComponent } from "@/components/Response"
import { Paper } from "@/components/Paper"
import { Text } from "@/components/Text"
import { SessionContext } from "../_home.dashboard"
import { apiURL } from "@/provider/axiosClient"

export default function HomeByAppropriation() {
    const getIsActive = useContext(PageTabContext)
    const getAuthSession = useContext(SessionContext)
    const { data, isValidating, isLoading, error } = useGetProjectsTop10ByAppropriation(getIsActive.isActive, {
        url: `${apiURL}/projects/top-10-by-appropriation`,
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
            <Text label="Top 10 Projects by Appropriation" ft="smallTitle" />
            <NoDataComponent />
        </Paper>
    </>

    return <>
        <Paper my="md">
            <Stack>
                <Text label="Top 10 Projects by Appropriation" ft="smallTitle" />
                {data.map((value, index) => 
                    <Card key={index} withBorder radius="md" padding="xl">
                        <Stack>
                            <Group gap="sm" align="flex-end">
                                <Text label={value.name} />
                                <Text ft="small" label={`(${value.project_code})`} />
                            </Group>
                            <Stack gap={0}>
                                <Flex justify="space-between">
                                    <Text ft="small" label="Appropriation" />
                                    <Text ft="small" label={<NumberFormatter prefix="₱" value={value.appropriation} thousandSeparator />} />
                                </Flex>
                                <Progress value={(value.appropriation / data[0].appropriation) * 100} mt="md" size="lg" radius="xl" />
                            </Stack>
                        </Stack>
                    </Card>
                )}
            </Stack>
        </Paper>
    </>
}