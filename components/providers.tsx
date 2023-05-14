"use client"

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider";

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </SessionProvider>
    )
}

export default Providers