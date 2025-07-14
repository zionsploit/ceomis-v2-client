"use client"

import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import React, { useContext } from "react";
import { PageTitleContext } from "../page.title.context";

export default function SettingsTemplate ({
    children
}: Readonly<{children: React.ReactNode}>) {
    const pageTitleContext = useContext(PageTitleContext)

    return <>
        <Text hidden={pageTitleContext.readState.title.isEmpty()} ft="mediumTitle" label={pageTitleContext.readState.title} />
        <Text hidden={pageTitleContext.readState.title.isEmpty()} ft="medium" label={pageTitleContext.readState.description} />
        <Paper my="lg">
            {children}
        </Paper>
    </>
}