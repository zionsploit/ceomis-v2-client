import type { Metadata } from "next";
import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from "@mantine/core";
import { Roboto_Flex } from 'next/font/google'

// functions extensions


import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "CEO-MIS",
  description: "Pagadian City Engineer\'s Office",
};

const fontTheme = Roboto_Flex({
  subsets: ['latin'],
  variable: '--next-font-infer'
})

const theme = createTheme({
  primaryColor: 'mis-orange',
  colors: {
    'mis-orange': ['#fff2e3', '#ffe4cd', '#ffc89c', '#feaa66', '#fe9139', '#fe801c', '#fe780d', '#f56e00', '#cb5a00', '#b14b00'],
  },
  fontFamily: 'var(--next-font-infer)'
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
            <MantineProvider theme={theme} defaultColorScheme="light">
                <Notifications position="top-right" />
                {children}
            </MantineProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
