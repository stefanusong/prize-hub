"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2, Chrome } from "lucide-react"

export function LoginDialog() {
    const [loggingIn, setLoggingIn] = useState(false)

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoggingIn(true)

        try {
            await signIn("google", { callbackUrl: `${window.location.origin}/dashboard` })
        } catch (error) {
            console.error(error);
        }

        setLoggingIn(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-lg font-semibold">Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <h1 className="text-center text-xl font-bold">Log in to Prize Hub</h1>
                </DialogHeader>
                {!loggingIn && (
                    <Button type="submit" variant={"default"} onClick={onSubmit}>
                        <Chrome />
                        <p className="font-semibold ml-3 text-lg">Continue with Google</p>
                    </Button>
                )}

                {loggingIn && (
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        <p className="font-semibold ml-3 text-lg">Continue with Google</p>
                    </Button>
                )}
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
