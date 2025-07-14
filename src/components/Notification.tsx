import { ThemeIcon } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconAlertTriangle, IconCheck, IconClock } from "@tabler/icons-react"

export const notificationShow = () => {
    return notifications.show({
        loading: true,
        title: 'Loading',
        message: "The operation is currently in progress",
        icon: <ThemeIcon variant="transparent" size="xl" color="green"><IconClock /></ThemeIcon>,
        autoClose: true,
        withCloseButton: false,
    })
}

export const updateSuccessNotication = (ref: string | null) => {
    return notifications.update({
        id: ref ?? undefined,
        title: 'SUCCESS',
        message: "The operation was completed successfully",
        loading: false,
        icon: <ThemeIcon variant="transparent" size="xl" color="green"><IconCheck /></ThemeIcon>,
        autoClose: 5000,
    });
}

export const updateFailureNotification = (ref: string | null) => {
    return notifications.update({
        id: ref ?? undefined,
        title: 'Failure',
        message: 'The operation failed',
        loading: false,
        icon: <ThemeIcon variant="transparent" size="xl" color="yellow"><IconAlertTriangle /></ThemeIcon>,
        autoClose: 5000,
    });
}