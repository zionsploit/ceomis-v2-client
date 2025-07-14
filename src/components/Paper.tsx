'use client'

import { createPolymorphicComponent, Paper as MantinePaper, PaperProps } from "@mantine/core";
// import { useColorScheme } from "@mantine/hooks";
import React, { forwardRef } from "react";

interface CustomPaperComponent extends PaperProps {
    children?: React.ReactNode
}

const PaperComponent = forwardRef<HTMLDivElement, CustomPaperComponent>(({children, ...others }, ref) => {
    // const colorScheme = useColorScheme("light");

    return (
        <MantinePaper 
            component="div" 
            withBorder
            p="md"
            // bg={colorScheme}
            shadow="sm"
            ref={ref} 
            {...others}
        >
            {children}
        </MantinePaper>
    )
})

PaperComponent.displayName = "Paper"

export const Paper = createPolymorphicComponent<'div', CustomPaperComponent>(PaperComponent)