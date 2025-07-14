import { Box, Flex, Loader, rem } from "@mantine/core";

export default function Loading () {

    return <>
        <Box w={rem("100%")}>
            <Flex justify="center" align="center">
                <Loader size="md" />
            </Flex>
        </Box>
    </>
}