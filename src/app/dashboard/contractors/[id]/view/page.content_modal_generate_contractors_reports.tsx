import { ErrorComponent, LoadingComponent } from "@/components/Response";
import { ResponseContractors } from "@/types/Settings";
import { Alert, Button, Divider, Flex, List, Loader, Progress, rem, Stack, Text, ThemeIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { generateContractorsReportAction } from "./page.content_modal_generate_contractors_reports_action";
import { ReportsEventsMessage, SessionData } from "@/types/utils";
import { useListState } from "@mantine/hooks";
import { IconCheck, IconInfoHexagon } from "@tabler/icons-react";
import { serverURL } from "@/provider/axiosClient";

export const OpenGenerateContractorsReport = (contractors: ResponseContractors, session_data: SessionData) => modals.open({
    title: <Text fz="lg" fw="bold" c="dimmed">GENERATE CONTRACTORS REPORTS</Text>,
    size: rem("1000"),
    children: <GenerateContractorsReport session_data={session_data} contractors={contractors} />
})

const GenerateContractorsReport = ({contractors, session_data}: {contractors: ResponseContractors, session_data: SessionData}) => {
    const eventSourceRefId = useRef<EventSource | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_state, formAction, _pending] = useActionState(generateContractorsReportAction, "")
    const [isFetchingSSE, setIsFetchingSSE] = useState<boolean>(true)
    const [isErrorSSE, setIsErrorSSE] = useState<boolean>(false)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [hasProject, setHasProject] = useState<boolean>(true)
    const [eventsMessage, eventsMessageHandler] = useListState<ReportsEventsMessage>([])
    const [eventsProgress, setEventsProgress] = useState<number>(0)

    useEffect(() => {
        connectSSE()
        return () => {
            if (eventSourceRefId.current) {
                eventSourceRefId.current.close()
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const connectSSE = () => {
        if (eventSourceRefId.current) {
            eventSourceRefId.current.close()
        }

        const eventSource = new EventSource(`${serverURL}/sse-connection/${contractors.name}`)
        eventSourceRefId.current = eventSource

        eventSource.onopen = () => {
            setIsFetchingSSE(false)
        }

        eventSource.onerror = () => {
            setIsErrorSSE(true)
        }

        eventSource.addEventListener("report_progress", (event) => {
            const data = JSON.parse(event.data) as ReportsEventsMessage;
            
            if (data.message == "No Contractors Found") {
                setHasProject(false)
            } else {
                if (data.progress == 0) setEventsProgress(10) 
                else if (data.progress == 1) setEventsProgress(15)
                else if (data.progress == 2) setEventsProgress(25)
                else if (data.progress == 3) setEventsProgress(50)
                else if (data.progress == 4) setEventsProgress(75)
                else if (data.progress == 5) setEventsProgress(90)
                else setEventsProgress(100)

                eventsMessageHandler.insert(data.progress, data)
            }
            
        })
    }

    if (isErrorSSE) return <ErrorComponent />
    if (isFetchingSSE) return <LoadingComponent /> 

    return <>
        <Stack>
            <Stack gap={0}>
                <Text>{contractors.name}</Text>
            </Stack>
            <Divider />
            {hasProject ? isGenerating ?
                <>
                    <List
                        size="sm"
                        center
                    >
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[0] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Preparing contractors profile information</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[1] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Preparing report document</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[2] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Building Contractors Information</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[3] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Building awarded projects information</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[4] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Compiling contractors informations</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[5] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Generating PDF file</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[6] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >PDF Report Completed</List.Item>
                    </List>
                    <Progress size="xl" color={eventsMessage.length != 7 ? "mis-orange" : "green"} value={eventsProgress} animated={eventsMessage.length != 7} />
                    <Flex p={0} m={0} justify="end">
                        <Text lh={0.1} fz="xs" fw={600} c="dimmed">{eventsMessage.length}/7</Text>
                    </Flex>
                </>
            : <Button variant="light" onClick={() => {
                    setIsGenerating(true)
                    startTransition(() => {
                        formAction({
                            data: {
                                projects_profile: {
                                    id: contractors.id
                                },
                                file_name: contractors.name,
                            },
                            session_data: session_data
                        })
                    })
                }}>START GENERATE</Button>
            : <Alert
                icon={<IconInfoHexagon />}
                title="Generating Error"
            ><Text fz="lg" fw={500}>You need to close this and refresh the page to retrieve the latest information.</Text></Alert>}
        </Stack>
    </>
}