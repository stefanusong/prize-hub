"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useRef, useState } from "react"
import { Loader2 } from "lucide-react"

export function LoginDialog() {
    const email = useRef("")
    const password = useRef("")
    const [loggingIn, setLoggingIn] = useState(false)

    const onSubmit = async () => {
        setLoggingIn(true)
        const res = await signIn("credentials", {
            username: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/dashboard",
        })

        console.log("Loggin result:", res)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>

                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="name" type="email" onChange={(e) => { email.current = e.target.value }} placeholder="some@example.com" className="mt-3" />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password" type="password" onChange={(e) => { password.current = e.target.value }} placeholder="*********" className="mt-3" onKeyDown={(e) => { e.key === "Enter" ? onSubmit() : null }} />
                    </div>
                </div>
                <DialogFooter>
                    {!loggingIn && (
                        <Button type="submit" variant={"outline"} onClick={onSubmit}>
                            Login 🚀
                        </Button>
                    )}

                    {loggingIn && (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging In
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
