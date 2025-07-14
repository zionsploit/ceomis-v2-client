'use client'
import React, { createContext } from "react";

export type PageTitleTypes = {
    title: string,
    description: string
}

export const PageTitleContextDefault = {
    title: "",
    description: ""
}

export const PageTitleContext = createContext({
    readState: {title: "", description: ""} satisfies PageTitleTypes,
    mutateState: (() => {}) as unknown as React.Dispatch<React.SetStateAction<PageTitleTypes>>
})