import type { Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Roboto_Flex } from 'next/font/google'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { SWRConfig } from "swr";
import PageContent from "./dashboard/page.content";

export const metadata: Metadata = {
  title: "CEO-MIS",
  description: "Pagadian City Engineer\'s Office",
};

const fontTheme = Roboto_Flex({
  subsets: ['latin'],
  variable: '--next-font-infer'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" {...mantineHtmlProps} className={fontTheme.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SWRConfig value={{
            fallbackData: [],
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }}>
            <PageContent>
                {children}
            </PageContent>
        </SWRConfig>
      </body>
    </html>
  );
}
