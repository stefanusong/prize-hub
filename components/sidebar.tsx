import { FileSpreadsheet, LayoutDashboard, LayoutList, Gift, UserCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Button variant="secondary" size="sm" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
        {/* Master Data */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Master Data
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <LayoutList className="mr-2 h-4 w-4" />
              Item
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Gift className="mr-2 h-4 w-4" />
              Doorprize
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <UserCheck className="mr-2 h-4 w-4" />
              Admin
            </Button>
          </div>
        </div>
        {/* Master Data */}

        {/* Reporting */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Reporting
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Doorprize History
            </Button>
          </div>
        </div>
        {/* Reporting */}
      </div>
    </div>
  )
}
