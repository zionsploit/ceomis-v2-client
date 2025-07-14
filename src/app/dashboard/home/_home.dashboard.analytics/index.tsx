import { Box, Group, Stack } from "@mantine/core";
import ProjectTypes from "./analytics.projectTypes";
import ProjectCategory from "./analytics.projectCategory";
import ProjectAppropriationBySector from "./analytics.projectSector";

export default function HomeDashboardAnalytics() {
    

    return <>
        <Group align="self-start">
            <Box flex={4}>
                <ProjectTypes />
            </Box>
            <Box flex={2}>
                <Stack gap={0}>
                    <ProjectCategory />
                    <ProjectAppropriationBySector />
                </Stack>
            </Box>
        </Group>
    </>
}