'use client'

import '@/utils/string'
import '@/utils/number'
import React, { useEffect, useState } from "react";
import { PageTitleContext } from './page.title.context';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Error from './error';
import { useAppDispatch } from '@/provider/reactRedux/hooks';
import { fetchAuthUserDetails } from '@/provider/reactRedux/features/useDetailsFeatures';

export default function HomeLayout({
    children
}: Readonly<{children: React.ReactNode}>) {
    const [pageTitle, setPageTitle] = useState({title: "", description: ""})
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAuthUserDetails())
    }, [dispatch])

    return <>
        <PageTitleContext.Provider value={{readState: pageTitle, mutateState: setPageTitle}}>
            <ErrorBoundary errorComponent={Error}>
                {children}
            </ErrorBoundary>
        </PageTitleContext.Provider>
    </>
}