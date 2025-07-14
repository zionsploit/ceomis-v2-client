"use client"

import '@/utils/string'
import '@/utils/number'
import { Center, Container, rem } from "@mantine/core";
import { readLocalStorageValue } from "@mantine/hooks";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
    const get_jwtID = readLocalStorageValue<string>({ key: "jwtID" })

    useEffect(() => {
        if (String(get_jwtID ?? "").isNotEmpty()) {
            redirect("/dashboard/home")
        }
    }, [get_jwtID])

    return <>
        <Container h={rem('100vh')}>
            <Center h={rem('100%')}>
                {children}
            </Center>
        </Container>
    </>
}