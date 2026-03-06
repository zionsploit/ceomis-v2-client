"use client"

import { NavbarNested } from "@/components/NavbarNested";
import { Text } from "@/components/Text";
import { ActionIcon, Alert, Anchor, AppShell, Box, Burger, Divider, Flex, Group, Menu, rem, TextInput, ThemeIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { IconAlertTriangle, IconBell, IconLogout, IconSearch, IconUserStar } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { logout } from "./logout_action";
import { useAppSelector } from "@/provider/reactRedux/hooks";

export default function DashboardTemplate({
    children
}: Readonly<{children: React.ReactNode}>) {
    const [opened, { toggle }] = useDisclosure();
    const userDetailsSelector = useAppSelector((state) => state.userDetailsReducer.userDetails)

    return <>
        <AppShell
          layout="alt"
          header={{ height: 60 }}
          navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        >
          <AppShell.Header withBorder={false}>
            <Group h="100%" gap="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <TextInput
                pl={{ xs: 0, sm: "md" }}
                flex={1}
                placeholder="Search Project" 
                leftSection={<ThemeIcon variant="transparent"><IconSearch /></ThemeIcon>}
              />
              <Box>
                <ActionIcon size="input-sm" radius="xl" variant="light">
                  <IconBell />
                </ActionIcon>
              </Box>
              <Box pr="sm">
                <Menu closeOnItemClick={false}>
                  <Menu.Target>
                    <ActionIcon size="input-sm" radius="xl">
                      <Text c="white" label="J" ft="default" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown w={rem("200")}>
                    <Menu.Label>Menu</Menu.Label>
                    <Menu.Item leftSection={<ThemeIcon variant="transparent"><IconUserStar /></ThemeIcon>}>
                        Profile
                    </Menu.Item>
                    <Menu.Item onClick={logout} leftSection={<ThemeIcon variant="transparent"><IconLogout /></ThemeIcon>}>
                        Sign Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </Group>
          </AppShell.Header>
          <AppShell.Navbar>
            <Group justify="space-between" p="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Flex flex={1} align="start" justify={{ xs: "end", sm: "center" }}>
                  <Image 
                    src={'/assets/appIcon.svg'} 
                    width={70} 
                    height={70} 
                    alt="mis logo" />
                {/* <Image 
                    src={'/assets/seal.png'} 
                    width={70} 
                    height={70} 
                    alt="City logo" /> */}
              </Flex>
            </Group>
            <Divider mt="xl" />
            <NavbarNested />
            <Flex justify="space-between" align={"center"} p="md">
              <Text fz="xs" label="ZeusTech" />
              <Tooltip label="View release information">
                <Anchor underline="never">2.0.0v</Anchor>
              </Tooltip>
            </Flex>
          </AppShell.Navbar>
          <AppShell.Main>
              {userDetailsSelector.data?.info_id == null ? <Alert withCloseButton m="sm" p="xs" color="yellow" title="Profile Update Required" icon={<IconAlertTriangle />}>
                Please update your profile information — provide your first name, middle name, and last name — to unlock and use other features in the app.              </Alert> : null}
              <Box p="md">
                <ModalsProvider>
                    {children}
                </ModalsProvider>
              </Box>
          </AppShell.Main>
        </AppShell>
    </>
}