"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Profile() {
    const { data: session } = useSession()

    function getInitials(name: string) {
        const words = name.split(' ')
        const initials = words
            .slice(0, 2)
            .map(word => word.charAt(0))
            .join('')
        return initials
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session && session.user ? session!.user.image : ""} alt="Profile Image" />
                        <AvatarFallback>{session && session.user ? getInitials(session.user.name!) : '?'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session && session.user ? session.user.name : '-'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session && session.user ? session.user.email : '-'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
