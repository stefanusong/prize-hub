import { Sidebar } from "@/components/sidebar"

export default function DashboardPage() {
  return (
    <>
      <div className="bg-background h-full">
        <div className="grid lg:grid-cols-5 h-full">
          <Sidebar className="block h-screen" />
          <div className="col-span-3 lg:col-span-4 lg:border-l h-full">
            <div className="h-full px-4 py-6 lg:px-8">

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
