"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return (
      <div>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-[#38b2ac] via-[#0bc5ea] to-background ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background rounded-full"></div>
          </div>
          <p className="mt-3 font-bold text-lg">Just a moment..</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-background h-full">
        <div className="grid lg:grid-cols-5 h-full">
          <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
            <div className="h-full px-4 py-6 lg:px-8">
              <p>Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}