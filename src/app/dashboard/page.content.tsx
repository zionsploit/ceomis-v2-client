"use client"

import { AppStore, makeStore } from "@/provider/reactRedux/store";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React, { useRef } from "react";
import { Provider } from "react-redux";

const theme = createTheme({
  primaryColor: 'mis-orange',
  colors: {
    'mis-orange': ['#fff2e3', '#ffe4cd', '#ffc89c', '#feaa66', '#fe9139', '#fe801c', '#fe780d', '#f56e00', '#cb5a00', '#b14b00'],
  },
  fontFamily: 'var(--next-font-infer)'
})

export default function PageContent ({children}: Readonly<{children: React.ReactNode}>) {
    const storeRef = useRef<AppStore | null>(null)  
    
    if (!storeRef.current) storeRef.current = makeStore()

    return <>
        <Provider store={storeRef.current}>
            <MantineProvider theme={theme} defaultColorScheme="light">
            <Notifications position="top-right" />
                {children}
            </MantineProvider>
        </Provider>
    </>
}