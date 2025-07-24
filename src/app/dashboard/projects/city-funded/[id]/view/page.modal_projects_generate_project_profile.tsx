import { ResponseProjectsById } from "@/types/Settings"
import { Alert, Badge, Button, Divider, Flex, List, Loader, Progress, rem, Stack, Text, ThemeIcon } from "@mantine/core"
import { modals } from "@mantine/modals"
import { IconCheck, IconInfoHexagon } from "@tabler/icons-react"
import { startTransition, useActionState, useEffect, useRef, useState } from "react"
import { generateProjectsProfileAction } from "./page.modal_projects_generate_project_profile_action"
import { useListState } from "@mantine/hooks"
import { ReportsEventsMessage, SessionData } from "@/types/utils"
import { ErrorComponent, LoadingComponent } from "@/components/Response"
import { serverURL } from "@/provider/axiosClient"


export const OpenGenerateProjectsProfileModal = (projects: ResponseProjectsById, session_data: SessionData) => modals.open({
    title: <Text fz="lg" fw="bold" c="dimmed">GENERATE PROJECTS PROFILE</Text>,
    size: rem("1000"),
    children: <GenerateProjectsProfile projects={projects} session_data={session_data} />
})

const GenerateProjectsProfile = ({projects, session_data}: { projects: ResponseProjectsById, session_data: SessionData }) => {
    const eventSourceRefId = useRef<EventSource | null>(null)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_state, formAction, _pending] = useActionState(generateProjectsProfileAction, "")
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
                if (data.progress == 0) setEventsProgress(10) 
                else if (data.progress == 1) setEventsProgress(15)
                else if (data.progress == 2) setEventsProgress(25)
                else if (data.progress == 3) setEventsProgress(50)
                else if (data.progress == 4) setEventsProgress(75)
                else if (data.progress == 5) setEventsProgress(90)
                else if (data.progress == 6) setEventsProgress(95)
                else if (data.progress == 7) setEventsProgress(99)
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
                <Text>{projects.projects_name}</Text>
                <Badge size="lg" radius="md" variant="dot">{projects.projects_code}</Badge>
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
                        >Building infrastructure project profile</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[3] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Building project contract details</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[4] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Building project course of action</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[5] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Compiling project payment details</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[6] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Finalizing documents</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[7] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >Generating PDF file</List.Item>
                        <List.Item
                            fw="bold"
                            icon={
                                eventsMessage[8] == null ? <ThemeIcon variant="transparent">
                                <Loader size={"xs"} />
                            </ThemeIcon> : <ThemeIcon variant="transparent">
                                    <IconCheck />
                                </ThemeIcon>
                            }
                        >PDF report completed</List.Item>
                    </List>
                    <Progress size="xl" color={eventsMessage.length != 9 ? "mis-orange" : "green"} value={eventsProgress} animated={eventsMessage.length != 9} />
                    <Flex p={0} m={0} justify="end">
                        <Text lh={0.1} fz="xs" fw={600} c="dimmed">{eventsMessage.length}/9</Text>
                    </Flex>
                </>
            : <Button variant="light" onClick={() => {
                    setIsGenerating(true)
                    startTransition(() => {
                        formAction({
                            data: {
                                projects_profile: {
                                    id: projects.projects_id
                                },
                                file_name: projects.projects_code,
                            },
                            session_auth: session_data
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