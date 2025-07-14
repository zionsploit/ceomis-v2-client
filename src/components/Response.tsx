import { Alert, Box, Divider } from "@mantine/core"
import { Paper } from "./Paper"
import { Text } from "./Text"
import { BarLoader } from "react-spinners"

export const LoadingComponent = () => {

    return <>
        <Paper my="md">
            <Divider label="FETCHING RECORDS" />
            <Box mt="md">
                <BarLoader
                    color={"#f56e00"}
                    width={"100%"}
                    loading={true}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Box>
        </Paper>
    </>
}

export const NoDataComponent = () => {

    return <>
        <Paper my="md">
            <Divider label="NO DATA" />
            <Alert color="red">
                <Text label="No records found in the database. Please check back later or contact support if you believe this is an error. " ft="small" />
            </Alert>
        </Paper>
    </>
}

export const ErrorComponent = () => {

    return <>
        <Paper my="md">
            <Divider label="ERROR" />
            <Alert color="red">
                <Text label="An unexpected error occurred. Please try again or contact support if the problem persists." ft="small" />
            </Alert>
        </Paper>
    </>
}

export const AuthenticatingComponent = () => {
    return <>
        <Paper my="md">
            <Divider label="AUTHENTICATING" />
            <Box mt="md">
                <BarLoader
                    color={"#f56e00"}
                    width={"100%"}
                    loading={true}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Box>
        </Paper>
    </>
}