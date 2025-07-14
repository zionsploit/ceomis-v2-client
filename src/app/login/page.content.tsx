"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { Flex, rem, Stack } from "@mantine/core";
import Image from "next/image";
import { LoginForm } from "./login.form";

export default function Content() {

    return <>
        <Stack align="center" gap={0}>
            <Flex>
                <Image 
                    src={'/assets/appIcon.svg'} 
                    width={80} 
                    height={80} 
                    alt="mis logo" />
                <Image 
                    src={'/assets/seal.png'} 
                    width={80} 
                    height={80} 
                    alt="City logo" />
            </Flex>
            <Text label="Sign in to your account" ft="heavyTitle" />
            <Text label={`Engineer's Office Management Information System`} ft="medium" />
            <Text label={`City of Pagadian`} ft="medium" />
            <Paper my="md" p="xl" w={rem(450)}>
                <LoginForm />
            </Paper>
        </Stack>
    </>
}