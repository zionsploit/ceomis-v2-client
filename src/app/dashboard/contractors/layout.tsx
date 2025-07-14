"use client"

import React, { useContext } from "react";
import { PageTitleContext } from "../page.title.context";
import { Text } from "@/components/Text";

export default function ContractorsLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
    const pageTitleContext = useContext(PageTitleContext)
    
    return <>
        <Text hidden={pageTitleContext.readState.title.isEmpty()} ft="mediumTitle" label={pageTitleContext.readState.title} />
        <Text hidden={pageTitleContext.readState.title.isEmpty()} ft="medium" label={pageTitleContext.readState.description} />
        {children}
    </>
}