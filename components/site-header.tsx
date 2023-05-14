"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Profile } from "@/components/profile"
import { useSession } from "next-auth/react"
import TeamSwitcher from "./team-switcher"
import Link from "next/link"


export function SiteHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Left */}
        <div className="flex gap-6">
          <Link href="/" className="items-center space-x-2 flex">
            <p className="font-extrabold text-2xl m-0 italic">
              PH
            </p>
          </Link>
          {session && session.user && (<TeamSwitcher />)}
        </div>
        {/* Left */}

        {/* Left */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session && session.user && (<Profile />)}
            <ThemeToggle />
          </nav>
        </div>
        {/* Left */}

      </div>
    </header>
  )
}
