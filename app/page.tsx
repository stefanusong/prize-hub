"use client"

import { LoginDialog } from "../components/login-dialog";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const { data: session } = useSession()
  const router = useRouter();

  if (session && session.user) {
    router.push("/dashboard")
  } else {
    return (
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 justify-center">
        <div className="flex flex-col items-center justify-center mt-24">
          <h1 className="text-7xl font-extrabold italic">🎉 PRIZE HUB 🎉</h1>
          <p className="text-lg text-center mt-5 mb-5">Prize Hub is the ultimate platform for managing doorprize events and helping you allocate exciting <br></br> rewards to lucky winners with ease, so you can focus on creating unforgettable experiences for your audience.</p>
          <LoginDialog></LoginDialog>
        </div>
      </section>
    )
  }
}
