"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Profile } from "@/components/profile"
import { useSession } from "next-auth/react"
import WorkspaceSwitcher from "./workspace-switcher"
import Link from "next/link"


export function Navbar() {
  const { data: session } = useSession()
  if (!session) {
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
          </div>
          {/* Left */}

          {/* Right */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ThemeToggle />
            </nav>
          </div>
          {/* Right */}
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Left */}
        <div className="flex gap-6">
          <Link href={"/dashboard"} className="items-center space-x-2 flex">
            <p className="font-extrabold text-2xl m-0 italic">
              PH
            </p>
          </Link>
          <WorkspaceSwitcher />
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/dashboard/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/items"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Items
            </Link>
            <Link
              href="/dashboard/doorprize-events"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Doorprize Events
            </Link>
            <Link
              href="/dashboard/reports"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Reports
            </Link>
            <Link
              href="/dashboard/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Workspace Settings
            </Link>
          </nav>
        </div>
        {/* Left */}

        {/* Right */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Profile />
            <ThemeToggle />
          </nav>
        </div>
        {/* Right */}

      </div>
    </header>
  )
}
