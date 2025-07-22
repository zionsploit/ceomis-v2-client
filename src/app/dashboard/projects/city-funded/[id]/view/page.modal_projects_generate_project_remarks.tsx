import { ErrorComponent, LoadingComponent } from "@/components/Response";
import { ResponseProjectsById } from "@/types/Settings";
import { Alert, Badge, Button, Divider, Flex, List, Loader, Progress, rem, Stack, Text, ThemeIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { generateProjectsRemarksAction } from "./page.modal_projects_generate_project_remarks_action";
import { useListState } from "@mantine/hooks";
import { ReportsEventsMessage, SessionData } from "@/types/utils";
import { IconCheck, IconInfoHexagon } from "@tabler/icons-react";
import { serverURL } from "@/provider/axiosClient";

export const OpenGenerateProjectsRemarksModal = (projects: ResponseProjectsById, session_auth: SessionData) => modals.open({
    title: <Text fz="lg" fw="bold" c="dimmed">GENERATE PROJECTS REMARKS</Text>,
    size: rem("1000"),
    children: <GenerateProjectsRemarks projects={projects} session_auth={session_auth} />
})

const GenerateProjectsRemarks = ({projects, session_auth}: { projects: ResponseProjectsById, session_auth: SessionData }) => {
    const eventSourceRefId = useRef<EventSource | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_state, formAction, _pending] = useActionState(generateProjectsRemarksAction, "")
    const [isFetchingSSE, setIsFetchingSSE] = useState<boolean>(true)
    const [isErrorSSE, setIsErrorSSE] = useState<boolean>(false)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [hasProject, setHasProject] = useState<boolean>(true)
    const [eventsMessage, eventsMessageHandler] = useListState<ReportsEventsMessage>([])
    const [eventsTotalImagesMessage, setEventsTotalImagesMessage] = useState<string>("0 of 0 images")
    const [isImagesProcessing, setIsImageProcessing] = useState<boolean>(true)
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

        const eventSource = new EventSource(`${serverURL}/sse-connection/${projects.projects_code}`)
        eventSourceRefId.current = eventSource

        eventSource.onopen = () => {
            setIsFetchingSSE(false)
        }

        eventSource.onerror = () => {
            setIsErrorSSE(true)
        }

        eventSource.addEventListener("report_progress", (event) => {
            const data = JSON.parse(event.data) as ReportsEventsMessage;
            
            if (data.message == "No Project Found") {
                setHasProject(false)
            } else {
                if (data.progress == 0) setEventsProgress(5) 
                else if (data.progress == 1) setEventsProgress(10)
                else if (data.progress == 2) {
                    setIsImageProcessing(false)
                    setEventsProgress(50)
                }
                else if (data.progress == 3) setEventsProgress(75)
                else if (data.progress == 4) setEventsProgress(99)
                else if (data.progress == 5) setEventsProgress(100)

                if (data.progress == 100) {
                    setEventsTotalImagesMessage(data.message)
                } else {
                    eventsMessageHandler.insert(data.progress, data)
                }
            }
            
        })
    }

    if (isErrorSSE) return <ErrorComponent />
    if (isFetchingSSE) return <LoadingComponent />

    return <>
        <Stack>
            <Stack gap={0}>
                <Text>{projects.projects_name}</Text>
                <Badge size="lg" radius="md" variant="dot">{projects.projects_code}</Badge>
            </Stack>
            <Divider />
            {hasProject ? isGenerating ? <>
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
                        >Preparing project profile information</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[1] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Retrieving project remarks data and images</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                isImagesProcessing ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Optimizing {eventsTotalImagesMessage}</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[2] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Preparing report document</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[3] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Compiling project remarks details</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[4] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Generating PDF file</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[5] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >PDF report completed</List.Item>
                    </List>
                    <Progress size="xl" color={eventsMessage.length != 6 ? "mis-orange" : "green"} value={eventsProgress} animated={eventsMessage.length != 6} />
                    <Flex p={0} m={0} justify="end">
                        <Text lh={0.1} fz="xs" fw={600} c="dimmed">{eventsMessage.length}/6</Text>
                    </Flex>
                </> : <Button variant="light" onClick={() => {
                setIsGenerating(true)
                startTransition(() => {
                    formAction({
                        data: {
                            projects_profile: {
                                id: projects.projects_id
                            },
                            file_name: projects.projects_code,
                        },
                        session_auth: session_auth
                    })
                })
            }}>START GENERATE</Button> : <Alert
                            icon={<IconInfoHexagon />}
                            title="Generating Error"
                        ><Text fz="lg" fw={500}>You need to close this and refresh the page to retrieve the latest information.</Text></Alert>}
        </Stack>
    </>
}
