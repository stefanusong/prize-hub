"use client"

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "./theme-provider";
import { WorkspaceProvider } from "@/context/workspace.context";

interface Props {
    children: ReactNode
}

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <WorkspaceProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </WorkspaceProvider>
        </SessionProvider>
    )
}

export default Providers