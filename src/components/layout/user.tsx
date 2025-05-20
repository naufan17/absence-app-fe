import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store/store"
import { GalleryVerticalEnd, ReceiptText, House } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"


const data = {
  menu: {
    name: "Absence",
    logo: GalleryVerticalEnd,
    version: "1.0.0",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Leave Request",
      url: "/user/leave-request",
      icon: ReceiptText,
      isActive: false,
    },
  ],
}

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const role: string | null = useSelector((state: RootState) => state.auth.role);
  const location = useLocation()
  const currentPath = location.pathname

  const updatedNavMain = data.navMain.map(item => ({
    ...item,
    isActive: item.url === currentPath,
  }))

  const activeBreadcrumb = updatedNavMain.find(item => item.isActive)

  return (
    <SidebarProvider>
      <AppSidebar data={{ ...data, navMain: updatedNavMain }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/${role}`}>
                    {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbLink href={activeBreadcrumb?.url || "/dashboard"}>
                    {activeBreadcrumb?.title || "Dashboard"}
                  </BreadcrumbLink>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
