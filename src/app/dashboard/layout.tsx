'use client'

import '@/utils/string'
import '@/utils/number'
import React, { useState } from "react";
import { PageTitleContext } from './page.title.context';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';

export default function HomeLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
    const [pageTitle, setPageTitle] = useState({title: "", description: ""})

    return <>
        <PageTitleContext.Provider value={{readState: pageTitle, mutateState: setPageTitle}}>
            <ErrorBoundary errorComponent={Error}>
                {children}
            </ErrorBoundary>
        </PageTitleContext.Provider>
    </>
}